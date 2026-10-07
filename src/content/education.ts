import type { Education } from "./types";

export const education: Education[] = [
  {
    id: "uowd",
    school: "University of Wollongong in Dubai",
    short: "UOWD",
    degree: "Master of Applied Artificial Intelligence",
    detail: null,
    dates: "Sep 2026 – present",
    about:
      "I'm studying for a Master of Applied Artificial Intelligence at the University of Wollongong in Dubai, the Dubai campus of Australia's University of Wollongong.",
    personal: null, // TODO: one or two sentences on why Himasri chose it or what she is focusing on
    logo: "uowd",
    photos: "photos/uowd",
    accent: "royal",
  },
  {
    id: "vit",
    school: "Vellore Institute of Technology, India",
    short: "VIT Vellore",
    degree: "B.Tech Computer Science and Engineering",
    detail: "CGPA 8.31/10",
    dates: "Aug 2021 – Sep 2025",
    about:
      "I spent four years at VIT Vellore, where I did most of my growing up as an engineer: I founded the VIT Blockchain Community and grew it past 1,000 members, published four research papers, and won the 72-hour Yantra Hackathon with ForeverYoung.",
    personal: null, // TODO: personal line
    logo: "vit",
    photos: "photos/vit",
    accent: "blue",
  },
];
