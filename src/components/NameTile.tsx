import { cn } from "@/lib/cn";

/** Neutral placeholder shown when an image file has not been supplied yet. */
export function NameTile({ name, className, size = "md" }: { name: string; className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-card text-center",
        className,
      )}
    >
      <div aria-hidden className="dot-grid absolute inset-0 opacity-60" />
      <span
        className={cn(
          "relative px-3 font-display font-semibold tracking-display text-secondary",
          size === "sm" && "text-sm",
          size === "md" && "text-xl",
          size === "lg" && "text-3xl md:text-4xl",
        )}
      >
        {name}
      </span>
    </div>
  );
}
