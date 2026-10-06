import type { Paper } from "./types";

export const researchHeadline = "4× published researcher";

/** Papers shown on the site (a selection; the headline counts all four publications). */
export const papers: Paper[] = [
  {
    id: 1,
    title: "Tackling E-Waste Management Using Decentralized Marketplace Leveraging Ethereum Blockchain",
    venue: "IEEE IConSCEPT-2024, NIT Puducherry",
    venueType: "IEEE conference",
    year: "2024",
    summary: "A decentralised marketplace on the Ethereum blockchain for managing electronic waste.",
    link: "https://ieeexplore.ieee.org/abstract/document/10627838",
    award: "Best Paper Award",
    photos: "photos/research",
  },
  {
    id: 2,
    title: "A Critical Review of Resource Allocation Optimization in Project Management",
    venue: "International Research Journal on Advanced Engineering Hub (IRJAEH), Vol. 2 No. 06",
    venueType: "International journal",
    year: "2024",
    summary:
      "Reviews how better resource allocation, scheduling and planning improve efficiency and profitability in construction projects.",
    link: "https://irjaeh.com/index.php/journal/article/view/294",
    award: null,
    photos: null,
  },
];
