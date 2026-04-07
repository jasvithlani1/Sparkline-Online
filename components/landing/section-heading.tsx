type SectionHeadingProps = {
  eyebrow: string;
  lines: readonly string[];
};

export function SectionHeading({ eyebrow, lines }: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center sm:gap-5 md:gap-6">
      <p className="text-[11px] uppercase tracking-[0.24em] text-black/35 sm:text-sm sm:tracking-[0.3em]">
        {eyebrow}
      </p>
      <div className="space-y-1 text-[28px] leading-[1.12] text-black/80 sm:text-[32px] sm:leading-[1.16] md:text-[40px] md:leading-[1.18]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
