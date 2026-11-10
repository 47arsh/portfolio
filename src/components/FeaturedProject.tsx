import Link from "next/link";
import { site } from "@/content/site";
import { cx, displayHost } from "@/lib/format";
import { isPlaceholder, stripPlaceholder } from "@/lib/placeholders";
import { BrowserFrame } from "./BrowserFrame";
import { EmptyState } from "./EmptyState";
import { ExternalLink } from "./ExternalLink";
import { ArrowRight, ArrowUpRight } from "./icons";
import { LoomFacade } from "./LoomFacade";
import { Metrics } from "./Metrics";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { Screenshot } from "./Screenshot";
import { SectionShell } from "./SectionShell";

const isDev = process.env.NODE_ENV !== "production";

export function FeaturedProject() {
  const { featured } = site;
  const projectName = stripPlaceholder(featured.name);
  const siteLabel = displayHost(featured.url);
  const firstScreenshot = featured.screenshots[0];
  const hasScreenshot = firstScreenshot && !isPlaceholder(firstScreenshot);
  const writeUpMissing =
    isPlaceholder(featured.problem) && isPlaceholder(featured.built);
  const learnedReady = !isPlaceholder(featured.learned);

  return (
    <SectionShell
      id="work"
      index="01"
      label="Work"
      title="Featured work"
      intro="The featured build, in more detail."
    >
      <Reveal>
        <article className="mt-12 md:mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-ink">Featured project</span>
            <span aria-hidden="true" className="h-px w-8 bg-line" />
            <ExternalLink
              href={featured.url}
              className="eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              ariaLabel={`Visit ${siteLabel}`}
            >
              {siteLabel}
              <ArrowUpRight className="size-3 text-gold" />
            </ExternalLink>
          </div>

          <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-16">
            <div>
              <h3 className="display text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] text-balance">
                <Placeholder value={featured.name} />
              </h3>
              <p className="lead mt-6 max-w-[44ch]">
                <Placeholder value={featured.oneLiner} />
              </p>
            </div>

            <dl className="border-b border-line">
              {featured.role && !isPlaceholder(featured.role) ? (
                <div className="spec-row">
                  <dt className="eyebrow">Role</dt>
                  <dd className="text-sm text-ink/90">{featured.role}</dd>
                </div>
              ) : null}
              <div className="spec-row">
                <dt className="eyebrow">Built with</dt>
                <dd className="max-w-[210px] text-right text-sm leading-relaxed text-muted">
                  {featured.stack.join(", ")}
                </dd>
              </div>
              <div className="spec-row">
                <dt className="eyebrow">Site</dt>
                <dd>
                  <ExternalLink
                    href={featured.url}
                    className="link-quiet text-sm text-ink/90"
                  >
                    {siteLabel}
                  </ExternalLink>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-6">
            <BrowserFrame url={siteLabel}>
              {hasScreenshot ? (
                <Screenshot
                  src={firstScreenshot}
                  alt={`${projectName} screenshot 1`}
                  label="Screenshot 1"
                  className="rounded-none border-0"
                />
              ) : (
                <div
                  data-placeholder=""
                  className={cx(
                    "relative flex min-h-[240px] flex-col items-center justify-center bg-[radial-gradient(circle,rgba(237,235,230,0.07)_1px,transparent_1px)] [background-size:22px_22px] md:min-h-[300px]",
                    isDev && "m-3 border border-dashed border-gold/25",
                  )}
                >
                  <p className="eyebrow">Product view</p>
                  <p className="mt-2 px-6 text-center font-serif text-xl text-muted">
                    Screenshots coming soon
                  </p>
                </div>
              )}
            </BrowserFrame>

            <div className="flex flex-col gap-5">
              <LoomFacade
                videoUrl={featured.demoVideoUrl}
                title={`${projectName} demo`}
              />
            </div>
          </div>

          <Metrics items={featured.metrics} className="mt-12" />

          {writeUpMissing ? (
            <EmptyState
              className="mt-12"
              label="Case study"
              note="The problem and build notes are being written. The full walkthrough will live on the case study page."
            />
          ) : (
            <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-2">
              <div>
                <h4 className="eyebrow">The problem</h4>
                <p className="prose-quiet mt-3 max-w-prose text-sm md:text-base">
                  <Placeholder value={featured.problem} />
                </p>
              </div>
              <div>
                <h4 className="eyebrow">What I built</h4>
                <p className="prose-quiet mt-3 max-w-prose text-sm md:text-base">
                  <Placeholder value={featured.built} />
                </p>
              </div>
            </div>
          )}

          {learnedReady ? (
            <p className="mt-10 max-w-3xl border-l border-gold/40 pl-5 text-sm italic leading-relaxed text-muted">
              What I&apos;d do differently:{" "}
              <Placeholder value={featured.learned} />
            </p>
          ) : null}

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
            <Link
              href={`/work/${featured.slug}`}
              className="group inline-flex items-center gap-3 font-serif text-2xl text-ink transition-colors hover:text-gold-soft md:text-3xl"
            >
              Read the case study
              <ArrowRight className="size-5 text-gold transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <ExternalLink
              href={featured.url}
              className="eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              showArrow
            >
              Visit the site
            </ExternalLink>
          </div>
        </article>
      </Reveal>
    </SectionShell>
  );
}
