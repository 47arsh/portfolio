import { site } from "@/content/site";
import { youtubeId } from "@/lib/youtube";
import { socialUrls } from "@/lib/site-links";
import { EmptyState } from "./EmptyState";
import { ExternalLink } from "./ExternalLink";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";
import { SoundTrackRow } from "./SoundTrackRow";

export function Sound() {
  const tracks = site.tracks.filter((track) => youtubeId(track.youtubeUrl));
  const urls = socialUrls(site.profile.socials);

  return (
    <SectionShell
      id="sound"
      index="04"
      label="Sound"
      title="Sound"
      intro="Remixes, edits and experiments."
      dense={tracks.length === 0}
    >
      <Reveal>
        {tracks.length > 0 ? (
          <ol className="mt-10 border-b border-line">
            {tracks.map((track, index) => (
              <SoundTrackRow
                key={`${track.title}-${index}`}
                track={track}
                index={index}
              />
            ))}
          </ol>
        ) : (
          <EmptyState
            className="mt-10"
            label="Playlist"
            note="Remixes will be listed here. Each video loads inline only when you press play."
          />
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p className="eyebrow">No autoplay · video loads on click</p>
          <ExternalLink
            href={urls.youtube}
            className="eyebrow inline-flex items-center gap-1.5 text-ink transition-colors hover:text-gold-soft"
            showArrow
          >
            Full channel
          </ExternalLink>
        </div>
      </Reveal>
    </SectionShell>
  );
}
