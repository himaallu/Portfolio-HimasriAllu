"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Hero as HeroContent, Identity, Resume } from "@/content/types";
import { Button } from "./Button";
import { ExternalIcon, GithubIcon } from "./Icons";
import { NameTile } from "./NameTile";
import { ResumeMenu } from "./ResumeMenu";

type Props = { identity: Identity; hero: HeroContent; portrait: string | null; resumes: Resume[] };


export function Hero({ identity, hero, portrait, resumes }: Props) {
  // Entry sequence (name, role, summary, buttons, portrait) is CSS-driven via [data-enter],
  // so it paints before hydration.
  const [first, ...rest] = identity.name.split(" ");

  return (
    <section aria-label="Introduction" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 md:pt-32">
      <HeroBackground />

      <div className="container-content grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
        {/* Portrait: right on desktop, above the name on mobile */}
        <div data-enter style={{ animationDelay: "0.56s" }}
          className="order-first mx-auto w-[min(50vw,210px)] lg:order-last lg:w-full lg:max-w-[420px]"
        >
          <Portrait src={portrait} name={identity.name} />
        </div>

        <div className="min-w-0">
          <p data-enter style={{ animationDelay: "0.00s" }} className="font-label mb-5 flex items-center gap-2 text-secondary">
            <MapPin size={14} aria-hidden className="text-muted" />
            {identity.location}
            <span aria-hidden className="text-muted">·</span>
            <span>{identity.visa}</span>
          </p>

          <h1 data-enter style={{ animationDelay: "0.00s" }}
            className="hero-name w-fit font-display text-hero font-bold leading-[0.92] tracking-[-0.035em]"
          >
            <span className="block pb-[0.06em]">{first}</span>
            <span className="block pb-[0.08em]">{rest.join(" ")}</span>
          </h1>

          <div data-enter style={{ animationDelay: "0.14s" }} className="mt-5">
            <RotatingRole roles={hero.roles} />
          </div>

          <p data-enter style={{ animationDelay: "0.28s" }}
            className="mt-6 max-w-[60ch] text-[1.0625rem] leading-[1.7] text-secondary md:text-lg"
          >
            {hero.summary}
          </p>

          <div data-enter style={{ animationDelay: "0.42s" }} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects">
              View projects <ArrowRight size={17} aria-hidden />
            </Button>
            <ResumeMenu resumes={resumes} />
            <div className="flex items-center gap-1">
              <Button href={identity.github} variant="ghost" ariaLabel="GitHub profile (opens in a new tab)">
                <GithubIcon size={17} /> GitHub
              </Button>
              <Button href={identity.linkedin} variant="ghost" ariaLabel="LinkedIn profile (opens in a new tab)">
                LinkedIn <ExternalIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-secondary md:flex"
        aria-label="Scroll to About"
      >
        <span className="font-label !text-[0.625rem]">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-line-strong">
          <span className="cue-dot mt-1.5 h-1.5 w-1 rounded-full bg-secondary" />
        </span>
        <ArrowDown size={12} aria-hidden className="sr-only" />
      </a>
    </section>
  );
}

function RotatingRole({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, [roles.length]);
  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <p className="flex items-center gap-3 font-display text-[clamp(1.25rem,2.6vw,1.875rem)] font-medium tracking-display text-primary">
      <span aria-hidden className="h-px w-8 bg-line-strong sm:w-12" />
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="relative inline-grid overflow-hidden">
        <span className="invisible col-start-1 row-start-1">{longest}</span>
        <AnimatePresence initial={false}>
          <m.span
            key={roles[i]}
            className="col-start-1 row-start-1"
            initial={{ opacity: 0, y: reduce ? 0 : "60%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : "-60%" }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {roles[i]}
          </m.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

function Portrait({ src, name }: { src: string | null; name: string }) {
  return (
    <div className="relative aspect-square">
      {/* Quiet frame: a soft halo and a hairline ring */}
      <div aria-hidden className="absolute -inset-6 rounded-full bg-blue opacity-[0.07] blur-2xl" />
      <div aria-hidden className="absolute -inset-px rounded-full bg-linear-to-b from-white/30 to-white/5" />
      <div className="relative h-full overflow-hidden rounded-full bg-card">
        {src ? (
          <Image
            src={src}
            alt={`Portrait of ${name}`}
            fill
            priority
            sizes="(max-width: 1024px) 210px, 420px"
            className="object-cover"
          />
        ) : (
          <NameTile name={name} size="lg" />
        )}
      </div>
    </div>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="blob blob-a left-[-10%] top-[-10%] h-[55vmax] w-[55vmax] bg-blue opacity-[0.07]" />
      <div className="blob blob-b right-[-15%] top-[10%] h-[50vmax] w-[50vmax] bg-purple opacity-[0.05]" />
      <div className="dot-grid absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-base" />
    </div>
  );
}
