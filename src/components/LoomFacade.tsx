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
 * cinematic surface, a traced play control and a label. Nothing loads until
 * clicked. A missing URL collapses into a compact coming-soon row instead of a
 * large empty frame.
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
        className="aspect-video w-full rounded-[6px] border border-line bg-bg"
      />
    );
  }

  if (missing) {
    return (
      <div
        data-placeholder=""
        className={cx(
          "flex items-center gap-4 rounded-[6px] border bg-surface px-5 py-4",
          isDev ? "border-dashed border-gold/30" : "border-line",
        )}
      >
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted"
        >
          <Play className="ml-0.5 size-3.5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-ink/90">Demo walkthrough</span>
          <span className="mt-0.5 block text-sm text-muted">
            Video coming soon
          </span>
        </span>
        <span className="eyebrow ml-auto hidden sm:block">Loom</span>
      </div>
    );
  }

  const inner = (
    <>
      <span className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="eyebrow">Loom</span>
        <span className="eyebrow">Demo</span>
      </span>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-14 items-center justify-center rounded-full border border-gold/70 text-gold transition-colors duration-200 group-hover:bg-gold-dim">
          <Play className="ml-0.5 size-5" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4">
        <span className="eyebrow text-ink/80">Watch the demo</span>
      </span>
    </>
  );

  const className =
    "group relative block aspect-video w-full overflow-hidden rounded-[6px] border border-line bg-[linear-gradient(160deg,var(--surface-raised),var(--bg))] transition-colors hover:border-line-strong";

  if (!embed) {
    return (
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
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
      className={className}
      aria-label="Play the Loom demo"
    >
      {inner}
    </button>
  );
}
