import Link from "next/link";
import { site } from "@/content/site";
import { displayHost } from "@/lib/format";
import { stripPlaceholder } from "@/lib/placeholders";
import { ExternalLink } from "./ExternalLink";
import { ArrowRight, ArrowUpRight } from "./icons";
import { LoomFacade } from "./LoomFacade";
import { Metrics } from "./Metrics";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { Screenshot } from "./Screenshot";
import { SectionHeading } from "./SectionHeading";
import { TagList } from "./TagList";

export function FeaturedProject() {
  const { featured } = site;
  const projectName = stripPlaceholder(featured.name);
  const siteLabel = displayHost(featured.url);

  return (
    <section id="work" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="01 / Work"
            title="Featured work"
            intro="The featured build, in more detail."
          />

          <article className="mt-10 rounded-[10px] border border-line bg-surface p-6 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Featured project</p>
                <h3 className="display mt-3 text-[clamp(2rem,5vw,3.25rem)]">
                  <Placeholder value={featured.name} />
                </h3>
              </div>

              <ExternalLink
                href={featured.url}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
                ariaLabel={`Visit ${siteLabel}`}
              >
                {siteLabel}
                <ArrowUpRight className="size-3.5 text-gold" />
              </ExternalLink>
            </div>

            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-ink/90">
              <Placeholder value={featured.oneLiner} />
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
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

            <TagList items={featured.stack} className="mt-8" />

            <Metrics items={featured.metrics} className="mt-8" />

            <div className="mt-8">
              <LoomFacade
                videoUrl={featured.demoVideoUrl}
                title={`${projectName} demo`}
              />
            </div>

            {featured.screenshots.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {featured.screenshots.map((src, index) => (
                  <Screenshot
                    key={`${src}-${index}`}
                    src={src}
                    alt={`${projectName} screenshot ${index + 1}`}
                    label={`Screenshot ${index + 1}`}
                  />
                ))}
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <Link
                href={`/work/${featured.slug}`}
                className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-gold-soft"
              >
                Read the case study
                <ArrowRight className="size-4 text-gold transition-transform duration-150 group-hover:translate-x-1" />
              </Link>

              <ExternalLink
                href={featured.url}
                className="link-quiet text-sm text-muted hover:text-ink"
                showArrow
              >
                Visit the site
              </ExternalLink>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
