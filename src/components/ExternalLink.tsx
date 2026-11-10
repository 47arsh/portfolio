import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { isPlaceholderUrl } from "@/lib/placeholders";
import { ArrowUpRight } from "./icons";

const isDev = process.env.NODE_ENV !== "production";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  ariaLabel?: string;
};

/**
 * Renders a normal external link. When the URL is still a placeholder the
 * label is shown as muted text, so the site never contains a dead link.
 */
export function ExternalLink({
  href,
  children,
  className,
  showArrow = false,
  ariaLabel,
}: ExternalLinkProps) {
  if (isPlaceholderUrl(href)) {
    return (
      <span
        className={cx("text-muted", isDev && "placeholder-todo", className)}
        data-placeholder=""
        title={isDev ? "TODO: add this URL in src/content/site.ts" : undefined}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
      {showArrow ? (
        <ArrowUpRight className="ml-1 inline-block size-3.5 shrink-0" />
      ) : null}
    </a>
  );
}
