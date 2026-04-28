"use client";

import { useEffect } from "react";

export function ForceNewTabLinks() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.hasAttribute("data-keep-target")) return;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
