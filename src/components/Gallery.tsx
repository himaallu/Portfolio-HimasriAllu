"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { GalleryImage } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { Lightbox } from "./Lightbox";

/**
 * Bento gallery with mixed tile sizes and a lightbox on click.
 * Layout patterns cycle so it never reads as a uniform grid.
 */
const PATTERNS: Record<number, string[]> = {
  1: ["col-span-6 row-span-2"],
  2: ["col-span-6 sm:col-span-4 row-span-2", "col-span-6 sm:col-span-2 row-span-2"],
  3: ["col-span-6 sm:col-span-4 row-span-2", "col-span-3 sm:col-span-2", "col-span-3 sm:col-span-2"],
  4: ["col-span-6 sm:col-span-3 row-span-2", "col-span-3", "col-span-3 sm:col-span-2", "col-span-6 sm:col-span-1"],
  5: ["col-span-6 sm:col-span-4 row-span-2", "col-span-3 sm:col-span-2", "col-span-3 sm:col-span-2", "col-span-3", "col-span-3"],
};

function tileClass(i: number, n: number): string {
  return PATTERNS[Math.min(n, 5)][i] ?? "col-span-3";
}

type Props = {
  images: GalleryImage[];
  label: string;
  className?: string;
  /** Max tiles shown inline; the rest open from a "+N" tile in the lightbox. */
  max?: number;
  rowHeight?: string;
};

export function Gallery({ images, label, className, max = 5, rowHeight = "auto-rows-[96px] sm:auto-rows-[120px]" }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  if (images.length === 0) return null;
  const shown = images.slice(0, Math.min(max, 5));
  const extra = images.length - shown.length;

  return (
    <>
      <ul aria-label={label} className={cn("grid grid-cols-6 gap-2 sm:gap-3", rowHeight, className)}>
        {shown.map((img, i) => (
          <li key={img.src} className={cn(tileClass(i, shown.length), "relative")}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block h-full w-full overflow-hidden rounded-[14px] bg-card"
              aria-label={`Open photo: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 400px"
                className="photo object-cover"
                loading="lazy"
              />
              <span aria-hidden className="photo-overlay absolute inset-0" />
              {extra > 0 && i === shown.length - 1 && (
                <span className="absolute inset-0 flex items-center justify-center bg-base/60 font-display text-2xl font-semibold text-primary">
                  +{extra}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={open} onClose={close} onIndex={setOpen} />
    </>
  );
}
