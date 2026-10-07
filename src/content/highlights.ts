import type { Certification, Community, Hackathon } from "./types";

export const hackathons: Hackathon[] = [
  {
    id: "n8n-dubai",
    result: "Top 4 of 400+",
    event: "n8n Dubai Hackathon “Automate with K2 Horizon”",
    date: "Sep 2026",
    project: "Haqqi",
    projectHref: "/projects/haqqi",
    photos: "photos/hackathon-n8n",
    accent: "amber",
  },
  {
    id: "vit-72h",
    result: "Winner, Best Idea in Health and Wellness",
    event: "Yantra Hackathon, VIT (72 hours)",
    date: "Jun 2023",
    project: "ForeverYoung",
    projectHref: "https://github.com/himaallu/ForeverYoung",
    photos: "photos/hackathon-vit",
    accent: "green",
  },
];

export const community: Community = {
  name: "VIT Blockchain Community",
  role: "Founder",
  dates: "2023 – 2024",
  bullets: ["Founded the community and grew it to 1,000+ members.", "Ran workshops with Solana and Avalanche."],
  stats: [
    { value: "1,000+", label: "members" },
    { value: "Solana · Avalanche", label: "workshops with" },
  ],
  events: [
    {
      name: "InnoVerse Hackathon",
      description:
        "Contributed to planning, partnerships, participant engagement, fair judging, marketing and post-event analysis.",
      photos: "photos/community/innoverse",
    },
    {
      name: "Designathon",
      description: "Participants designed NFTs and learned how to list them.",
      photos: "photos/community/designathon",
    },
    {
      name: "Inauguration of the VIT Blockchain Community",
      description: null,
      photos: "photos/community/inauguration",
    },
    {
      name: "Workshops",
      description: "Ran workshops with Solana and Avalanche.",
      photos: "photos/community/workshops",
    },
  ],
};

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    short: "Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Feb 2024",
    verify: "https://aws.amazon.com/verification",
    credentialId: "0279b8392e2f41dc8c2fbbd5e391e555",
    badge: "aws-solutions-architect-associate",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    short: "Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jan 2024",
    verify: "https://aws.amazon.com/verification",
    credentialId: "206268ba172c4fb9979dbb2dadadffbf",
    badge: "aws-cloud-practitioner",
  },
];
