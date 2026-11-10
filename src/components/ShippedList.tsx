import { Fragment } from "react";
import { site } from "@/content/site";
import type { ShippedProject } from "@/content/types";
import { isPlaceholder } from "@/lib/placeholders";
import { EmptyState } from "./EmptyState";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

function StackLine({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
      {items.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          {index > 0 ? <span aria-hidden="true"> / </span> : null}
          <Placeholder value={item} />
        </Fragment>
      ))}
    </p>
  );
}

function ShippedRow({ item, index }: { item: ShippedProject; index: number }) {
  const linked = !isPlaceholder(item.url);

  const body = (
    <>
      <span className="pt-1.5 font-mono text-[11px] tracking-[0.12em] text-muted transition-colors group-hover:text-gold">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h3 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-ink">
          <Placeholder value={item.title} />
        </h3>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted">
          <Placeholder value={item.description} />
        </p>
        <StackLine items={item.stack} />
      </div>

      <div className="mt-1 flex items-center justify-between gap-4 md:flex-col md:items-end md:gap-4">
        <span className="eyebrow">
          <Placeholder value={item.date} />
        </span>
        {linked ? (
          <ArrowUpRight className="size-4 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
        ) : null}
      </div>
    </>
  );

  const className =
    "group grid grid-cols-[34px_minmax(0,1fr)] gap-x-4 gap-y-3 py-7 md:grid-cols-[44px_minmax(0,1fr)_auto] md:gap-x-8";

  return (
    <li className="border-t border-line">
      {linked ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {body}
        </a>
      ) : (
        <div className={className}>{body}</div>
      )}
    </li>
  );
}

export function ShippedList() {
  const real = site.shipped.filter((item) => !isPlaceholder(item.title));

  return (
    <SectionShell
      id="shipped"
      index="03"
      label="Shipped"
      title="Shipped"
      intro="Small tools, built and released."
      dense={real.length === 0}
    >
      <Reveal>
        {real.length > 0 ? (
          <ul className="mt-10 border-b border-line">
            {real.map((item, index) => (
              <ShippedRow key={`${item.title}-${index}`} item={item} index={index} />
            ))}
          </ul>
        ) : (
          <EmptyState
            className="mt-10"
            label="Index"
            note="Shipped tools will be listed here as they go live."
          />
        )}
      </Reveal>
    </SectionShell>
  );
}
