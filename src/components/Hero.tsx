import { site } from "@/content/site";
import { isPlaceholderUrl } from "@/lib/placeholders";
import { emailHref, socialUrls } from "@/lib/site-links";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";

const isDev = process.env.NODE_ENV !== "production";

export function Hero() {
  const { profile } = site;
  const urls = socialUrls(profile.socials);
  const mail = emailHref(profile.email);
  const mailMissing = isPlaceholderUrl(mail);

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[linear-gradient(to_bottom,var(--surface),transparent)] opacity-50"
      />

      <div className="shell flex flex-col pb-20 pt-20 md:pb-28 md:pt-28">
        <p className="eyebrow flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
          Portfolio
        </p>

        <h1 className="display mt-6 max-w-[15ch] text-[clamp(3rem,9vw,7rem)] text-balance">
          <Placeholder value={profile.name} />
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink/90 md:text-xl">
          <Placeholder value={profile.tagline} />
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {mailMissing ? (
            <span
              className={
                isDev
                  ? "placeholder-todo inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm"
                  : "inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm text-muted"
              }
              data-placeholder=""
            >
              Email
            </span>
          ) : (
            <a
              href={mail}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-90"
            >
              Email
              <ArrowUpRight className="size-3.5" />
            </a>
          )}

          <ExternalLink
            href={urls.github}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-gold"
          >
            GitHub
            <ArrowUpRight className="size-3.5" />
          </ExternalLink>
        </div>

        <p className="mt-10 flex items-center gap-2.5 text-sm text-muted">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
          />
          <Placeholder value={profile.status} />
        </p>
      </div>
    </section>
  );
}
