import { isPlaceholder } from "./placeholders";

export type LeetCodeStats = {
  username: string;
  solved: number;
  streak: number;
};

type LeetCodeResponse = {
  data?: {
    matchedUser?: {
      submitStats?: {
        acSubmissionNum?: Array<{ difficulty: string; count: number }>;
      };
      userCalendar?: { streak: number };
    };
  };
};

const QUERY = `query userStats($username: String!) {
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
    userCalendar {
      streak
    }
  }
}`;

const REVALIDATE_SECONDS = 60 * 60 * 6;

/**
 * Public LeetCode stats. The endpoint is unofficial and can rate-limit or
 * change without notice, so every failure returns null and the UI falls back
 * to the manual numbers in content, then to a neutral placeholder.
 */
export async function getLeetCodeStats(
  username: string,
): Promise<LeetCodeStats | null> {
  if (!username || isPlaceholder(username)) return null;

  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${username}/`,
        "User-Agent": "personal-portfolio",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username },
        operationName: "userStats",
      }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as LeetCodeResponse;
    const user = payload.data?.matchedUser;
    if (!user) return null;

    const submission = user.submitStats?.acSubmissionNum?.find(
      (item) => item.difficulty === "All",
    );

    return {
      username,
      solved: submission?.count ?? 0,
      streak: user.userCalendar?.streak ?? 0,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("LeetCode stats unavailable:", error);
    }
    return null;
  }
}
