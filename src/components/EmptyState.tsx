import { cx } from "@/lib/format";

const isDev = process.env.NODE_ENV !== "production";

type EmptyStateProps = {
  label: string;
  note: string;
  className?: string;
};

/**
 * A quiet, intentional stand-in for content the owner has not written yet.
 * Development keeps a dashed gold cue; production reads as a calm note.
 */
export function EmptyState({ label, note, className }: EmptyStateProps) {
  return (
    <div
      data-placeholder=""
      className={cx(
        "flex flex-col gap-1.5 border-t py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8",
        isDev ? "border-dashed border-gold/30" : "border-line",
        className,
      )}
    >
      <p className="eyebrow">{label}</p>
      <p className="max-w-[46ch] text-sm leading-relaxed text-muted sm:text-right">
        {note}
      </p>
    </div>
  );
}
