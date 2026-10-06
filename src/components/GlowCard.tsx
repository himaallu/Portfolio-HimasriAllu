"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import type { Accent } from "@/content/types";
import { accentVar } from "@/lib/accent";
import { cn } from "@/lib/cn";

type Props = {
  accent: Accent;
  children: ReactNode;
  className?: string;
  lift?: boolean;
  as?: "div" | "article" | "li";
  id?: string;
  style?: CSSProperties;
};

/** Raised card; on hover the border takes the accent and a soft accent glow follows the cursor. */
export function GlowCard({ accent, children, className, lift = true, as: Comp = "div", id, style }: Props) {
  function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <Comp
      id={id}
      onMouseMove={onMove}
      style={{ ...accentVar(accent), ...style }}
      className={cn("surface glow-card group", lift && "lift", className)}
    >
      {children}
    </Comp>
  );
}
