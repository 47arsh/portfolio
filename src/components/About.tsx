import Image from "next/image";
import { site } from "@/content/site";
import { isPlaceholderUrl, stripPlaceholder } from "@/lib/placeholders";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const isDev = process.env.NODE_ENV !== "production";

export function About() {
  const { profile } = site;
  const photoMissing = isPlaceholderUrl(profile.photo);

  return (
    <section id="about" className="section">
      <div className="shell">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:gap-16">
            <div>
              <SectionHeading label="07 / About" title="About" />

              <div className="prose-quiet mt-6 max-w-2xl space-y-3">
                {profile.bio.map((line, index) => (
                  <p key={index}>
                    <Placeholder value={line} />
                  </p>
                ))}
              </div>

              <p className="eyebrow mt-6 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 shrink-0 rounded-full bg-gold"
                />
                <Placeholder value={profile.location} />
              </p>
            </div>

            {!photoMissing ? (
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border border-line grayscale md:h-48 md:w-48">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${stripPlaceholder(profile.name)}`}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            ) : isDev ? (
              <div
                aria-hidden="true"
                className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border border-dashed border-gold/35 md:h-48 md:w-48"
                data-placeholder=""
              >
                <span className="eyebrow">Photo</span>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
