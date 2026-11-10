import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section border-t border-line">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-[148px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-16">
          <p className="eyebrow flex items-start gap-3 pt-2">
            <span aria-hidden="true" className="hairline-gold mt-2" />
            404 / Not found
          </p>

          <div>
            <h1 className="display max-w-[16ch] text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] text-balance">
              This page isn&rsquo;t here.
            </h1>
            <p className="lead mt-6 max-w-[42ch]">
              The link may be old, or the page may never have existed.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85"
              >
                Back home
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors duration-150 hover:border-gold"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
