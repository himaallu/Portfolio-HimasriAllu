import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { identity, seo } from "@/content";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-space-grotesk", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(identity.site),
  title: { default: seo.title, template: `%s | ${identity.name}` },
  description: seo.description,
  alternates: { canonical: "/" },
  authors: [{ name: identity.name, url: identity.site }],
  openGraph: {
    type: "website",
    url: identity.site,
    siteName: identity.name,
    title: seo.title,
    description: seo.description,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#070B14", colorScheme: "dark" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  url: identity.site,
  email: `mailto:${identity.email}`,
  jobTitle: "AI Engineer",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
    { "@type": "CollegeOrUniversity", name: "University of Wollongong in Dubai" },
  ],
  sameAs: [identity.linkedin, identity.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-chip focus:bg-raised focus:px-4 focus:py-2 focus:text-primary">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
