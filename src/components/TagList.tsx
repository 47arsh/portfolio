import { cx } from "@/lib/format";
import { Placeholder } from "./Placeholder";

type TagListProps = {
  items: string[];
  className?: string;
};

export function TagList({ items, className }: TagListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={cx("flex flex-wrap gap-2", className)}>
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted"
        >
          <Placeholder value={item} />
        </li>
      ))}
    </ul>
  );
}
