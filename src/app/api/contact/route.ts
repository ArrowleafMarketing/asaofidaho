import { site } from "@/lib/site";

/**
 * Contact form endpoint, replacing the HappyForms handler the WordPress site
 * used. Submissions are emailed to the association's public address.
 *
 * Two delivery paths, checked in this order:
 *
 *   1. RESEND_API_KEY — sends the email directly through Resend's REST API.
 *      No SDK needed, so nothing to install and it runs on any runtime.
 *   2. CONTACT_WEBHOOK_URL — POSTs the submission as JSON to Zapier, Make,
 *      or anything else that can turn a webhook into an email.
 *
 * With neither configured the route validates as normal and then reports that
 * it is not connected, rather than accepting the message and dropping it.
 *
 * Required for path 1:
 *   RESEND_API_KEY      re_...
 *   CONTACT_FROM_EMAIL  a sender on a domain verified with Resend,
 *                       e.g. website@asaofidaho.com
 * Optional:
 *   CONTACT_TO_EMAIL    overrides the recipient (defaults to site.email)
 */

type Submission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_ENDPOINT = "https://api.resend.com/emails";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderText(submission: Submission): string {
  return [
    `Name:     ${submission.name}`,
    `Email:    ${submission.email}`,
    `Phone:    ${submission.phone}`,
    `Company:  ${submission.company}`,
    "",
    submission.message,
    "",
    "—",
    "Sent from the contact form on asaofidaho.com",
  ].join("\n");
}

function renderHtml(submission: Submission): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#8c8c8c">${label}</td>` +
    `<td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;

  return [
    `<div style="font-family:Roboto,Helvetica,Arial,sans-serif;color:#222">`,
    `<table style="border-collapse:collapse;font-size:15px">`,
    row("Name", submission.name),
    row("Email", submission.email),
    row("Phone", submission.phone),
    row("Company", submission.company),
    `</table>`,
    `<p style="white-space:pre-wrap;font-size:15px;line-height:1.5">${escapeHtml(submission.message)}</p>`,
    `<p style="font-size:13px;color:#8c8c8c">Sent from the contact form on asaofidaho.com</p>`,
    `</div>`,
  ].join("");
}

async function sendViaResend(submission: Submission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  if (!from) {
    throw new Error(
      "RESEND_API_KEY is set but CONTACT_FROM_EMAIL is missing — Resend needs a verified sender address.",
    );
  }

  const response = await fetch(
    process.env.RESEND_API_BASE_URL ?? RESEND_ENDPOINT,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // So hitting Reply in the inbox answers the enquirer, not the website.
        reply_to: submission.email,
        subject: `Website enquiry from ${submission.name}`,
        text: renderText(submission),
        html: renderHtml(submission),
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend responded ${response.status} ${response.statusText} ${detail}`.trim(),
    );
  }
}

async function sendViaWebhook(submission: Submission): Promise<void> {
  const webhook = process.env.CONTACT_WEBHOOK_URL as string;

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...submission,
      to: process.env.CONTACT_TO_EMAIL || site.email,
      source: "asaofidaho.com contact form",
      receivedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Webhook responded ${response.status} ${response.statusText}`,
    );
  }
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a filled-in hidden field means a bot. Accept and drop silently.
  if (asString(payload.honeypot)) {
    return Response.json({ ok: true });
  }

  const submission: Submission = {
    name: asString(payload.name),
    email: asString(payload.email),
    phone: asString(payload.phone),
    company: asString(payload.company),
    message: asString(payload.message),
  };

  // Every part of the original HappyForms form is required, so all five are
  // enforced here too.
  const missing = (Object.keys(submission) as (keyof Submission)[]).filter(
    (key) => !submission[key],
  );

  if (missing.length > 0) {
    return Response.json(
      { error: "Please fill in every field before sending." },
      { status: 422 },
    );
  }

  if (!EMAIL_PATTERN.test(submission.email)) {
    return Response.json(
      { error: "That email address does not look right." },
      { status: 422 },
    );
  }

  if (submission.message.length > 5000) {
    return Response.json(
      {
        error:
          "That message is too long. Please keep it under 5000 characters.",
      },
      { status: 422 },
    );
  }

  const send = process.env.RESEND_API_KEY
    ? sendViaResend
    : process.env.CONTACT_WEBHOOK_URL
      ? sendViaWebhook
      : null;

  if (!send) {
    console.warn(
      "[contact] No RESEND_API_KEY or CONTACT_WEBHOOK_URL set — submission was not delivered.",
      submission,
    );
    return Response.json(
      {
        error: `This form is not connected to an inbox yet. Please email ${site.email} or call ${site.phone} in the meantime.`,
      },
      { status: 503 },
    );
  }

  try {
    await send(submission);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return Response.json(
      { error: "We could not send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
