type SectionHeadingProps = {
  eyebrow: string;
  lines: readonly string[];
};

export function SectionHeading({ eyebrow, lines }: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-black/35">{eyebrow}</p>
      <div className="space-y-1 text-3xl leading-tight text-black/80 md:text-[32px] md:leading-[1.2]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
