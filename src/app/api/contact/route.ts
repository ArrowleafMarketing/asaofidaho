/**
 * Contact form endpoint, replacing the HappyForms handler the WordPress site
 * used.
 *
 * Delivery is intentionally pluggable: set CONTACT_WEBHOOK_URL (Zapier, Make,
 * Formspree, an SMTP-backed function — anything that accepts a JSON POST) and
 * submissions are forwarded there. With no provider configured the route still
 * validates and logs the submission so the form is testable, and it tells the
 * caller the message was not delivered rather than pretending it was.
 */

type Submission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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
      { error: "That message is too long. Please keep it under 5000 characters." },
      { status: 422 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      "[contact] CONTACT_WEBHOOK_URL is not set — submission was not delivered.",
      submission,
    );
    return Response.json(
      {
        error:
          "This form is not connected to an inbox yet. Please email or call 208-921-4546 in the meantime.",
      },
      { status: 503 },
    );
  }

  try {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...submission,
        source: "asaofidaho.com contact form",
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!forwarded.ok) {
      console.error(
        `[contact] webhook responded ${forwarded.status} ${forwarded.statusText}`,
      );
      return Response.json(
        { error: "We could not send your message. Please try again shortly." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] webhook request failed", error);
    return Response.json(
      { error: "We could not send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
