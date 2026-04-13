"use client";

import { useState } from "react";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#050C1E]">
      <Navbar />

      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-[1208px] px-5 sm:px-6 md:px-8">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50 sm:text-[12px]">
              GET IN TOUCH
            </p>
            <h1 className="mt-4 text-[36px] leading-[1.08] tracking-[-0.04em] text-white sm:text-[48px] md:text-[56px]">
              Contact Us
            </h1>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-7 text-white/60 sm:text-[17px]">
              Have a project in mind? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-20">
            {/* Form */}
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
                className="space-y-6"
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
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#050C1E] transition-opacity hover:opacity-90"
                >
                  Send Message
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </form>
            )}

            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Email
                </h3>
                <a
                  href="mailto:hello@sparklinemarketingfirm.com"
                  className="mt-2 block text-[16px] text-white/80 transition-colors hover:text-white"
                >
                  hello@sparklinemarketingfirm.com
                </a>
              </div>

              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Socials
                </h3>
                <div className="mt-2 flex flex-col gap-1.5">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] text-white/80 transition-colors hover:text-white"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] text-white/80 transition-colors hover:text-white"
                  >
                    Pinterest
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Based in
                </h3>
                <p className="mt-2 text-[16px] text-white/80">
                  Working globally, remote-first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
