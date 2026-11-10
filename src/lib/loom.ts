import { isPlaceholder } from "./placeholders";

export function loomEmbedUrl(url: string): string | null {
  if (!url || isPlaceholder(url)) return null;

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("loom.com")) return null;

    const match = parsed.pathname.match(/\/(?:share|embed)\/([A-Za-z0-9]+)/);
    return match ? `https://www.loom.com/embed/${match[1]}` : null;
  } catch {
    return null;
  }
}
