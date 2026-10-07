import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { about, education, identity } from "@/content";
import type { Education } from "@/content/types";
import { findImage, listImages, type GalleryImage } from "@/lib/assets";
import { accentVar } from "@/lib/accent";
import { Gallery } from "../Gallery";
import { GlowCard } from "../GlowCard";
import { Reveal } from "../Reveal";
import { SectionHeader } from "../SectionHeader";

export function About() {
  const galleries = Object.fromEntries(education.map((e) => [e.id, listImages(e.photos, e.short)]));
  const photo =
    findImage("photos", "about") ??
    galleries.uowd?.[0]?.src ??
    galleries.vit?.[0]?.src ??
    findImage("photos", "portrait");

  return (
    <section id="about" aria-labelledby="about-title" className="section-gap">
      <div className="container-content">
        <SectionHeader id="about-title" number="01" label="About" title="Language from the model. Answers from code." />

        <div className={photo ? "grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12" : "grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16"}>
          {photo && (
            <Reveal className="group relative aspect-[4/3] overflow-hidden rounded-card border border-line lg:aspect-auto lg:min-h-[340px]">
              <Image src={photo} alt={`${identity.name}`} fill sizes="(max-width: 1024px) 100vw, 480px" className="photo object-cover" />
              <div aria-hidden className="photo-overlay absolute inset-0" />
            </Reveal>
          )}

          <Reveal delay={0.1} className="flex flex-col justify-center">
            {about.bio.map((p, i) => (
              <p key={i} className={i === 0 ? "font-display text-[1.5rem] font-medium leading-snug tracking-display text-primary md:text-[1.75rem]" : "mt-5 max-w-prose text-lg leading-relaxed text-secondary"}>
                {p}
              </p>
            ))}
            {photo && <Facts className="mt-8 grid grid-cols-2 sm:grid-cols-3" />}
          </Reveal>

          {!photo && (
            <Reveal delay={0.15} className="self-center">
              <Facts stacked className="grid grid-cols-1" />
            </Reveal>
          )}
        </div>

        <h3 className="font-label mb-5 mt-14 md:mt-20 flex items-center gap-2 text-secondary">
          <GraduationCap size={15} aria-hidden /> Education
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.08}>
              <EducationCard edu={e} logo={findImage("logos", e.logo)} photos={galleries[e.id]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const facts = [
  { k: "Based in", v: identity.location },
  { k: "Studying", v: "Master of Applied AI, UOWD" },
  { k: "B.Tech CSE", v: "VIT · CGPA 8.31" },
];

function Facts({ className, stacked = false }: { className?: string; stacked?: boolean }) {
  return (
    <dl className={`gap-px overflow-hidden rounded-[16px] border border-line bg-line ${className ?? ""}`}>
      {facts.map((d) => (
        <div key={d.k} className={stacked ? "bg-raised px-5 py-4" : "bg-raised px-5 py-4 last:col-span-2 sm:last:col-span-1"}>
          <dt className="font-label !text-[0.625rem] text-muted">{d.k}</dt>
          <dd className="mt-1 text-[0.9375rem] text-primary">{d.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function EducationCard({ edu, logo, photos }: { edu: Education; logo: string | null; photos: GalleryImage[] }) {
  return (
    <GlowCard accent={edu.accent} as="article" className="flex h-full flex-col p-6 md:p-7">
      <div className="flex items-start gap-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-line bg-card">
          {logo ? (
            <Image src={logo} alt={`${edu.school} logo`} fill sizes="48px" className="logo-mono object-cover" />
          ) : (
            <span className="font-mono text-[0.625rem] font-semibold text-secondary">{edu.short.split(" ")[0]}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-label !text-[0.6875rem]" style={{ ...accentVar(edu.accent), color: "var(--accent)" }}>
            {edu.dates}
          </p>
          <h4 className="mt-1 font-display text-title font-semibold leading-tight tracking-display">{edu.degree}</h4>
          <p className="mt-1 text-[0.9375rem] text-secondary">
            {edu.school}
            {edu.detail && <span className="text-muted"> · {edu.detail}</span>}
          </p>
        </div>
      </div>
      <p className="mt-5 text-[0.9375rem] leading-relaxed text-secondary">{edu.about}</p>
      {edu.personal && <p className="mt-3 text-[0.9375rem] italic text-secondary">{edu.personal}</p>}
      {photos.length > 0 && <Gallery images={photos} label={`${edu.short} photos`} className="mt-6" max={4} rowHeight="auto-rows-[80px] sm:auto-rows-[96px]" />}
    </GlowCard>
  );
}
