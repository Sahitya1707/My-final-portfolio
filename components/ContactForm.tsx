"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { services } from "@/content/services";

/**
 * Project enquiry form.
 *
 * - With NEXT_PUBLIC_WEB3FORMS_KEY set at build time, submissions are emailed to you by
 *   Web3Forms (free plan, no server needed).
 * - Without the key, or if the service is unreachable, it falls back to opening the visitor's
 *   email app with everything filled in. The form can never silently lose a message.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "mailto" } | { kind: "error"; msg: string };

const BUDGETS = ["Not sure yet", "Under CA$1,000", "CA$1,000 – 2,500", "CA$2,500 – 5,000", "Over CA$5,000"];

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  function openMailto(data: Record<string, string>) {
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.website ? `Current website: ${data.website}` : "",
      `Looking for: ${data.service}`,
      `Budget: ${data.budget}`,
      "",
      data.message,
    ]
      .filter((l) => l !== "")
      .join("\n");
    const subject = `Project enquiry from ${data.name}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setState({ kind: "mailto" });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("botcheck")) return; // honeypot filled: almost certainly a bot
    const data = Object.fromEntries(
      ["name", "email", "website", "service", "budget", "message"].map((k) => [k, String(fd.get(k) ?? "").trim()])
    ) as Record<string, string>;

    if (!ACCESS_KEY) return openMailto(data);

    setState({ kind: "sending" });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Project enquiry from ${data.name}`,
          from_name: "Portfolio contact form",
          replyto: data.email,
          name: data.name,
          email: data.email,
          "Current website": data.website || "—",
          "Looking for": data.service,
          Budget: data.budget,
          message: data.message,
          botcheck: "",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (res.ok && json.success) {
        setState({ kind: "sent" });
        form.reset();
      } else {
        setState({ kind: "error", msg: json.message || "The form service did not accept the message." });
      }
    } catch {
      setState({ kind: "error", msg: "The form service could not be reached." });
    }
  }

  if (state.kind === "sent") {
    return (
      <div role="status" className="border-t border-ink pt-8">
        <p className="label mb-4 !text-leaf">Message sent</p>
        <p className="font-serif text-display-md">Thank you. I&rsquo;ll reply {site.replyTime}.</p>
        <p className="mt-4 text-muted">
          If it&rsquo;s urgent, email me directly at{" "}
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const field = "mt-2 block w-full border-0 border-b border-ink/40 bg-transparent px-0 py-3 text-lg placeholder:text-muted/70 focus:border-signal focus:outline-none focus:ring-0";

  return (
    <form onSubmit={onSubmit} className="grid gap-8" noValidate={false}>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="label">Your name *</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="label">Email *</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="label">Current website, if you have one</span>
        <input name="website" type="text" inputMode="url" placeholder="yourbusiness.com" className={field} />
      </label>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="label">What do you need?</span>
          <select name="service" className={`${field} cursor-pointer`} defaultValue={services[0].name}>
            {services.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
            <option>Something else</option>
          </select>
        </label>
        <label className="block">
          <span className="label">Rough budget</span>
          <select name="budget" className={`${field} cursor-pointer`} defaultValue={BUDGETS[0]}>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="label">Tell me about the project *</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What does your business do, what should the website achieve, and is there a date you're working towards?"
          className={`${field} resize-y`}
        />
      </label>
      {/* Honeypot: hidden from people, tempting to bots */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn justify-center disabled:opacity-60" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Sending…" : "Send enquiry"} <span className="arrow">→</span>
        </button>
        <p className="text-sm text-muted">I reply {site.replyTime}. Your details are only used to answer you.</p>
      </div>

      <div aria-live="polite">
        {state.kind === "mailto" ? (
          <p className="border-l-2 border-leaf pl-4 text-[0.95rem]">
            Your email app should now be open with the message ready to send. If nothing happened, email me at{" "}
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        ) : null}
        {state.kind === "error" ? (
          <p className="border-l-2 border-signal pl-4 text-[0.95rem]">
            {state.msg} Your message hasn&rsquo;t been lost:{" "}
            <button
              type="button"
              className="link"
              onClick={(ev) => {
                const form = (ev.currentTarget.closest("form") as HTMLFormElement) || undefined;
                if (!form) return;
                const fd = new FormData(form);
                openMailto(
                  Object.fromEntries(
                    ["name", "email", "website", "service", "budget", "message"].map((k) => [k, String(fd.get(k) ?? "")])
                  ) as Record<string, string>
                );
              }}
            >
              send it from your email app instead
            </button>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
