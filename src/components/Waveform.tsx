import { cx } from "@/lib/format";

const BAR_HEIGHTS = [
  3, 5, 9, 14, 8, 17, 24, 15, 9, 19, 27, 21, 11, 15, 23, 30, 17, 11, 7, 13,
  19, 15, 9, 5, 8, 4, 3,
];

type WaveformProps = {
  className?: string;
};

/** Decorative hairline waveform; animates only while hovered and only when motion is allowed. */
export function Waveform({ className }: WaveformProps) {
  return (
    <div aria-hidden="true" className={cx("waveform text-gold opacity-40", className)}>
      <svg
        viewBox="0 0 216 32"
        preserveAspectRatio="none"
        className="h-8 w-full max-w-[216px]"
      >
        {BAR_HEIGHTS.map((height, index) => (
          <line
            key={index}
            x1={index * 8 + 4}
            y1={16 - height / 2}
            x2={index * 8 + 4}
            y2={16 + height / 2}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="waveform-bar"
            style={{ animationDelay: `${index * 45}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}
