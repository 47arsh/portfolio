import Image from "next/image";
import { cx } from "@/lib/format";
import { isPlaceholderUrl } from "@/lib/placeholders";

const isDev = process.env.NODE_ENV !== "production";

type ScreenshotProps = {
  src: string;
  alt: string;
  label: string;
};

export function Screenshot({ src, alt, label }: ScreenshotProps) {
  if (isPlaceholderUrl(src)) {
    return (
      <div
        className={cx(
          "flex aspect-[16/10] items-center justify-center rounded-[10px] border bg-surface",
          isDev ? "border-dashed border-gold/35" : "border-line",
        )}
        data-placeholder=""
      >
        <span className="eyebrow">{label}</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] border border-line bg-surface">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
