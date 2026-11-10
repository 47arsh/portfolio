import Image from "next/image";
import { cx } from "@/lib/format";
import { isPlaceholderUrl } from "@/lib/placeholders";

const isDev = process.env.NODE_ENV !== "production";

type ScreenshotProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

export function Screenshot({ src, alt, label, className }: ScreenshotProps) {
  if (isPlaceholderUrl(src)) {
    return (
      <div
        data-placeholder=""
        className={cx(
          "flex min-h-[88px] flex-col justify-center gap-1 border-y px-5 py-4",
          isDev ? "border-dashed border-gold/30" : "border-line",
          className,
        )}
      >
        <p className="eyebrow">{label}</p>
        <p className="text-sm text-muted">Image coming soon</p>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "relative aspect-[16/10] overflow-hidden rounded-[6px] border border-line bg-surface",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
