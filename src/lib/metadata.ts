import type { Metadata } from "next";
import { site } from "@/content/site";
import { isPlaceholder, stripPlaceholder } from "./placeholders";

const FALLBACK_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value?.trim()) return FALLBACK_URL;

  const candidate = /^https?:\/\//i.test(value)
    ? value.trim()
    : `https://${value.trim()}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return FALLBACK_URL;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteName = isPlaceholder(site.profile.name)
  ? "Portfolio"
  : stripPlaceholder(site.profile.name);

export const siteTagline = isPlaceholder(site.profile.tagline)
  ? ""
  : stripPlaceholder(site.profile.tagline);

export const siteDescription = siteTagline || "A personal portfolio.";

export const siteTitle = siteTagline
  ? `${siteName} — ${siteTagline}`
  : siteName;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};
