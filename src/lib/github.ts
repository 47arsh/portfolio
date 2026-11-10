import { isPlaceholder } from "./placeholders";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionWeek = ContributionDay[];

export type GitHubActivity = {
  username: string;
  total: number;
  weeks: ContributionWeek[];
};

type GitHubResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              date: string;
              contributionCount: number;
            }>;
          }>;
        };
      };
    };
  };
};

const WEEKS = 26;
const REVALIDATE_SECONDS = 60 * 60 * 6;

const QUERY = `query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/**
 * Server-side GitHub contributions for the last six months. Returns null for
 * a missing token, a placeholder username, a network error, or an unexpected
 * payload — the UI always has a neutral fallback.
 */
export async function getGitHubActivity(
  username: string,
): Promise<GitHubActivity | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token || !username || isPlaceholder(username)) return null;

  const to = new Date();
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - WEEKS * 7);

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "personal-portfolio",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          login: username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as GitHubResponse;
    const calendar =
      payload.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) return null;

    const weeks = calendar.weeks
      .map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: levelFor(day.contributionCount),
        })),
      )
      .filter((week): week is ContributionWeek => week.length > 0)
      .slice(-WEEKS);

    if (weeks.length === 0) return null;

    return { username, total: calendar.totalContributions, weeks };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("GitHub contributions unavailable:", error);
    }
    return null;
  }
}
