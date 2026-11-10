import type { Track } from "@/content/types";
import { stripPlaceholder } from "@/lib/placeholders";
import { ExternalLink } from "./ExternalLink";
import { Placeholder } from "./Placeholder";
import { YouTubeFacade } from "./YouTubeFacade";

type TrackCardProps = {
  track: Track;
};

export function TrackCard({ track }: TrackCardProps) {
  return (
    <article className="group/card">
      <YouTubeFacade
        videoUrl={track.youtubeUrl}
        title={stripPlaceholder(track.title)}
      />

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl leading-snug text-ink">
            <Placeholder value={track.title} />
          </h3>
          <p className="mt-1 text-sm text-muted">
            <Placeholder value={track.note} />
          </p>
        </div>

        <ExternalLink
          href={track.youtubeUrl}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
          showArrow
        >
          YouTube
        </ExternalLink>
      </div>
    </article>
  );
}
