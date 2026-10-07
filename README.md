# himasriallu.com

Personal portfolio for Himasri Allu. Next.js (App Router), TypeScript, Tailwind CSS v4 and
Framer Motion, fully statically generated.

## Editing content

All text is in **`src/content/`**; components never hold copy.

| File | Contains |
|---|---|
| `site.ts` | Identity, SEO, hero summary, resume, About title, nav |
| `education.ts` | UOWD and VIT (their `about` text is the About section story) |
| `experience.ts` | The four roles |
| `projects.ts` | Featured projects (with case-study pages) and "More projects" |
| `research.ts` | Papers |
| `highlights.ts` | Hackathons, community, certifications |
| `journey.ts` | Roadmap phases |
| `stack.ts` | Tech stack groups |

A `null` value means "not supplied yet" and renders nothing. **`TODO.md`** lists every open item.

Images are read from `public/` at build time: drop a file in the right folder and redeploy.
See `TODO.md` for every path and naming rule.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
npm run lint     # typecheck
```

## Design tokens

Defined once in `src/app/globals.css` (`@theme`), and used through Tailwind utilities
(`bg-raised`, `text-secondary`, `rounded-card`, `text-hero`, …). Accent colours are applied per
card through a `--accent` CSS variable (`src/lib/accent.ts`).

Deliberate deviations from the brief:

- The palette is calmer than the brief: the six section accents are desaturated, the signature
  gradient is a soft silver instead of blue → purple → pink, the primary button is solid off-white,
  and the hero/contact background glows are faint. Change the accent hex values in `@theme` to
  dial colour back up.
- The muted text colour is `#7A859F` rather than `#6B7690`, because the original fails WCAG AA
  contrast (4.5:1) on the card surfaces.
- Company logos are shown greyscale (not white silhouettes) at rest, since the supplied logos sit
  on their own coloured tiles. Square logos with their own background work best.

## Deploying to Vercel with himasriallu.com

1. Push this repo to GitHub, then on [vercel.com/new](https://vercel.com/new) import it.
   Vercel detects Next.js; keep the defaults and deploy.
2. In the project, open **Settings → Domains** and add `himasriallu.com`, then
   `www.himasriallu.com` (Vercel will offer to redirect one to the other; redirecting `www` to the
   apex is a good default, since the canonical URL in the code is `https://himasriallu.com`).
3. At your domain registrar, create the DNS records Vercel displays for each domain: an
   **A record** for the apex (`@`) and a **CNAME** for `www`. Use the exact values shown in the
   Vercel dashboard. Alternatively, switch the domain's nameservers to Vercel.
4. Wait for Vercel to show both domains as **Valid Configuration**; HTTPS certificates are issued
   automatically.

Every push to the main branch redeploys; pull requests get preview URLs.

### DNS at GoDaddy (where himasriallu.com is registered)

Keep GoDaddy as the registrar and DNS host; only the records change.

1. Sign in at godaddy.com → **My Products** → next to `himasriallu.com` choose **DNS**
   (or **Manage DNS**).
2. **Apex record:** find the existing **A** record with name `@` (GoDaddy's default usually
   points to "Parked"). Edit it so the value is the IP Vercel shows for `himasriallu.com`.
   Delete any other `A` or `AAAA` records named `@`, or traffic will be split between Vercel and GoDaddy.
3. **www record:** find the **CNAME** with name `www` (GoDaddy's default points to `@`). Edit it so
   the value is the hostname Vercel shows for `www.himasriallu.com`.
4. Check **Forwarding** on the same page (or under Domain Settings) and remove any domain
   forwarding; it overrides these records.
5. Save, then go back to Vercel → Settings → Domains. Changes usually show up within minutes to
   an hour (GoDaddy's default TTL is 1 hour); Vercel then marks both domains **Valid Configuration**
   and issues HTTPS certificates.

If you set up GoDaddy email or other services on this domain, leave their `MX`/`TXT` records alone.

## SEO

- Title "Himasri Allu | AI Engineer", description from the hero summary
- Open Graph image generated at build (`src/app/opengraph-image.tsx`)
- `sitemap.xml` and `robots.txt` (`src/app/sitemap.ts`, `src/app/robots.ts`)
- JSON-LD `Person` schema in `src/app/layout.tsx`
