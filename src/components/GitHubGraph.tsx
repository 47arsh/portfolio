import { cx } from "@/lib/format";
import type { GitHubActivity } from "@/lib/github";

const LEVEL_CLASS = [
  "bg-line",
  "bg-gold/25",
  "bg-gold/45",
  "bg-gold/70",
  "bg-gold",
] as const;

export function GitHubGraph({ activity }: { activity: GitHubActivity }) {
  return (
    <>
      <div
        role="img"
        aria-label={`${activity.total} GitHub contributions in the last six months`}
        className="mt-3 flex gap-[3px] overflow-hidden"
      >
        {activity.weeks.map((week, weekIndex) => (
          <div
            key={week[0]?.date ?? weekIndex}
            className="flex flex-col gap-[3px]"
          >
            {week.map((day) => (
              <span
                key={day.date}
                title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                className={cx(
                  "block size-2 rounded-[2px]",
                  LEVEL_CLASS[day.level],
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="display text-[clamp(1.6rem,2.4vw,2rem)] leading-none text-ink">
          {activity.total}
        </span>
        <span className="eyebrow">contributions / 6 months</span>
      </div>
    </>
  );
}
