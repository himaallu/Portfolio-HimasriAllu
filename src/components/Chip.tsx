import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small mono chip. `accent` uses the nearest --accent; otherwise neutral. */
export function Chip({ children, accent = false, className }: { children: ReactNode; accent?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-chip px-2.5 py-1 font-mono text-[0.75rem] leading-tight tracking-wide",
        accent ? "chip-accent" : "border border-line bg-white/[0.03] text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-label !text-[0.6875rem] chip-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
