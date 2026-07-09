"use client";

import { useState } from "react";

const BREVO_API = "https://api.brevo.com/v3/smtp/email";
const SENDER = { name: "Sparkline Marketing Firm", email: "info@sparklinemarketingfirm.com" };
const RECIPIENT = { name: "Sparkline Marketing Firm", email: "info@sparklinemarketingfirm.com" };

function buildConfirmationEmailHtml(name: string, subject: string, message: string): string {
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f1f1f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f1f4;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8F57FF 0%,#4C2FFF 100%);border-radius:12px 12px 0 0;padding:36px 40px;">
              <img src="https://www.sparklinemarketingfirm.com/logos/sparkline-new-logo.svg" alt="Sparkline Marketing Firm" width="160" style="display:block;height:auto;margin-bottom:20px;" />
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">We've received your enquiry</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">
              <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#111827;">Hi ${escaped(name)},</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#374151;">
                Thank you for reaching out to Sparkline Marketing Firm. We've received your message and our team will get back to you within <strong style="color:#111827;">1–2 business days</strong>.
              </p>

              <!-- Divider -->
              <div style="height:1px;background:#f0f0f4;margin:0 0 24px;"></div>

              <!-- Summary -->
              <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#8F57FF;">Your subject</p>
              <p style="margin:0 0 24px;font-size:16px;color:#111827;font-weight:500;">${escaped(subject)}</p>

              <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#8F57FF;">Your message</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#374151;">${escaped(message)}</p>

              <!-- Divider -->
              <div style="height:1px;background:#f0f0f4;margin:0 0 24px;"></div>

              <p style="margin:0;font-size:15px;line-height:1.6;color:#374151;">
                In the meantime, feel free to explore our work at
                <a href="https://www.sparklinemarketingfirm.com" style="color:#4C2FFF;text-decoration:none;">sparklinemarketingfirm.com</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9fb;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #ebebf0;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Sparkline Marketing Firm &nbsp;·&nbsp; info@sparklinemarketingfirm.com &nbsp;·&nbsp; (470) 841-2335
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailHtml(name: string, email: string, subject: string, message: string): string {
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f1f1f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f1f4;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8F57FF 0%,#4C2FFF 100%);border-radius:12px 12px 0 0;padding:36px 40px;">
              <img src="https://www.sparklinemarketingfirm.com/logos/sparkline-new-logo.svg" alt="Sparkline Marketing Firm" width="160" style="display:block;height:auto;margin-bottom:20px;" />
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">New Enquiry</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Name -->
              <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#8F57FF;">From</p>
              <p style="margin:0 0 24px;font-size:16px;color:#111827;font-weight:500;">${escaped(name)}</p>

              <!-- Email -->
              <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#8F57FF;">Email</p>
              <p style="margin:0 0 24px;font-size:16px;color:#111827;">
                <a href="mailto:${escaped(email)}" style="color:#4C2FFF;text-decoration:none;">${escaped(email)}</a>
              </p>

              <!-- Subject -->
              <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#8F57FF;">Subject</p>
              <p style="margin:0 0 24px;font-size:16px;color:#111827;font-weight:500;">${escaped(subject)}</p>

              <!-- Divider -->
              <div style="height:1px;background:#f0f0f4;margin:0 0 24px;"></div>

              <!-- Message -->
              <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#8F57FF;">Message</p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#374151;">${escaped(message)}</p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9fb;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #ebebf0;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Reply directly to this email to respond to ${escaped(name)}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-20 text-center">
        <p className="text-[24px] tracking-[-0.03em] text-white sm:text-[28px]">
          Thank you!
        </p>
        <p className="mt-3 text-[15px] leading-7 text-white/60">
          We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = (formData.get("name") as string) ?? "";
        const email = (formData.get("email") as string) ?? "";
        const subject = (formData.get("subject") as string) ?? "";
        const message = (formData.get("message") as string) ?? "";

        setIsSubmitting(true);
        setErrorMessage("");

        try {
          const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
          if (!apiKey) throw new Error("Email service not configured.");

          const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-key": apiKey,
          };

          // Send internal notification to Sparkline team
          const internalRes = await fetch(BREVO_API, {
            method: "POST",
            headers,
            body: JSON.stringify({
              sender: SENDER,
              to: [RECIPIENT],
              replyTo: { name, email },
              subject: `New Enquiry: ${subject}`,
              htmlContent: buildEmailHtml(name, email, subject, message),
            }),
          });

          if (!internalRes.ok) {
            const data = (await internalRes.json().catch(() => null)) as { message?: string } | null;
            setErrorMessage(data?.message ?? "Unable to send your message right now.");
            setIsSubmitting(false);
            return;
          }

          // Send confirmation email to the customer
          await fetch(BREVO_API, {
            method: "POST",
            headers,
            body: JSON.stringify({
              sender: SENDER,
              to: [{ name, email }],
              subject: `We've received your enquiry — Sparkline Marketing Firm`,
              htmlContent: buildConfirmationEmailHtml(name, subject, message),
            }),
          });

          // Save enquiry to Sanity
          const writeToken = process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN;
          if (writeToken) {
            try {
              await fetch(
                "https://8g3u06mk.api.sanity.io/v2026-05-30/data/mutate/production",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${writeToken}`,
                  },
                  body: JSON.stringify({
                    mutations: [
                      {
                        create: {
                          _type: "enquiry",
                          name,
                          email,
                          subject,
                          message,
                          submittedAt: new Date().toISOString(),
                          status: "new",
                        },
                      },
                    ],
                  }),
                }
              );
            } catch {
              // Non-critical — email was already sent
            }
          }

          setSubmitted(true);
        } catch {
          setErrorMessage("Unable to send your message right now.");
          setIsSubmitting(false);
        }
      }}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="What's this about?"
          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your project..."
          className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none transition-colors focus:border-white/30"
        />
      </div>

      {errorMessage ? (
        <p role="alert" className="text-[14px] leading-6 text-red-200">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-white transition-transform hover:-translate-y-0.5 active:scale-[0.96]"
        style={{
          paddingInline: "16px",
          paddingBlock: "12px",
          borderRadius: "8px",
          backgroundImage: "linear-gradient(180deg, #8F57FF 0%, #4C2FFF 100%)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#FFFFFF29",
          boxShadow:
            "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
          fontSize: "15px",
          lineHeight: "18px",
          fontWeight: 600,
          fontFamily: '"Geist-SemiBold", "Geist", system-ui, sans-serif',
        }}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  );
}
