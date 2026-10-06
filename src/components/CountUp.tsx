"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({ to, delay = 0, duration = 1.4 }: { to: number; delay?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, delay, duration]);

  return (
    <span ref={ref} className="inline-grid tabular-nums">
      {/* The invisible final value reserves width so the count-up never shifts layout. */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {to}
      </span>
      <span aria-hidden className="col-start-1 row-start-1 text-right">
        {val}
      </span>
      <span className="sr-only">{to}</span>
    </span>
  );
}
