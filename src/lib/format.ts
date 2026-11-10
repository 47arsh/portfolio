export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

/** "https://anytimedesk.in/" -> "anytimedesk.in" */
export function displayHost(url: string): string {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

/** Splits a free-form date string into a machine-ish ISO attribute only when safe. */
export function dateTimeAttribute(value: string): string | undefined {
  return /^\d{4}-\d{2}(-\d{2})?$/.test(value) ? value : undefined;
}
