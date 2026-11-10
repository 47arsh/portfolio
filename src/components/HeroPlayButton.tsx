"use client";

import { useRef, useState } from "react";
import type { HeroTrack } from "@/content/types";
import { Pause, Play } from "./icons";

/**
 * Opt-in audio only. Nothing preloads and nothing plays until the visitor
 * presses the button; the audio element has no autoplay attribute.
 */
export function HeroPlayButton({ track }: { track: HeroTrack }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
        aria-pressed={playing}
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold text-gold transition-colors duration-150 hover:bg-gold-dim"
      >
        {playing ? (
          <Pause className="size-4" />
        ) : (
          <Play className="ml-0.5 size-4" />
        )}
      </button>

      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        {playing ? "Pause" : "Play"}
        <span className="text-ink"> — {track.title}</span>
      </span>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
