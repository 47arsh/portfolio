import type { Metadata } from "next";
import Link from "next/link";
import { BrowserFrame } from "@/components/BrowserFrame";
import { EmptyState } from "@/components/EmptyState";
import { ExternalLink } from "@/components/ExternalLink";
import { ArrowLeft } from "@/components/icons";
import { LoomFacade } from "@/components/LoomFacade";
import { Metrics } from "@/components/Metrics";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Screenshot } from "@/components/Screenshot";
import { site } from "@/content/site";
import { cx, displayHost } from "@/lib/format";
import { isPlaceholder, stripPlaceholder } from "@/lib/placeholders";

const isDev = process.env.NODE_ENV !== "production";

const { featured } = site;
const projectName = stripPlaceholder(featured.name);
const siteLabel = displayHost(featured.url);
const caseStudyTitle = `${projectName} — case study`;
const caseStudyDescription = isPlaceholder(featured.oneLiner)
  ? `A case study of ${projectName}.`
  : stripPlaceholder(featured.oneLiner);
const writeUpMissing =
  isPlaceholder(featured.problem) && isPlaceholder(featured.built);
const firstScreenshot = featured.screenshots[0];
const hasScreenshot = firstScreenshot && !isPlaceholder(firstScreenshot);

const caseStudyImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Portfolio",
};

export const metadata: Metadata = {
  title: { absolute: caseStudyTitle },
  description: caseStudyDescription,
  alternates: { canonical: `/work/${featured.slug}` },
  openGraph: {
    type: "article",
    url: `/work/${featured.slug}`,
    title: caseStudyTitle,
    description: caseStudyDescription,
    images: [caseStudyImage],
  },
  twitter: {
    card: "summary_large_image",
    title: caseStudyTitle,
    description: caseStudyDescription,
    images: [caseStudyImage],
  },
};

export default function AnytimeDeskCaseStudyPage() {
  return (
    <article className="pb-24">
      <div className="shell pt-10 md:pt-14">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5 text-gold transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to work
        </Link>

        <header className="mt-12 md:mt-16">
          <div className="grid gap-10 md:grid-cols-[148px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-16">
            <p className="eyebrow flex items-start gap-3 pt-2">
              <span aria-hidden="true" className="hairline-gold mt-2" />
              Case study
            </p>

            <div>
              <h1 className="display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-balance">
                <Placeholder value={featured.name} />
              </h1>
              <p className="lead mt-6 max-w-[54ch]">
                <Placeholder value={featured.oneLiner} />
              </p>

              <dl className="mt-10 grid gap-x-10 gap-y-0 border-b border-line sm:grid-cols-3">
                {featured.role && !isPlaceholder(featured.role) ? (
                  <div className="spec-row sm:block sm:border-t sm:py-4">
                    <dt className="eyebrow">Role</dt>
                    <dd className="text-sm text-ink/90 sm:mt-2">
                      {featured.role}
                    </dd>
                  </div>
                ) : null}
                <div className="spec-row sm:block sm:border-t sm:py-4">
                  <dt className="eyebrow">Built with</dt>
                  <dd className="text-right text-sm leading-relaxed text-muted sm:mt-2 sm:text-left">
                    {featured.stack.join(", ")}
                  </dd>
                </div>
                <div className="spec-row sm:block sm:border-t sm:py-4">
                  <dt className="eyebrow">Site</dt>
                  <dd className="sm:mt-2">
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
          </div>
        </header>

        <Reveal>
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
                    "relative flex min-h-[240px] flex-col items-center justify-center bg-[radial-gradient(circle,rgba(237,235,230,0.07)_1px,transparent_1px)] [background-size:22px_22px] md:min-h-[320px]",
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

            <LoomFacade
              videoUrl={featured.demoVideoUrl}
              title={`${projectName} demo`}
            />
          </div>
        </Reveal>

        <div className="mt-16 border-t border-line pt-10">
          {writeUpMissing ? (
            <div className="grid gap-6">
              <EmptyState
                label="The problem"
                note="A short note on what this project solves is being written."
              />
              <EmptyState
                label="What I built"
                note="The build notes and architecture will be documented here."
              />
            </div>
          ) : (
            <div className="space-y-14">
              <div className="grid gap-5 md:grid-cols-[148px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-16">
                <h2 className="eyebrow flex items-start gap-3 pt-2">
                  <span aria-hidden="true" className="hairline-gold mt-2" />
                  The problem
                </h2>
                <p className="prose-quiet max-w-[68ch] text-base md:text-lg">
                  <Placeholder value={featured.problem} />
                </p>
              </div>

              <div className="grid gap-5 border-t border-line pt-10 md:grid-cols-[148px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-16">
                <h2 className="eyebrow flex items-start gap-3 pt-2">
                  <span aria-hidden="true" className="hairline-gold mt-2" />
                  What I built
                </h2>
                <p className="prose-quiet max-w-[68ch] text-base md:text-lg">
                  <Placeholder value={featured.built} />
                </p>
              </div>
            </div>
          )}
        </div>

        <Reveal>
          <Metrics items={featured.metrics} className="mt-14" />
        </Reveal>

        {featured.screenshots.length > 0 ? (
          <Reveal>
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {featured.screenshots.map((src, index) => (
                <Screenshot
                  key={`${src}-${index}`}
                  src={src}
                  alt={`${projectName} screenshot ${index + 1}`}
                  label={`Screenshot ${index + 1}`}
                />
              ))}
            </div>
          </Reveal>
        ) : null}

        {!isPlaceholder(featured.learned) ? (
          <Reveal>
            <section
              aria-labelledby="learned"
              className="mt-16 grid gap-5 border-t border-line pt-10 md:grid-cols-[148px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-16"
            >
              <h2 id="learned" className="eyebrow flex items-start gap-3 pt-2">
                <span aria-hidden="true" className="hairline-gold mt-2" />
                What I&apos;d do differently
              </h2>
              <p className="display max-w-[34ch] text-[clamp(1.5rem,3vw,2.15rem)] leading-[1.25] text-ink/90">
                <Placeholder value={featured.learned} />
              </p>
            </section>
          </Reveal>
        ) : null}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Link
            href="/#work"
            className="eyebrow inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5 text-gold" />
            Back to all work
          </Link>
          <ExternalLink
            href={featured.url}
            className="eyebrow inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
            showArrow
          >
            {siteLabel}
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}
