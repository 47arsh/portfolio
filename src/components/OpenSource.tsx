import { site } from "@/content/site";
import type { OpenSourceContribution } from "@/content/types";
import { stripPlaceholder } from "@/lib/placeholders";
import { EmptyState } from "./EmptyState";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

function prLabel(item: OpenSourceContribution): string {
  return typeof item.number === "number" ? `#${item.number}` : "PR";
}

function FeaturedContribution({ item }: { item: OpenSourceContribution }) {
  return (
    <article className="group border-t border-line py-10 md:grid md:grid-cols-[84px_minmax(0,1fr)] md:gap-8">
      <div>
        <p className="font-mono text-lg tracking-[-0.02em] text-gold">
          {prLabel(item)}
        </p>
        <p className="eyebrow mt-2">Featured</p>
      </div>

      <div className="mt-4 min-w-0 md:mt-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="display text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none">
            <ExternalLink
              href={item.projectUrl}
              className="transition-colors hover:text-gold-soft"
            >
              <Placeholder value={item.project} />
            </ExternalLink>
          </h3>
          <p className="eyebrow">
            <Placeholder value={item.mergedAt} />
          </p>
        </div>

        <p className="prose-quiet mt-4 max-w-[68ch] text-[15px] md:text-base">
          <Placeholder value={item.description} />
        </p>

        {item.learned ? (
          <p className="mt-5 max-w-[62ch] border-l border-gold/40 pl-4 text-sm italic leading-relaxed text-muted">
            What I learned: <Placeholder value={item.learned} />
          </p>
        ) : null}

        <ExternalLink
          href={item.prUrl}
          className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-gold-soft hover:decoration-gold"
          ariaLabel={`View ${stripPlaceholder(item.project)} pull request ${prLabel(item)}`}
        >
          View pull request
          <ArrowUpRight className="size-3.5 text-gold transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </ExternalLink>
      </div>
    </article>
  );
}

function ContributionRow({ item }: { item: OpenSourceContribution }) {
  const projectName = stripPlaceholder(item.project);

  return (
    <article className="group grid grid-cols-[58px_minmax(0,1fr)] gap-x-5 border-t border-line py-6 md:grid-cols-[84px_minmax(0,1fr)_auto] md:gap-x-8">
      <p className="pt-1 font-mono text-xs tracking-[-0.01em] text-muted transition-colors group-hover:text-gold">
        {prLabel(item)}
      </p>

      <div className="min-w-0">
        <h3 className="font-serif text-2xl leading-tight text-ink">
          <ExternalLink
            href={item.projectUrl}
            className="transition-colors hover:text-gold-soft"
          >
            <Placeholder value={item.project} />
          </ExternalLink>
        </h3>
        <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-muted transition-colors group-hover:text-ink/75">
          <Placeholder value={item.description} />
        </p>

        <div className="mt-3 flex items-center gap-5 md:hidden">
          <span className="eyebrow">
            <Placeholder value={item.mergedAt} />
          </span>
          <ExternalLink
            href={item.prUrl}
            className="eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-ink"
            ariaLabel={`View ${projectName} pull request ${prLabel(item)}`}
          >
            View
            <ArrowUpRight className="size-3 text-gold" />
          </ExternalLink>
        </div>
      </div>

      <div className="hidden items-center gap-6 md:flex">
        <span className="eyebrow">
          <Placeholder value={item.mergedAt} />
        </span>
        <ExternalLink
          href={item.prUrl}
          className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-gold/50 group-hover:text-ink"
          ariaLabel={`View ${projectName} pull request ${prLabel(item)}`}
        >
          <ArrowUpRight className="size-3.5 text-gold transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </ExternalLink>
      </div>
    </article>
  );
}

export function OpenSource() {
  const contributions = site.openSource;
  const total = contributions.length;
  const projects = new Set(
    contributions.map((item) => item.project.trim().toLowerCase()),
  ).size;

  return (
    <SectionShell
      id="open-source"
      index="02"
      label="Open source"
      title="Open source"
      intro="Pull requests I've sent to other people's projects."
    >
      <Reveal>
        {total > 0 ? (
          <>
            <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-4">
              <p className="eyebrow">
                {total} pull {total === 1 ? "request" : "requests"}
              </p>
              <p className="eyebrow">
                {projects} {projects === 1 ? "project" : "projects"}
              </p>
            </div>

            <div className="border-b border-line">
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
          </>
        ) : (
          <EmptyState
            className="mt-10"
            label="Ledger"
            note="Pull requests to other projects will be listed here."
          />
        )}
      </Reveal>
    </SectionShell>
  );
}
