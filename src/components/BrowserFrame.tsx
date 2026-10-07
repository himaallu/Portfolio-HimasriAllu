import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { NameTile } from "./NameTile";

/** Screenshot in a browser-window frame. Without an image, a neutral tile with the name. */
export function BrowserFrame({
  src,
  alt,
  url,
  name,
  className,
  priority,
  sizes = "(max-width: 1024px) 100vw, 640px",
  placeholder,
}: {
  src: string | null;
  alt: string;
  url?: string | null;
  name: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Shown instead of the neutral name tile when there is no screenshot. */
  placeholder?: ReactNode;
}) {
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : null;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[16px] border border-line-strong bg-raised shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-card px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        {host && (
          <span className="truncate rounded-[6px] bg-base/60 px-3 py-0.5 font-mono text-[0.6875rem] text-muted">{host}</span>
        )}
      </div>
      <div className="relative aspect-[16/10]">
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        ) : (
          (placeholder ?? <NameTile name={name} size="lg" />)
        )}
      </div>
    </div>
  );
}
