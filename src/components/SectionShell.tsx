import type { ReactNode } from "react";
import { cx } from "@/lib/format";

type SectionShellProps = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * Shared editorial grid: a narrow mono label column on the left, content on
 * the right. Every numbered section uses it so the rhythm stays consistent.
 */
export function SectionShell({
  id,
  index,
  label,
  title,
  intro,
  children,
  className,
}: SectionShellProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cx("section border-t border-line", className)}
    >
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-[148px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-16">
          <header className="md:sticky md:top-[calc(var(--nav-h)+32px)] md:self-start">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="hairline-gold" />
              <span className="eyebrow text-ink">{index}</span>
            </div>
            <p className="eyebrow mt-3">{label}</p>
          </header>

          <div className="min-w-0">
            <h2
              id={headingId}
              className="display text-[clamp(2.35rem,4.6vw,3.6rem)] text-balance"
            >
              {title}
            </h2>
            {intro ? <p className="lead mt-4 max-w-[52ch]">{intro}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
