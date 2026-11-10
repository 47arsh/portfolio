import { Fragment } from "react";
import { site } from "@/content/site";
import type { ShippedProject } from "@/content/types";
import { isPlaceholderUrl } from "@/lib/placeholders";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function StackLine({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <p className="font-mono text-[11px] text-muted">
      {items.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          {index > 0 ? <span aria-hidden="true"> · </span> : null}
          <Placeholder value={item} />
        </Fragment>
      ))}
    </p>
  );
}

function ShippedRow({ item }: { item: ShippedProject }) {
  const linked = !isPlaceholderUrl(item.url);

  const body = (
    <>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium text-ink md:text-lg">
            <Placeholder value={item.title} />
          </h3>
          {linked ? (
            <ArrowUpRight className="size-3.5 shrink-0 -translate-x-1 text-gold opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
          ) : null}
        </div>
        <p className="mt-1 max-w-xl text-sm text-muted">
          <Placeholder value={item.description} />
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 md:justify-end">
        <StackLine items={item.stack} />
        <p className="eyebrow">
          <Placeholder value={item.date} />
        </p>
      </div>
    </>
  );

  return (
    <li className="border-b border-line">
      {linked ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid gap-3 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8"
        >
          {body}
        </a>
      ) : (
        <div className="grid gap-3 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8">
          {body}
        </div>
      )}
    </li>
  );
}

export function ShippedList() {
  if (site.shipped.length === 0) return null;

  return (
    <section id="shipped" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="02 / Shipped"
            title="Shipped"
            intro="Small tools, built and released."
          />
          <ul className="mt-10 border-t border-line">
            {site.shipped.map((item, index) => (
              <ShippedRow key={`${item.title}-${index}`} item={item} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
