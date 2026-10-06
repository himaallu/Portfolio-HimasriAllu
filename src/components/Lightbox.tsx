"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "@/lib/assets";

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

export function Lightbox({ images, index, onClose, onIndex }: Props) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const isOpen = index !== null;
  const n = images.length;

  useEffect(() => {
    if (!isOpen) return;
    returnFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      returnFocus.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (index === null) return;
    function onKey(e: KeyboardEvent) {
      if (index === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % n);
      if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
      if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const nodes = document.querySelectorAll<HTMLElement>("[data-lightbox] button");
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onClose, onIndex]);

  if (typeof document === "undefined") return null;
  const img = index !== null ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {img && index !== null && (
        <m.div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${n}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-base/90 p-4 backdrop-blur-md md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.25 }}
          onClick={onClose}
        >
          <m.figure
            key={img.src}
            className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0.01 : 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[75vh] w-full">
              <Image src={img.src} alt={img.alt} fill sizes="100vw" className="rounded-[14px] object-contain" />
            </div>
            <figcaption className="max-w-prose text-center text-sm text-secondary">
              {img.alt}
              <span className="ml-3 font-mono text-muted">
                {index + 1}/{n}
              </span>
            </figcaption>
          </m.figure>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full border border-line-strong bg-raised p-2.5 text-primary hover:bg-card"
          >
            <X size={20} aria-hidden />
          </button>
          {n > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex((index - 1 + n) % n);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-raised p-2.5 text-primary hover:bg-card md:left-6"
              >
                <ChevronLeft size={22} aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex((index + 1) % n);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-raised p-2.5 text-primary hover:bg-card md:right-6"
              >
                <ChevronRight size={22} aria-hidden />
              </button>
            </>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
