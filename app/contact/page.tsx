"use client";

import { useState } from "react";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050C1E]">
      {/* Ambient background video — blended heavily into bg-[#050C1E] */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28] mix-blend-screen"
        >
          <source src="/videos/contact-water-light.webm" type="video/webm" />
          <source src="/videos/contact-water-light.mp4" type="video/mp4" />
        </video>
        {/* Deep tint to fuse the footage into the site background */}
        <div className="absolute inset-0 bg-[#050C1E]/70" />
        {/* Edge vignette — softens corners so the video reads as ambience, not content */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050C1E_95%)]" />
        {/* Top & bottom fades so navbar + footer seam cleanly */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050C1E] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#050C1E] to-transparent" />
      </div>

      <Navbar />

      <section
        id="contact-us"
        className="relative z-10 pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24"
      >
        <div className="mx-auto max-w-[1208px] px-5 sm:px-6 md:px-8">
          {/* Header */}
          <div className="mb-12 md:mb-16" />

          <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-20">
            {/* Contact info — left */}
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Phone
                  </h3>
                </div>
                <a
                  href="tel:+919876543210"
                  style={{ color: "#ffffff" }}
                  className="mt-3 block text-[16px] transition-opacity hover:opacity-80"
                >
                  +91 98765 43210
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Email
                  </h3>
                </div>
                <a
                  href="mailto:hello@sparklinemarketingfirm.com"
                  style={{ color: "#ffffff" }}
                  className="mt-3 block break-all text-[16px] transition-opacity hover:opacity-80"
                >
                  hello@sparklinemarketingfirm.com
                </a>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                    Location
                  </h3>
                </div>
                <p className="mt-3 text-[16px] leading-7 text-white">
                  Bengaluru, India
                  <br />
                  <span className="text-white">
                    Working globally, remote-first.
                  </span>
                </p>
              </div>
            </div>

            {/* Form — right */}
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-20 text-center">
                <p className="text-[24px] tracking-[-0.03em] text-white sm:text-[28px]">
                  Thank you!
                </p>
                <p className="mt-3 text-[15px] leading-7 text-white/60">
                  We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
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

                <button
                  type="submit"
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
                  Send Message
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
