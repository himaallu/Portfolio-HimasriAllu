import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  download?: boolean;
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-chip px-5 py-3 text-[0.9375rem] font-medium leading-none transition-colors duration-300 whitespace-nowrap";

export const buttonStyles = {
  primary: cn(base, "btn-primary"),
  secondary: cn(base, "border border-line-strong bg-white/[0.02] text-primary hover:border-white/30 hover:bg-white/[0.05]"),
  ghost: cn(base, "px-3 text-secondary hover:text-primary"),
};

export function Button({ href, children, variant = "primary", className, download, ariaLabel }: Props) {
  const cls = cn(buttonStyles[variant], className);
  if (isExternal(href) || download || href.startsWith("mailto:")) {
    const ext = isExternal(href);
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        download={download || undefined}
        target={ext ? "_blank" : undefined}
        rel={ext ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
