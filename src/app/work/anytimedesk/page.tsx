import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { LoomFacade } from "@/components/LoomFacade";
import { Metrics } from "@/components/Metrics";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { Screenshot } from "@/components/Screenshot";
import { TagList } from "@/components/TagList";
import { site } from "@/content/site";
import { displayHost } from "@/lib/format";
import { isPlaceholder, stripPlaceholder } from "@/lib/placeholders";

const { featured } = site;
const projectName = stripPlaceholder(featured.name);

export const metadata: Metadata = {
  title: `${projectName} — case study`,
  description: isPlaceholder(featured.oneLiner)
    ? `A case study of ${projectName}.`
    : stripPlaceholder(featured.oneLiner),
};

export default function AnytimeDeskCaseStudyPage() {
  return (
    <article className="pb-24">
      <div className="shell pt-14 md:pt-20">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5 text-gold transition-transform duration-150 group-hover:-translate-x-0.5" />
          Back to work
        </Link>

        <header className="mt-10">
          <p className="eyebrow">Case study</p>
          <h1 className="display mt-4 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] text-balance">
            <Placeholder value={featured.name} />
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink/90 md:text-xl">
            <Placeholder value={featured.oneLiner} />
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <ExternalLink
              href={featured.url}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-gold"
            >
              {displayHost(featured.url)}
              <ArrowUpRight className="size-3.5 text-gold" />
            </ExternalLink>
            <TagList items={featured.stack} />
          </div>
        </header>

        <Reveal>
          <div className="mt-12">
            <LoomFacade
              videoUrl={featured.demoVideoUrl}
              title={`${projectName} demo`}
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
            <section aria-labelledby="problem">
              <h2 id="problem" className="eyebrow">
                The problem
              </h2>
              <p className="prose-quiet mt-3 max-w-prose">
                <Placeholder value={featured.problem} />
              </p>
            </section>
            <section aria-labelledby="built">
              <h2 id="built" className="eyebrow">
                What I built
              </h2>
              <p className="prose-quiet mt-3 max-w-prose">
                <Placeholder value={featured.built} />
              </p>
            </section>
          </div>
        </Reveal>

        <Reveal>
          <Metrics items={featured.metrics} className="mt-12" />
        </Reveal>

        {featured.screenshots.length > 0 ? (
          <Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
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

        <Reveal>
          <section
            aria-labelledby="learned"
            className="mt-16 border-t border-line pt-10"
          >
            <h2 id="learned" className="eyebrow">
              What I&apos;d do differently
            </h2>
            <p className="display mt-4 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] leading-snug text-ink/90">
              <Placeholder value={featured.learned} />
            </p>
          </section>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Link
            href="/#work"
            className="link-quiet text-sm text-muted hover:text-ink"
          >
            Back to all work
          </Link>
          <ExternalLink
            href={featured.url}
            className="link-quiet text-sm text-muted hover:text-ink"
            showArrow
          >
            {displayHost(featured.url)}
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}
