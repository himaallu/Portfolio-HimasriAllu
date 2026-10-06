import type { Accent } from "@/content/types";

/** CSS custom property for an accent colour. Use with `style={accentVar(a)}` then `var(--accent)` in classes. */
export function accentVar(accent: Accent): React.CSSProperties {
  return { ["--accent" as string]: `var(--color-${accent})` };
}
