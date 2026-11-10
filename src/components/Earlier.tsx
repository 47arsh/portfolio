import { site } from "@/content/site";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Earlier() {
  if (site.earlier.length === 0) return null;

  return (
    <section id="earlier" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="06 / Earlier"
            title="Earlier work"
            intro="College projects worth keeping."
          />

          <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {site.earlier.map((item, index) => (
              <li
                key={`${item.title}-${index}`}
                className="border-t border-line pt-4"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-medium text-ink">
                    <Placeholder value={item.title} />
                  </h3>
                  {item.url ? (
                    <ExternalLink
                      href={item.url}
                      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
                    >
                      Link
                      <ArrowUpRight className="size-3.5 text-gold" />
                    </ExternalLink>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-muted">
                  <Placeholder value={item.description} />
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
