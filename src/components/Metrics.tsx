import type { Metric } from "@/content/types";
import { cx } from "@/lib/format";
import { Placeholder } from "./Placeholder";

type MetricsProps = {
  items: Metric[];
  className?: string;
};

export function Metrics({ items, className }: MetricsProps) {
  if (items.length === 0) return null;

  return (
    <dl
      className={cx(
        "grid grid-cols-2 gap-6 border-t border-line pt-6 sm:flex sm:gap-14",
        className,
      )}
    >
      {items.map((metric, index) => (
        <div key={`${metric.label}-${index}`}>
          <dt className="eyebrow">
            <Placeholder value={metric.label} />
          </dt>
          <dd
            className={cx(
              "display mt-1 text-2xl md:text-3xl",
              index === 0 ? "text-gold" : "text-ink",
            )}
          >
            <Placeholder value={metric.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
