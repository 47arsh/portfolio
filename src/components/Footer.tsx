import { site } from "@/content/site";
import { ArrowUp } from "./icons";
import { Placeholder } from "./Placeholder";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-lg tracking-tight text-ink">
          <Placeholder value={site.profile.name} />
          <span className="ml-2 font-sans text-[11px] text-muted">
            © {year}
          </span>
        </p>

        <p className="eyebrow">Next.js · Tailwind CSS</p>

        <a
          href="#top"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
        >
          Back to top
          <ArrowUp className="size-3.5 text-gold transition-transform duration-200 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
