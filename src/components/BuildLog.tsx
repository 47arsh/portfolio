"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { ExternalLink } from "./ExternalLink";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const LATEST_COUNT = 5;

export function BuildLog() {
  const [expanded, setExpanded] = useState(false);

  if (site.log.length === 0) return null;

  const entries = expanded ? site.log : site.log.slice(0, LATEST_COUNT);
  const hasMore = site.log.length > LATEST_COUNT;

  return (
    <section id="log" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="05 / Log"
            title="Build log"
            intro="What I shipped, learned or fixed."
          />

          <ol className="mt-10 border-t border-line">
            {entries.map((entry, index) => (
              <li
                key={`${entry.date}-${index}`}
                className="border-b border-line py-5 md:grid md:grid-cols-[140px_1fr] md:gap-8"
              >
                <p className="eyebrow">
                  <Placeholder value={entry.date} />
                </p>
                <div className="mt-1 md:mt-0">
                  <p className="text-sm leading-relaxed text-ink/90 md:text-base">
                    <Placeholder value={entry.text} />
                  </p>
                  {entry.url ? (
                    <ExternalLink
                      href={entry.url}
                      className="mt-2 inline-flex items-center font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
                      showArrow
                    >
                      Link
                    </ExternalLink>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          {hasMore ? (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="mt-6 inline-flex items-center rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:border-gold"
            >
              {expanded
                ? "Show latest only"
                : `View all ${site.log.length} entries`}
            </button>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
