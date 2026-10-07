import { ArrowRight } from "lucide-react";
import type { Metric } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Designed stand-in for a project screenshot that has not been supplied yet: the name, a faint
 * accent wash and grid, and the headline numbers. Uses the nearest --accent.
 */
export function ProjectCover({ name, metrics = [], stack = [], hint, className, size = "lg" }: {
  name: string;
  /** Small call to action under the name, e.g. "Case study". */
  hint?: string;
  metrics?: Metric[];
  stack?: string[];
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div role="img" aria-label={`${name} cover`} className={cn("relative flex h-full w-full flex-col justify-between overflow-hidden bg-card p-6 md:p-8", className)}>
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 60%)" }} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse at 70% 30%, black 20%, transparent 75%)",
        }}
      />
      <p className="relative font-mono text-[0.6875rem] tracking-wide text-muted">{stack.slice(0, 3).join("  ·  ")}</p>
      <div className="relative">
        <p className={cn("font-display font-semibold tracking-display text-primary", size === "lg" ? "text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none" : "text-2xl")}>{name}</p>
        {hint && (
          <p className="mt-4 inline-flex items-center gap-2 font-label !text-[0.6875rem]" style={{ color: "var(--accent)" }}>
            {hint} <ArrowRight size={13} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
          </p>
        )}
        {metrics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
            {metrics.slice(0, 3).map((m) => (
              <span key={m.label + m.value} className="block">
                <span className="block font-mono text-lg font-semibold leading-none" style={{ color: "var(--accent)" }}>{m.value}</span>
                <span className="mt-1.5 block text-[0.75rem] text-muted">{m.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
