"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

/** Local time in the owner's timezone, filled in after mount to avoid a hydration mismatch. */
export function LocalClock({ location }: { location: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 15_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="eyebrow flex items-center gap-2.5 tabular-nums">
      <span>{location}</span>
      <span aria-hidden="true">·</span>
      <span>{time ?? "--:--"} IST</span>
    </p>
  );
}
