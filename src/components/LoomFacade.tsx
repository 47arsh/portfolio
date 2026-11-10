"use client";

import { useState } from "react";
import { cx } from "@/lib/format";
import { loomEmbedUrl } from "@/lib/loom";
import { isPlaceholder } from "@/lib/placeholders";
import { Play } from "./icons";

const isDev = process.env.NODE_ENV !== "production";

type LoomFacadeProps = {
  videoUrl: string;
  title?: string;
};

/**
 * Loom has no public thumbnail, so the facade stays deliberately quiet: a
 * surface, a traced play control and a label. Nothing loads until clicked.
 */
export function LoomFacade({
  videoUrl,
  title = "Loom demo",
}: LoomFacadeProps) {
  const [active, setActive] = useState(false);
  const embed = loomEmbedUrl(videoUrl);
  const missing = isPlaceholder(videoUrl);

  if (active && embed) {
    return (
      <iframe
        src={embed}
        title={title}
        allow="fullscreen; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full rounded-[10px] border border-line bg-bg"
      />
    );
  }

  const inner = (
    <>
      <span className="absolute left-4 top-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        Loom
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-11 items-center justify-center rounded-full border border-gold/70 text-gold transition-colors duration-150 group-hover:bg-gold-dim">
          <Play className="ml-0.5 size-4" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        {missing
          ? isDev
            ? "TODO: add Loom demo URL"
            : "Demo"
          : "Watch the demo"}
      </span>
    </>
  );

  if (!embed) {
    if (missing) {
      return (
        <div
          className={cx(
            "relative aspect-video w-full overflow-hidden rounded-[10px] border bg-surface",
            isDev ? "border-dashed border-gold/35" : "border-line",
          )}
          data-placeholder=""
        >
          {inner}
        </div>
      );
    }

    return (
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-video w-full overflow-hidden rounded-[10px] border border-line bg-surface transition-colors hover:border-gold"
        aria-label="Watch the demo on Loom"
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-[10px] border border-line bg-surface transition-colors hover:border-gold"
      aria-label="Play the Loom demo"
    >
      {inner}
    </button>
  );
}
