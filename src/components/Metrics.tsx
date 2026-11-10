import type { Metric } from "@/content/types";
import { cx } from "@/lib/format";
import { isPlaceholder } from "@/lib/placeholders";

type MetricsProps = {
  items: Metric[];
  className?: string;
};

export function Metrics({ items, className }: MetricsProps) {
  const real = items.filter(
    (metric) =>
      !isPlaceholder(metric.label) && !isPlaceholder(metric.value),
  );

  if (real.length === 0) return null;

  return (
    <dl
      className={cx(
        "grid grid-cols-2 gap-8 border-t border-line pt-8 sm:flex sm:gap-20",
        className,
      )}
    >
      {real.map((metric, index) => (
        <div key={`${metric.label}-${index}`}>
          <dt className="eyebrow">{metric.label}</dt>
          <dd
            className={cx(
              "display mt-2 text-[clamp(2.5rem,5vw,3.5rem)] leading-none",
              index === 0 ? "text-gold" : "text-ink",
            )}
          >
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
