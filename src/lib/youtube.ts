import { isPlaceholder } from "./placeholders";

const ID_PATTERN = /^[A-Za-z0-9_-]{6,}$/;

export function youtubeId(url: string): string | null {
  if (!url || isPlaceholder(url)) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return ID_PATTERN.test(id) ? id : null;
    }

    if (
      parsed.hostname === "youtube.com" ||
      parsed.hostname.endsWith(".youtube.com")
    ) {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id && ID_PATTERN.test(id) ? id : null;
      }

      const match = parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/);
      return match && ID_PATTERN.test(match[1]) ? match[1] : null;
    }

    return null;
  } catch {
    return null;
  }
}

export function youtubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}
