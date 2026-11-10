import { site } from "@/content/site";
import { EmptyState } from "./EmptyState";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

export function Earlier() {
  return (
    <SectionShell
      id="earlier"
      index="06"
      label="Earlier"
      title="Earlier work"
      intro="College projects worth keeping."
    >
      <Reveal>
        {site.earlier.length > 0 ? (
          <ol className="mt-10 border-b border-line">
            {site.earlier.map((item, index) => (
              <li key={`${item.title}-${index}`} className="group border-t border-line">
                <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-x-4 gap-y-3 py-7 md:grid-cols-[44px_minmax(0,1fr)_auto] md:gap-x-8">
                  <span className="pt-1.5 font-mono text-[11px] tracking-[0.12em] text-muted transition-colors group-hover:text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-ink">
                      <Placeholder value={item.title} />
                    </h3>
                    <p className="mt-2 max-w-[66ch] text-sm leading-relaxed text-muted">
                      <Placeholder value={item.description} />
                    </p>
                  </div>

                  {item.url ? (
                    <ExternalLink
                      href={item.url}
                      className="eyebrow inline-flex items-center gap-1.5 self-start pt-1.5 transition-colors hover:text-ink"
                      ariaLabel={`Open ${item.title} repository`}
                    >
                      Repository
                      <ArrowUpRight className="size-3 text-gold transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </ExternalLink>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState
            className="mt-10"
            label="Archive"
            note="Earlier projects will be listed here."
          />
        )}
      </Reveal>
    </SectionShell>
  );
}
