import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "dark" | "light";
  className?: string;
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function Breadcrumb({ items, variant = "dark", className = "" }: BreadcrumbProps) {
  const textBase = variant === "dark" ? "text-white/50" : "text-black/40";
  const textActive = variant === "dark" ? "text-white/80 hover:text-white" : "text-black/70 hover:text-black";
  const textCurrent = variant === "dark" ? "text-white/60" : "text-black/50";
  const chevronColor = variant === "dark" ? "text-white/25" : "text-black/25";

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center ${className}`}>
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${textBase}`}>
        <li>
          <Link href="/" className={`transition-colors duration-200 ${textActive}`}>
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              <ChevronRight className={`w-3 h-3 shrink-0 ${chevronColor}`} />
              {isLast || !item.url ? (
                <span className={textCurrent} aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className={`transition-colors duration-200 ${textActive}`}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
