import type { SocialLinks } from "@/content/types";
import { isPlaceholder } from "./placeholders";

function profileUrl(value: string, base: string): string {
  if (isPlaceholder(value)) return value;
  if (/^https?:\/\//i.test(value)) return value;
  return `${base}${value.replace(/^@/, "")}`;
}

/** Builds profile URLs from the usernames/handles stored in content. */
export function socialUrls(socials: SocialLinks) {
  return {
    github: profileUrl(socials.github, "https://github.com/"),
    x: profileUrl(socials.x, "https://x.com/"),
    linkedin: socials.linkedin,
    leetcode: profileUrl(socials.leetcode, "https://leetcode.com/u/"),
    youtube: socials.youtube,
  };
}

export function emailHref(email: string): string {
  if (isPlaceholder(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return email;
  }
  return `mailto:${email}`;
}
