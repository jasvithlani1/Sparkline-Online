type SectionHeadingProps = {
  eyebrow: string;
  lines: readonly string[];
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, lines, tone = "light" }: SectionHeadingProps) {
  const eyebrowClass =
    tone === "dark"
      ? "text-[11px] uppercase tracking-[0.24em] text-white/55 sm:text-sm sm:tracking-[0.3em]"
      : "text-[11px] uppercase tracking-[0.24em] text-black/35 sm:text-sm sm:tracking-[0.3em]";
  const linesClass =
    tone === "dark"
      ? "text-balance text-[28px] leading-[1.2] text-white/88 sm:text-[32px] sm:leading-[1.22] md:text-[40px] md:leading-[1.22]"
      : "text-balance text-[28px] leading-[1.2] text-black/80 sm:text-[32px] sm:leading-[1.22] md:text-[40px] md:leading-[1.22]";

  const copy = lines.join(" ").replace(/\s+/g, " ").trim();

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center sm:gap-5 md:gap-6">
      <p className={eyebrowClass}>{eyebrow}</p>
      <p className={linesClass}>{copy}</p>
    </div>
  );
}
