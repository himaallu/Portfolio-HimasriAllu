import type { MetadataRoute } from "next";
import { featuredProjects, identity } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: identity.site, changeFrequency: "monthly", priority: 1 },
    ...featuredProjects.map((p) => ({
      url: `${identity.site}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
