import type { ReactNode } from "react";
import { cx } from "@/lib/format";

type BrowserFrameProps = {
  url: string;
  children: ReactNode;
  className?: string;
};

/** A dark, thin browser chrome around project media. Decorative only. */
export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-[6px] border border-line bg-surface",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-raised px-3 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
          <span className="size-1.5 rounded-full bg-line-strong" />
        </span>
        <span className="mx-auto max-w-[70%] truncate rounded-full bg-bg/70 px-3 py-0.5 font-mono text-[10px] tracking-[0.08em] text-muted">
          {url}
        </span>
        <span aria-hidden="true" className="w-6" />
      </div>
      {children}
    </div>
  );
}
