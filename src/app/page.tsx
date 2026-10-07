import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Highlights } from "@/components/sections/Highlights";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { TechStack } from "@/components/sections/TechStack";
import { certifications, education, experience, hackathons, hero, identity, papers } from "@/content";
import type { SnapshotItem } from "@/components/Hero";
import { findImage } from "@/lib/assets";
import { availableResumes } from "@/lib/resumes";

export default function Home() {
  const resumes = availableResumes();
  const award = papers.find((p) => p.award);
  const snapshot: SnapshotItem[] = [
    { icon: "study", label: "Studying", value: `${education[0].degree}, ${education[0].short}`, href: "#about" },
    { icon: "role", label: "Latest role", value: `${experience[0].title}, ${experience[0].company}`, href: "#experience" },
    ...(award ? [{ icon: "award" as const, label: "Research", value: `${award.award}, ${award.venue?.split(",")[0]}`, href: "#research" }] : []),
    { icon: "trophy", label: "Hackathon", value: `${hackathons[0].result}, ${hackathons[0].event.split(" “")[0]}`, href: "#highlights" },
    { icon: "cert", label: "Certified", value: certifications[0].name.replace("AWS Certified ", "AWS "), href: "#certifications" },
  ];
  return (
    <>
      <Hero identity={identity} hero={hero} portrait={findImage("photos", "portrait")} resumes={resumes} snapshot={snapshot} />
      <About />
      <Journey />
      <Experience />
      <Projects />
      <Research />
      <Highlights />
      <TechStack />
      <Contact resumes={resumes} />
    </>
  );
}
