import { site } from "@/content/site";
import { getGitHubActivity } from "@/lib/github";
import { getLeetCodeStats } from "@/lib/leetcode";
import { GitHubGraph } from "./GitHubGraph";

const isDev = process.env.NODE_ENV !== "production";

function GraphFallback() {
  return (
    <div className="mt-3">
      <div aria-hidden="true" className="flex gap-[3px]">
        {Array.from({ length: 20 }).map((_, index) => (
          <span
            key={index}
            className="block size-2 rounded-[2px] bg-line"
          />
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        {isDev
          ? "Add GITHUB_TOKEN to show contributions"
          : "Contribution data unavailable"}
      </p>
    </div>
  );
}

export async function ActivityStrip() {
  const [github, leetcode] = await Promise.all([
    getGitHubActivity(site.stats.github.username),
    getLeetCodeStats(site.stats.leetcode.username),
  ]);

  const solved = leetcode?.solved ?? site.stats.leetcode.solved;
  const streak = leetcode?.streak ?? site.stats.leetcode.streak;
  const merged = site.openSource.length;

  return (
    <section
      id="activity"
      aria-label="Activity"
      className="border-y border-line"
    >
      <div className="shell grid gap-6 py-8 md:grid-cols-[1.5fr_1fr_1fr] md:items-center md:gap-10">
        <div>
          <p className="eyebrow">GitHub</p>
          {github ? <GitHubGraph activity={github} /> : <GraphFallback />}
        </div>

        <div className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <p className="eyebrow">LeetCode</p>
          <div className="mt-2 flex gap-10">
            <div>
              <p className="display text-2xl text-gold">
                {solved ?? <span className="text-muted">—</span>}
              </p>
              <p className="eyebrow mt-1">Solved</p>
            </div>
            <div>
              <p className="display text-2xl">
                {streak ?? <span className="text-muted">—</span>}
              </p>
              <p className="eyebrow mt-1">Day streak</p>
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <p className="eyebrow">Open source</p>
          <p className="display mt-2 text-2xl">{merged}</p>
          <p className="eyebrow mt-1">Merged PRs</p>
        </div>
      </div>
    </section>
  );
}
