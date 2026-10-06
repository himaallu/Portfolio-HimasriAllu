"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Detail behind a click. Content stays in the DOM order for screen readers when open. */
export function Expandable({ children, label }: { children: ReactNode; label: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-chip py-1 font-label !text-[0.6875rem] text-secondary transition-colors hover:text-primary"
      >
        <Plus size={14} aria-hidden className={cn("transition-transform duration-300", open && "rotate-45")} style={{ color: "var(--accent)" }} />
        {open ? "Less" : "Details"}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
