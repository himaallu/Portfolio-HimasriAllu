"use client";

import { useReducedMotion } from "framer-motion";

/** Short product demo in a phone-shaped frame. Loops silently; under reduced motion it waits for play. */
export function DemoVideo({ src, poster, label }: { src: string; poster: string | null; label: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[28px] border border-line-strong bg-raised p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
      <video
        key={reduce ? "still" : "loop"}
        className="block aspect-[360/672] w-full rounded-[20px] bg-card object-cover"
        src={src}
        poster={poster ?? undefined}
        aria-label={label}
        muted
        loop
        playsInline
        autoPlay={!reduce}
        controls={!!reduce}
        preload="metadata"
      />
    </div>
  );
}
