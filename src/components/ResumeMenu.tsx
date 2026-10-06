"use client";

import { ChevronDown, FileDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { Resume } from "@/content/types";
import { buttonStyles } from "./Button";
import { cn } from "@/lib/cn";

export function ResumeMenu({ resumes, variant = "secondary", align = "left" }: { resumes: Resume[]; variant?: "primary" | "secondary"; align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (resumes.length === 0) return null;

  return (
    <div ref={wrap} className="relative" onBlur={(e) => !wrap.current?.contains(e.relatedTarget as Node) && setOpen(false)}>
      <button
        type="button"
        className={buttonStyles[variant]}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <FileDown size={17} aria-hidden />
        Download resume
        <ChevronDown size={16} aria-hidden className={cn("transition-transform duration-300", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          id={id}
          className={cn(
            "absolute top-[calc(100%+8px)] z-30 min-w-[240px] overflow-hidden rounded-[16px] border border-line-strong bg-raised/95 p-1.5 shadow-2xl backdrop-blur-xl",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {resumes.map((r) => (
            <li key={r.file}>
              <a
                href={r.file}
                download
                className="flex items-center justify-between gap-6 rounded-chip px-3.5 py-3 text-[0.9375rem] text-secondary hover:bg-white/[0.05] hover:text-primary focus-visible:bg-white/[0.05] focus-visible:text-primary"
              >
                {r.label}
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">PDF</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
