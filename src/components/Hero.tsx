import { site } from "@/content/site";
import { isPlaceholder, isPlaceholderUrl, stripPlaceholder } from "@/lib/placeholders";
import { emailHref, socialUrls } from "@/lib/site-links";
import { ExternalLink } from "./ExternalLink";
import { HeroPlayButton } from "./HeroPlayButton";
import { ArrowUpRight } from "./icons";
import { LocalClock } from "./LocalClock";
import { Placeholder } from "./Placeholder";
import { Waveform } from "./Waveform";

export function Hero() {
  const { profile } = site;
  const urls = socialUrls(profile.socials);
  const mail = emailHref(profile.email);
  const mailMissing = isPlaceholderUrl(mail);
  const lines = isPlaceholder(profile.name)
    ? [profile.name]
    : profile.name.split(/\s+/).filter(Boolean);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] flex-col overflow-hidden pt-10 md:pt-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[72%]"
        style={{
          background:
            "radial-gradient(70% 62% at 50% 0%, var(--hero-warmth), transparent 72%)",
        }}
      />

      <div className="shell flex flex-1 flex-col">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="eyebrow text-ink">Portfolio</p>
          <LocalClock location={profile.location} />
        </div>

        <h1
          className="hero-name display mt-14 text-balance md:mt-14"
          aria-label={stripPlaceholder(profile.name)}
        >
          <span className="sr-only">
            <Placeholder value={profile.name} />
          </span>
          <span aria-hidden="true">
            {lines.map((word, index) => (
              <span className="line-mask" key={`${word}-${index}`}>
                <span
                  className={index > 0 ? "italic" : undefined}
                  style={{ animationDelay: `${90 + index * 90}ms` }}
                >
                  <Placeholder value={word} />
                </span>
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-12 flex flex-1 flex-col justify-end gap-12 md:mt-12 md:grid md:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] md:items-end md:gap-16">
          <div className="order-2 flex flex-col items-start gap-6 md:order-1">
            <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface/50 px-4 py-2 text-[13px] leading-snug text-ink/90">
              <span aria-hidden="true" className="status-dot size-1.5 shrink-0 rounded-full bg-gold" />
              <Placeholder value={profile.status} />
            </p>

            {site.heroTrack ? (
              <HeroPlayButton track={site.heroTrack} />
            ) : null}
          </div>

          <div className="order-1 md:order-2">
            <p className="lead max-w-[38ch]">
              <Placeholder value={profile.tagline} />
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {mailMissing ? (
                <span className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm text-muted">
                  Email
                </span>
              ) : (
                <a
                  href={mail}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85"
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
                <ArrowUpRight className="size-3.5 text-gold" />
              </ExternalLink>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-6 pb-4 pt-14 md:pt-16">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 text-muted transition-colors hover:text-ink"
          >
            <span
              aria-hidden="true"
              className="relative block h-10 w-px overflow-hidden bg-line"
            >
              <span className="scroll-cue-line absolute inset-0 block bg-gold" />
            </span>
            <span className="eyebrow transition-colors group-hover:text-ink">
              Scroll
            </span>
          </a>

          <p className="eyebrow hidden sm:block">Selected work below</p>
        </div>

        <div className="-mx-[var(--gutter)] mt-2 border-t border-line/60 px-[var(--gutter)] pt-4">
          <Waveform variant="hero" />
        </div>
      </div>
    </section>
  );
}
