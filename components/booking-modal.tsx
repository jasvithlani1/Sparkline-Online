"use client";

import React, { useEffect, useRef, useState } from "react";
import { useBookingModal } from "./booking-modal-provider";

export function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Synchronize the HTML5 dialog state with the React state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      setIsLoading(true);
      if (!dialog.open) {
        dialog.showModal();
        // Prevent background scrolling
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
        // Restore background scrolling
        document.body.style.overflow = "";
      }
    }
  }, [isOpen]);

  // Synchronize state if dialog is closed via native mechanisms (like ESC key)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      closeModal();
      document.body.style.overflow = "";
    };

    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [closeModal]);

  // Fallback for browsers that do not support closedby="any" (like Safari)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Feature detect closedBy support
    const hasClosedBy = "closedBy" in HTMLDialogElement.prototype;
    if (hasClosedBy) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );

      if (!isDialogContent) {
        dialog.close();
      }
    };

    dialog.addEventListener("click", handleBackdropClick);
    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="booking-dialog"
      aria-labelledby="booking-dialog-title"
      {...{ closedby: "any" }}
    >
      <div className="relative flex h-full w-full flex-col">
        {/* Header Bar */}
        <div className="flex h-14 w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#070d1d] px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <img
              src="/logos/sparkline-new-logo.svg"
              alt="Sparkline Marketing Firm"
              className="h-5 w-auto sm:h-6"
            />
            <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
            <h2 id="booking-dialog-title" className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/50">
              Scheduler
            </h2>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20 active:scale-95"
            aria-label="Close modal"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area (Iframe and Loader) */}
        <div className="relative w-full flex-1 overflow-hidden bg-transparent">
          {/* Loading Spinner - positioned under header */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#060b1a] z-40">
              <div className="h-9 w-9 animate-spin rounded-full border-3 border-white/10 border-t-[#8F57FF]" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Loading Scheduler...
              </p>
            </div>
          )}

          {/* Booking Iframe (only renders when open to avoid background resource consumption) */}
          {isOpen && (
            <iframe
              src="https://crm.sparklinemarketingfirm.com/widget/booking/fseh3NlrLcMcooAlLbLB"
              className="h-full w-full border-0 bg-transparent"
              onLoad={() => setIsLoading(false)}
              title="Sparkline Booking Widget"
              allow="payment; microphone; camera; clipboard-write"
            />
          )}
        </div>
      </div>
    </dialog>
  );
}
