import Image from "next/image";
import { site } from "@/content/site";
import { isPlaceholderUrl, stripPlaceholder } from "@/lib/placeholders";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

const isDev = process.env.NODE_ENV !== "production";

export function About() {
  const { profile, stats } = site;
  const photoMissing = isPlaceholderUrl(profile.photo);
  const [statement = "", ...rest] = profile.bio;

  return (
    <SectionShell id="about" index="07" label="About" title="About">
      <Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_180px] md:gap-16">
          <div className="min-w-0">
            <p className="display max-w-[30ch] text-[clamp(1.65rem,3.2vw,2.4rem)] leading-[1.18]">
              <Placeholder value={statement} />
            </p>

            <div className="prose-quiet mt-8 max-w-[58ch] space-y-4 text-[15px] md:text-base">
              {rest.map((line, index) => (
                <p key={index}>
                  <Placeholder value={line} />
                </p>
              ))}
            </div>

            <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Based in</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/90">
                  <Placeholder value={profile.location} />
                </p>
              </div>

              {stats.achievements && stats.achievements.length > 0 ? (
                <div>
                  <p className="eyebrow">Achievement</p>
                  <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted">
                    {stats.achievements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>

          {!photoMissing ? (
            <div className="relative aspect-[4/5] w-full max-w-[180px] overflow-hidden rounded-[4px] border border-line grayscale">
              <Image
                src={profile.photo}
                alt={`Portrait of ${stripPlaceholder(profile.name)}`}
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          ) : isDev ? (
            <div
              aria-hidden="true"
              data-placeholder=""
              className="flex aspect-[4/5] w-full max-w-[180px] items-end border border-dashed border-gold/30 p-3"
            >
              <span className="eyebrow">Portrait</span>
            </div>
          ) : null}
        </div>
      </Reveal>
    </SectionShell>
  );
}
