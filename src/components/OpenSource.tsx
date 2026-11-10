import { site } from "@/content/site";
import type { OpenSourceContribution } from "@/content/types";
import {
  stripPlaceholder,
} from "@/lib/placeholders";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function FeaturedContribution({
  item,
}: {
  item: OpenSourceContribution;
}) {
  return (
    <article className="border-t border-line py-8 md:grid md:grid-cols-[220px_1fr] md:gap-10">
      <div>
        <h3 className="display text-2xl">
          <ExternalLink
            href={item.projectUrl}
            className="transition-colors hover:text-gold-soft"
          >
            <Placeholder value={item.project} />
          </ExternalLink>
        </h3>
        <p className="eyebrow mt-2">
          <Placeholder value={item.mergedAt} />
        </p>
      </div>

      <div>
        <p className="prose-quiet max-w-2xl">
          <Placeholder value={item.description} />
        </p>

        {item.learned ? (
          <p className="mt-4 max-w-2xl border-l border-gold/40 pl-4 text-sm italic text-muted">
            What I learned: <Placeholder value={item.learned} />
          </p>
        ) : null}

        <ExternalLink
          href={item.prUrl}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink underline decoration-line underline-offset-4 transition-colors hover:text-gold-soft hover:decoration-gold"
        >
          View PR
          <ArrowUpRight className="size-3.5 text-gold" />
        </ExternalLink>
      </div>
    </article>
  );
}

function ContributionRow({ item }: { item: OpenSourceContribution }) {
  return (
    <article className="border-t border-line py-5 md:grid md:grid-cols-[220px_1fr_auto] md:items-baseline md:gap-10">
      <h3 className="text-sm font-medium text-ink">
        <ExternalLink
          href={item.projectUrl}
          className="transition-colors hover:text-gold-soft"
        >
          <Placeholder value={item.project} />
        </ExternalLink>
      </h3>

      <p className="mt-1 max-w-2xl text-sm text-muted md:mt-0">
        <Placeholder value={item.description} />
      </p>

      <div className="mt-2 flex items-center gap-4 md:mt-0">
        <span className="eyebrow">
          <Placeholder value={item.mergedAt} />
        </span>
        <ExternalLink
          href={item.prUrl}
          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
          ariaLabel={`View pull request for ${stripPlaceholder(item.project)}`}
        >
          PR
          <ArrowUpRight className="size-3.5 text-gold" />
        </ExternalLink>
      </div>
    </article>
  );
}

export function OpenSource() {
  const contributions = site.openSource;
  if (contributions.length === 0) return null;

  const total = contributions.length;
  const projects = new Set(
    contributions.map((item) => item.project.trim().toLowerCase()),
  ).size;

  return (
    <section id="open-source" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="03 / Open source"
            title="Open source"
            intro="Pull requests I've sent to other people's projects."
          />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            {total} pull {total === 1 ? "request" : "requests"} across {projects}{" "}
            {projects === 1 ? "project" : "projects"}
          </p>

          <div className="mt-10 border-b border-line">
            {contributions.map((item, index) =>
              item.featured ? (
                <FeaturedContribution
                  key={`${item.project}-${index}`}
                  item={item}
                />
              ) : (
                <ContributionRow
                  key={`${item.project}-${index}`}
                  item={item}
                />
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
