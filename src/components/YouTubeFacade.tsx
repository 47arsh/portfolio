"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/format";
import { isPlaceholder } from "@/lib/placeholders";
import {
  youtubeEmbedUrl,
  youtubeId,
  youtubeThumbnail,
} from "@/lib/youtube";
import { Play } from "./icons";

const isDev = process.env.NODE_ENV !== "production";

type YouTubeFacadeProps = {
  videoUrl: string;
  title: string;
};

/**
 * Click-to-load YouTube facade: no iframe, cookies or autoplay until the
 * visitor explicitly presses play.
 */
export function YouTubeFacade({ videoUrl, title }: YouTubeFacadeProps) {
  const [active, setActive] = useState(false);
  const id = youtubeId(videoUrl);
  const missing = isPlaceholder(videoUrl);

  if (active && id) {
    return (
      <iframe
        src={youtubeEmbedUrl(id)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full rounded-[10px] border border-line bg-bg"
      />
    );
  }

  if (!id) {
    const inner = (
      <>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-11 items-center justify-center rounded-full border border-gold/50 text-gold/60">
            <Play className="ml-0.5 size-4" />
          </span>
        </span>
        <span className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          {missing
            ? isDev
              ? "TODO: add YouTube URL"
              : "Video"
            : "Watch on YouTube"}
        </span>
      </>
    );

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
        aria-label={`Watch ${title} on YouTube`}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-[10px] border border-line bg-surface"
      aria-label={`Play ${title}`}
    >
      <Image
        src={youtubeThumbnail(id)}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-80 transition-opacity duration-200 group-hover:opacity-90"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-black/30" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-11 items-center justify-center rounded-full border border-gold text-gold transition-colors duration-150 group-hover:bg-gold-dim">
          <Play className="ml-0.5 size-4" />
        </span>
      </span>
    </button>
  );
}
