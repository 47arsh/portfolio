import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  intro,
  className,
}: SectionHeadingProps) {
  return (
    <header className={className}>
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-6 bg-gold" />
        <p className="eyebrow">{label}</p>
      </div>
      <h2 className="display mt-5 text-[clamp(1.75rem,4vw,2.5rem)] text-balance">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 max-w-xl text-sm text-muted md:text-base">{intro}</p>
      ) : null}
    </header>
  );
}
