"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholders";
import { EmptyState } from "./EmptyState";
import { ExternalLink } from "./ExternalLink";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

const LATEST_COUNT = 5;

export function BuildLog() {
  const [expanded, setExpanded] = useState(false);
  const real = site.log.filter(
    (entry) => !isPlaceholder(entry.date) && !isPlaceholder(entry.text),
  );
  const entries = expanded ? real : real.slice(0, LATEST_COUNT);
  const hasMore = real.length > LATEST_COUNT;

  return (
    <SectionShell
      id="log"
      index="05"
      label="Log"
      title="Build log"
      intro="What I shipped, learned or fixed."
      dense={real.length === 0}
    >
      <Reveal>
        {real.length > 0 ? (
          <>
            <ol className="mt-10">
              {entries.map((entry, index) => (
                <li
                  key={`${entry.date}-${index}`}
                  className="grid grid-cols-[68px_minmax(0,1fr)] gap-x-5 md:grid-cols-[120px_minmax(0,1fr)] md:gap-x-10"
                >
                  <p className="eyebrow pt-1 leading-snug">
                    <Placeholder value={entry.date} />
                  </p>

                  <div className="relative border-l border-gold/20 pb-9 pl-5 md:pl-7">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[3px] top-1.5 size-[5px] rounded-full bg-gold"
                    />
                    <p className="text-[15px] leading-relaxed text-ink/85 md:text-base">
                      <Placeholder value={entry.text} />
                    </p>
                    {entry.url ? (
                      <ExternalLink
                        href={entry.url}
                        className="eyebrow mt-2 inline-flex items-center gap-1.5 transition-colors hover:text-ink"
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
                className="mt-2 inline-flex items-center border-b border-line pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-gold"
              >
                {expanded
                  ? "Show latest only"
                  : `View all ${real.length} entries`}
              </button>
            ) : null}
          </>
        ) : (
          <EmptyState
            className="mt-10"
            label="Timeline"
            note="Dated notes will appear here as I ship, learn or fix something."
          />
        )}
      </Reveal>
    </SectionShell>
  );
}
