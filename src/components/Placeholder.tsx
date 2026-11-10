import { isPlaceholder, stripPlaceholder } from "@/lib/placeholders";

const isDev = process.env.NODE_ENV !== "production";

type PlaceholderProps = {
  value: string;
  className?: string;
  as?: "span" | "div" | "p" | "em";
};

/**
 * Renders normal text untouched. In development an unfilled value gets the
 * dashed gold TODO outline from DESIGN.md; production strips the braces so the
 * page still reads calmly.
 */
export function Placeholder({ value, className, as = "span" }: PlaceholderProps) {
  if (!isPlaceholder(value)) return <>{value}</>;

  const Tag = as;
  const classes = [
    isDev ? "placeholder-todo" : "text-muted italic",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} data-placeholder="">
      {isDev ? value : stripPlaceholder(value)}
    </Tag>
  );
}
