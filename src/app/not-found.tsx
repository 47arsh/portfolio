import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell">
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-6 bg-gold" />
          404
        </p>
        <h1 className="display mt-5 max-w-xl text-[clamp(2.5rem,7vw,4.5rem)] text-balance">
          This page isn&rsquo;t here.
        </h1>
        <p className="mt-5 max-w-md text-muted">
          The link may be old, or the page may never have existed.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-90"
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
    </section>
  );
}
