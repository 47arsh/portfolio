const PLACEHOLDER_PATTERN = /\{\{TODO(?:_URL)?:\s*([\s\S]*?)\}\}/;

export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return false;
  return PLACEHOLDER_PATTERN.test(value);
}

/** Human-readable instruction inside a placeholder, without the braces. */
export function placeholderHint(value: string): string | null {
  const match = value.match(PLACEHOLDER_PATTERN);
  return match ? match[1].trim() : null;
}

/** Placeholder-safe display text for metadata and aria labels. */
export function stripPlaceholder(value: string): string {
  return value
    .replace(/\{\{TODO(?:_URL)?:\s*/g, "")
    .replace(/\}\}/g, "")
    .trim();
}

export function isPlaceholderUrl(value: string | null | undefined): boolean {
  return !value || isPlaceholder(value);
}
