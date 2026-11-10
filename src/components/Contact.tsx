import { site } from "@/content/site";
import { cx } from "@/lib/format";
import { isPlaceholderUrl } from "@/lib/placeholders";
import { emailHref, socialUrls } from "@/lib/site-links";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./icons";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionShell } from "./SectionShell";

const isDev = process.env.NODE_ENV !== "production";

const SOCIAL =
  "eyebrow inline-flex items-center gap-1.5 transition-colors hover:text-ink";

export function Contact() {
  const { profile } = site;
  const urls = socialUrls(profile.socials);
  const mail = emailHref(profile.email);
  const mailMissing = isPlaceholderUrl(mail);
  const resumeReady = !isPlaceholderUrl(profile.resumeUrl);

  const socials = [
    { label: "GitHub", href: urls.github },
    { label: "X", href: urls.x },
    { label: "LinkedIn", href: urls.linkedin },
    { label: "LeetCode", href: urls.leetcode },
    { label: "YouTube", href: urls.youtube },
  ];

  return (
    <SectionShell
      id="contact"
      index="08"
      label="Contact"
      title="Let’s build something."
      titleClassName="text-[clamp(2.7rem,7vw,5.5rem)] leading-[0.94]"
      intro="The fastest way to reach me."
    >
      <Reveal>
        {mailMissing ? (
          <p
            className={cx(
              "display mt-10 break-words text-[clamp(1.5rem,4.4vw,2.75rem)] text-muted",
              isDev && "placeholder-todo",
            )}
            data-placeholder=""
          >
            <Placeholder value={profile.email} />
          </p>
        ) : (
          <a
            href={mail}
            className="display mt-10 inline-block break-all text-[clamp(1.5rem,4.4vw,2.75rem)] underline decoration-line-strong decoration-1 underline-offset-[10px] transition-colors hover:text-gold-soft hover:decoration-gold"
          >
            {profile.email}
          </a>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
          {mailMissing ? (
            <span className={cx(SOCIAL, "text-muted", isDev && "placeholder-todo")}>
              Email
            </span>
          ) : (
            <a href={mail} className={SOCIAL}>
              Email
              <ArrowUpRight className="size-3 text-gold" />
            </a>
          )}

          {socials.map((social) => (
            <ExternalLink key={social.label} href={social.href} className={SOCIAL}>
              {social.label}
              {isPlaceholderUrl(social.href) ? null : (
                <ArrowUpRight className="size-3 text-gold" />
              )}
            </ExternalLink>
          ))}

          {resumeReady ? (
            <ExternalLink
              href={profile.resumeUrl}
              className={SOCIAL}
              ariaLabel="Download resume as PDF"
            >
              Resume
              <ArrowUpRight className="size-3 text-gold" />
            </ExternalLink>
          ) : null}
        </div>
      </Reveal>
    </SectionShell>
  );
}
