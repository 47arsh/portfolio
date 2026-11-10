import { site } from "@/content/site";
import { getGitHubActivity } from "@/lib/github";
import { getLeetCodeStats } from "@/lib/leetcode";
import { GitHubGraph } from "./GitHubGraph";

const isDev = process.env.NODE_ENV !== "production";

function GraphFallback() {
  return (
    <div className="mt-3">
      <div aria-hidden="true" className="flex gap-[3px]">
        {Array.from({ length: 26 }).map((_, index) => (
          <span key={index} className="block size-2 rounded-[2px] bg-line" />
        ))}
      </div>
      <p className="eyebrow mt-3">
        {isDev ? "Set GITHUB_TOKEN for the live graph" : "Graph unavailable"}
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  gold = false,
}: {
  label: string;
  value: number | null | undefined;
  gold?: boolean;
}) {
  return (
    <div>
      <p
        className={
          gold
            ? "display text-[clamp(2rem,3vw,2.6rem)] leading-none text-gold"
            : "display text-[clamp(2rem,3vw,2.6rem)] leading-none text-ink"
        }
      >
        {value ?? <span className="text-muted">—</span>}
      </p>
      <p className="eyebrow mt-2">{label}</p>
    </div>
  );
}

export async function ActivityStrip() {
  const [github, leetcode] = await Promise.all([
    getGitHubActivity(site.stats.github.username),
    getLeetCodeStats(site.stats.leetcode.username),
  ]);

  const solved = leetcode?.solved ?? site.stats.leetcode.solved;
  const rating = site.stats.leetcode.rating;
  const pullRequests = site.openSource.length;

  return (
    <section
      id="activity"
      aria-label="Activity"
      className="border-y border-line bg-surface/25"
    >
      <div className="shell">
        <div className="grid gap-8 py-9 md:grid-cols-[148px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-16">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="hairline-gold" />
            Activity
          </p>

          <div className="grid gap-8 sm:grid-cols-[1.5fr_1fr_0.8fr] sm:gap-10">
            <div className="min-w-0">
              <p className="eyebrow">GitHub</p>
              {github ? (
                <GitHubGraph activity={github} />
              ) : (
                <GraphFallback />
              )}
            </div>

            <div className="border-t border-line pt-6 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <p className="eyebrow">LeetCode</p>
              <div className="mt-3 flex gap-9">
                <Stat label="Solved" value={solved} gold />
                <Stat label="Rating" value={rating} />
              </div>
            </div>

            <div className="border-t border-line pt-6 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <p className="eyebrow">Open source</p>
              <div className="mt-3">
                <Stat label="Pull requests" value={pullRequests} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
