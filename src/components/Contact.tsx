import { site } from "@/content/site";
import { cx } from "@/lib/format";
import { isPlaceholderUrl } from "@/lib/placeholders";
import { emailHref, socialUrls } from "@/lib/site-links";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const isDev = process.env.NODE_ENV !== "production";

const PILL =
  "inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors duration-150 hover:border-gold";

export function Contact() {
  const { profile } = site;
  const urls = socialUrls(profile.socials);
  const mail = emailHref(profile.email);
  const mailMissing = isPlaceholderUrl(mail);
  const resumeReady = !isPlaceholderUrl(profile.resumeUrl);

  const socials = [
    { label: "GitHub", href: urls.github, kind: "external" as const },
    { label: "X", href: urls.x, kind: "external" as const },
    { label: "LinkedIn", href: urls.linkedin, kind: "external" as const },
    { label: "LeetCode", href: urls.leetcode, kind: "external" as const },
    { label: "YouTube", href: urls.youtube, kind: "external" as const },
  ];

  return (
    <section id="contact" className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="08 / Contact"
            title="Get in touch"
            intro="The fastest way to reach me."
          />

          {mailMissing ? (
            <p
              className={cx(
                "display mt-8 break-words text-[clamp(1.6rem,5vw,3rem)] text-muted",
                isDev && "placeholder-todo",
              )}
              data-placeholder=""
            >
              <Placeholder value={profile.email} />
            </p>
          ) : (
            <a
              href={mail}
              className="display mt-8 inline-block break-all text-[clamp(1.6rem,5vw,3rem)] underline decoration-line decoration-1 underline-offset-[8px] transition-colors hover:text-gold-soft hover:decoration-gold"
            >
              {profile.email}
            </a>
          )}

          <ul className="mt-10 flex flex-wrap gap-2">
            {mailMissing ? (
              <li>
                <span
                  className={cx(PILL, "text-muted", isDev && "placeholder-todo")}
                  data-placeholder=""
                >
                  Email
                </span>
              </li>
            ) : (
              <li>
                <a href={mail} className={PILL}>
                  Email
                  <ArrowUpRight className="size-3.5 text-gold" />
                </a>
              </li>
            )}

            {socials.map((social) => (
              <li key={social.label}>
                <ExternalLink href={social.href} className={PILL}>
                  {social.label}
                  {isPlaceholderUrl(social.href) ? null : (
                    <ArrowUpRight className="size-3.5 text-gold" />
                  )}
                </ExternalLink>
              </li>
            ))}

            {resumeReady ? (
              <li>
                <ExternalLink
                  href={profile.resumeUrl}
                  className={PILL}
                  ariaLabel="Download resume as PDF"
                >
                  Resume
                  <ArrowUpRight className="size-3.5 text-gold" />
                </ExternalLink>
              </li>
            ) : null}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
