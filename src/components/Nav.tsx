"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cx } from "@/lib/format";
import { Placeholder } from "./Placeholder";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#open-source", label: "Open source" },
  { href: "#sound", label: "Sound" },
  { href: "#log", label: "Log" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav({ siteName }: { siteName: string }) {
  const [elevated, setElevated] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setElevated(window.scrollY > 8);

      const marker = window.scrollY + 140;
      let current = "";

      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.href.slice(1));
        if (section && section.offsetTop <= marker) {
          current = link.href;
        }
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;
      if (atBottom) current = NAV_LINKS[NAV_LINKS.length - 1].href;

      setActive(current);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        elevated || open
          ? "border-line bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label="Home"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
          />
          <span className="truncate font-serif text-lg tracking-tight text-ink">
            <Placeholder value={siteName} />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={cx(
                  "relative py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-150",
                  isActive ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {link.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gold"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-gold md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 16 16"
            fill="none"
            className="size-4"
          >
            {open ? (
              <path
                d="m4 4 8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2.5 5h11M2.5 11h11"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-bg/95 backdrop-blur-md md:hidden"
        >
          <nav aria-label="Mobile" className="shell flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors last:border-0 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
