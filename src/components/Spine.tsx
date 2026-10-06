"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Roadmap spine: a faint track with a brighter line that draws down as you scroll. */
export function Spine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-line-strong md:left-[37px]" />
      <m.div
        aria-hidden
        className="absolute bottom-6 left-[19px] top-6 w-px origin-top md:left-[37px]"
        style={{
          scaleY: reduce ? 1 : scaleY,
          background: "linear-gradient(180deg, rgba(244, 246, 251, 0.55), rgba(244, 246, 251, 0.2))",
        }}
      />
      {children}
    </div>
  );
}
