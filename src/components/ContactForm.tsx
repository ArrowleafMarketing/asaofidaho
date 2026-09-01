"use client";

import { useId, useState } from "react";

import { site } from "@/lib/site";

/**
 * Replacement for the HappyForms form (`happyforms-135`) in the blue contact
 * column on the homepage. Same fields, same order, same labels, same honeypot;
 * the submit posts to /api/contact instead of admin-ajax.php.
 *
 * All five parts carry `data-happyforms-required` on the original, and
 * HappyForms' validator treats that presence attribute as required — so every
 * field is required here too, even though the original renders no asterisk
 * (the `.happyforms-required` span is empty).
 *
 * Styling matches the plugin's resolved CSS: 16px labels with a 15px gap,
 * 10px padding, 6px radius, #dbdbdb borders, and a #7aa4ff border plus 1px
 * inset ring on focus.
 */

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "sent" }
  | { state: "error"; message: string };

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    autoComplete: "email",
  },
  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
  {
    name: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
  },
] as const;

const MESSAGE_LABEL = "Please fill in your comment or question here.";

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [invalid, setInvalid] = useState<string[]>([]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    const missing = [...FIELDS.map((f) => f.name), "message"].filter(
      (name) => !(data[name] ?? "").trim(),
    );

    if (missing.length > 0) {
      setInvalid(missing);
      setStatus({
        state: "error",
        message: "Please fill in every field before sending.",
      });
      return;
    }

    setInvalid([]);
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus({
          state: "error",
          message: body.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({
        state: "error",
        message: `We could not reach the server. Please try again, or email ${site.email}.`,
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div
        role="status"
        className="rounded-md border border-[#1eb452] bg-[#ebf9f0] px-4 py-3 text-[16px] text-[#1eb452]"
      >
        Thanks — your message is on its way. We&apos;ll be in touch shortly.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
      className="text-left"
    >
      {/* Honeypot, mirroring HappyForms' spam trap. */}
      <label htmlFor={`${uid}-hp`} className="screen-reader-text">
        Leave this field blank
      </label>
      <input
        type="text"
        id={`${uid}-hp`}
        name="honeypot"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ display: "none" }}
      />

      {FIELDS.map((field) => (
        <div key={field.name} className="mb-5">
          <label htmlFor={`${uid}-${field.name}`} className="hf-label">
            {field.label}
          </label>
          <input
            id={`${uid}-${field.name}`}
            name={field.name}
            type={field.type}
            required
            aria-invalid={invalid.includes(field.name) || undefined}
            autoComplete={field.autoComplete}
            spellCheck={false}
            className="hf-field"
          />
        </div>
      ))}

      <div className="mb-5">
        <label htmlFor={`${uid}-message`} className="hf-label">
          {MESSAGE_LABEL}
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          required
          aria-invalid={invalid.includes("message") || undefined}
          spellCheck={false}
          className="hf-field resize-y"
        />
      </div>

      {status.state === "error" && (
        <p
          role="alert"
          className="mb-5 rounded-md border border-[#f23000] bg-[#ffeeea] px-3 py-2 text-[14px] text-[#f23000]"
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className="hf-submit"
      >
        {status.state === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
