import type { MetadataRoute } from "next";
import { identity } from "@/content";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${identity.site}/sitemap.xml`,
    host: identity.site,
  };
}
