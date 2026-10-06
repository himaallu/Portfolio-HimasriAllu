"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the upper third of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const sections = nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    const top = () => window.scrollY < window.innerHeight * 0.5 && setActive("");
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "pointer-events-auto relative flex w-full max-w-content items-center justify-between gap-2 overflow-hidden rounded-pill border px-2 py-1.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 lg:w-auto",
          scrolled || open
            ? "border-line-strong bg-raised/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
            : "border-line bg-raised/40",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 rounded-pill py-1.5 pl-3 pr-3 font-display text-[0.95rem] font-semibold tracking-display text-primary"
          aria-label="Himasri Allu, home"
        >
          <span aria-hidden className="bg-gradient inline-block h-2 w-2 rounded-full" />
          Himasri Allu
        </Link>

        <ul className="hidden items-center lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={href(n.id)}
                aria-current={active === n.id ? "true" : undefined}
                className={cn(
                  "relative block rounded-pill px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                  active === n.id ? "bg-white/[0.07] text-primary ring-1 ring-white/10" : "text-secondary hover:text-primary",
                )}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-pill p-2.5 text-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>

        <m.span
          aria-hidden
          className="bg-gradient absolute bottom-0 left-0 h-px w-full origin-left"
          style={{ scaleX: progress }}
        />
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="pointer-events-auto absolute inset-x-3 top-[68px] rounded-[20px] border border-line-strong bg-raised/95 p-2 backdrop-blur-xl lg:hidden"
        >
          <ul className="grid grid-cols-2 gap-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={href(n.id)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-chip px-4 py-3 text-[0.9375rem]",
                    active === n.id ? "bg-white/[0.07] text-primary" : "text-secondary hover:bg-white/[0.04] hover:text-primary",
                  )}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
