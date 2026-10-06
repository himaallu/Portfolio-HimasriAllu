import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Certifications, Community, Hackathons } from "@/components/sections/Highlights";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { TechStack } from "@/components/sections/TechStack";
import { hero, identity } from "@/content";
import { findImage } from "@/lib/assets";
import { availableResumes } from "@/lib/resumes";

export default function Home() {
  const resumes = availableResumes();
  return (
    <>
      <Hero identity={identity} hero={hero} portrait={findImage("photos", "portrait")} resumes={resumes} />
      <About />
      <Journey />
      <Experience />
      <Projects />
      <Research />
      <Hackathons />
      <Community />
      <Certifications />
      <TechStack />
      <Contact resumes={resumes} />
    </>
  );
}
