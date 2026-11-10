import type { CSSProperties } from "react";
import { cx } from "@/lib/format";

const ACCENT_BARS = [
  3, 5, 9, 14, 8, 17, 24, 15, 9, 19, 27, 21, 11, 15, 23, 30, 17, 11, 7, 13,
  19, 15, 9, 5, 8, 4, 3,
];

// Deterministic two-sine envelope: dense across the full hero width, tallest
// in the middle, quiet at the edges. No randomness, so server and client match.
const HERO_BARS = Array.from({ length: 64 }, (_, index) => {
  const wave =
    Math.sin(index * 0.55) * 0.5 + Math.sin(index * 0.21 + 1.3) * 0.5;
  const envelope = 0.4 + 0.6 * Math.sin((index / 63) * Math.PI);
  return Math.round(4 + Math.abs(wave) * 28 * envelope);
});

type WaveformProps = {
  className?: string;
  variant?: "accent" | "hero";
};

/** Decorative hairline waveform. Static unless motion is allowed. */
export function Waveform({ className, variant = "accent" }: WaveformProps) {
  const hero = variant === "hero";
  const heights = hero ? HERO_BARS : ACCENT_BARS;
  const width = hero ? 1200 : 216;
  const height = 44;
  const step = width / heights.length;

  return (
    <div
      aria-hidden="true"
      className={cx(
        "waveform text-gold",
        hero ? "waveform-idle opacity-45" : "opacity-40",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className={hero ? "h-10 w-full" : "h-8 w-full max-w-[216px]"}
      >
        {heights.map((barHeight, index) => (
          <line
            key={index}
            x1={index * step + step / 2}
            y1={height / 2 - barHeight / 2}
            x2={index * step + step / 2}
            y2={height / 2 + barHeight / 2}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="waveform-bar"
            style={
              {
                animationDelay: `${index * (hero ? 70 : 45)}ms`,
                "--drift": `${5.5 + (index % 5) * 0.65}s`,
              } as CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}
