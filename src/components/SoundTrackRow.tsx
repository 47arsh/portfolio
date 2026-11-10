"use client";

import Image from "next/image";
import { useState } from "react";
import type { Track } from "@/content/types";
import { cx } from "@/lib/format";
import { stripPlaceholder } from "@/lib/placeholders";
import {
  youtubeEmbedUrl,
  youtubeId,
  youtubeThumbnail,
} from "@/lib/youtube";
import { Play } from "./icons";
import { Placeholder } from "./Placeholder";

const GLYPH = [6, 13, 9, 17, 7];

type SoundTrackRowProps = {
  track: Track;
  index: number;
};

export function SoundTrackRow({ track, index }: SoundTrackRowProps) {
  const [active, setActive] = useState(false);
  const id = youtubeId(track.youtubeUrl);
  const title = stripPlaceholder(track.title);
  const number = String(index + 1).padStart(2, "0");

  if (!id) {
    return (
      <li className="grid grid-cols-[32px_minmax(0,1fr)_auto] items-baseline gap-x-4 border-t border-line py-5 md:grid-cols-[44px_minmax(0,1fr)_150px] md:gap-x-6">
        <span className="font-mono text-xs text-muted">{number}</span>
        <div>
          <p className="font-serif text-xl text-muted">
            <Placeholder value={track.title} />
          </p>
          {track.note ? (
            <p className="mt-1 text-sm text-muted">
              <Placeholder value={track.note} />
            </p>
          ) : null}
        </div>
        <span className="eyebrow">Coming soon</span>
      </li>
    );
  }

  return (
    <li className="border-t border-line">
      <button
        type="button"
        onClick={() => setActive((value) => !value)}
        aria-expanded={active}
        aria-label={
          active ? `Hide the ${title} player` : `Load the ${title} player`
        }
        className="group grid w-full grid-cols-[32px_minmax(0,1fr)_72px] items-center gap-x-4 py-4 text-left md:grid-cols-[44px_minmax(0,1fr)_150px_120px] md:gap-x-6"
      >
        <span className="font-mono text-xs text-muted transition-colors group-hover:text-gold">
          {number}
        </span>

        <span className="min-w-0">
          <span className="block font-serif text-xl leading-snug text-ink md:text-2xl">
            <Placeholder value={track.title} />
          </span>
          {track.note ? (
            <span className="mt-1 block text-sm text-muted">
              <Placeholder value={track.note} />
            </span>
          ) : null}
        </span>

        <span
          aria-hidden="true"
          className="hidden h-6 items-center justify-end gap-[3px] md:flex"
        >
          {GLYPH.map((height, barIndex) => (
            <span
              key={barIndex}
              className={cx(
                "w-px rounded-full transition-colors",
                active ? "bg-gold" : "bg-line-strong group-hover:bg-gold/60",
              )}
              style={{ height }}
            />
          ))}
        </span>

        <span className="relative block aspect-video w-full overflow-hidden rounded-[3px] border border-line bg-surface md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          <Image
            src={youtubeThumbnail(id)}
            alt=""
            fill
            sizes="128px"
            className="object-cover opacity-75"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-black/25" />
          <span className="absolute inset-0 flex items-center justify-center rounded-full text-gold">
            <span className="flex size-7 items-center justify-center rounded-full border border-gold/70 bg-bg/40">
              <Play className="ml-0.5 size-3" />
            </span>
          </span>
        </span>
      </button>

      {active ? (
        <div className="pb-6 md:pl-[68px]">
          <iframe
            src={youtubeEmbedUrl(id)}
            title={`${title} on YouTube`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-video w-full max-w-2xl rounded-[4px] border border-line bg-bg"
          />
        </div>
      ) : null}
    </li>
  );
}
