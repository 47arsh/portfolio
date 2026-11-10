import { site } from "@/content/site";
import { socialUrls } from "@/lib/site-links";
import { ExternalLink } from "./ExternalLink";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TrackCard } from "./TrackCard";

export function Sound() {
  if (site.tracks.length === 0) return null;

  const urls = socialUrls(site.profile.socials);

  return (
    <section id="sound" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="04 / Sound"
            title="Sound"
            intro="Remixes, edits and experiments."
          />

          <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2">
            {site.tracks.map((track, index) => (
              <TrackCard key={`${track.title}-${index}`} track={track} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="eyebrow">
              No autoplay — each video loads on click
            </p>
            <ExternalLink
              href={urls.youtube}
              className="link-quiet text-sm text-muted transition-colors hover:text-ink"
              showArrow
            >
              Full channel
            </ExternalLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
