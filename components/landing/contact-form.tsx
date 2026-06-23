"use client";

import { useState } from "react";

const CONTACT_API = "https://formspree.io/f/meewjvgj";

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

        setIsSubmitting(true);
        setErrorMessage("");

        try {
          const response = await fetch(CONTACT_API, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              name: formData.get("name"),
              email: formData.get("email"),
              subject: formData.get("subject"),
              message: formData.get("message"),
            }),
          });

          if (!response.ok) {
            const data = (await response.json().catch(() => null)) as { error?: string } | null;
            setErrorMessage(data?.error ?? "Unable to send your message right now.");
            setIsSubmitting(false);
            return;
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
          backgroundImage:
            "linear-gradient(180deg, #8F57FF 0%, #4C2FFF 100%)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#FFFFFF29",
          boxShadow:
            "#FFFFFF14 0px 0.5px 0.5px inset, #5F38D933 0px 1px 1px, #5F38D933 0px 1px 1px, #4C2FFF66 0px 2px 5px -2px, #4C2FFF 0px 0px 0px 1px",
          fontSize: "15px",
          lineHeight: "18px",
          fontWeight: 600,
          fontFamily:
            '"Geist-SemiBold", "Geist", system-ui, sans-serif',
        }}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  );
}
