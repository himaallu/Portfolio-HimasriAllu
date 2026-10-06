# himasriallu.com

Personal portfolio for Himasri Allu. Next.js (App Router), TypeScript, Tailwind CSS v4 and
Framer Motion, fully statically generated.

## Editing content

All text is in **`src/content/`**; components never hold copy.

| File | Contains |
|---|---|
| `site.ts` | Identity, SEO, hero summary, proof chips, resume list, About bio, nav |
| `education.ts` | UOWD and VIT cards |
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

One deliberate deviation from the brief: the muted text colour is `#7A859F` rather than
`#6B7690`, because the original fails WCAG AA contrast (4.5:1) on the card surfaces.

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

## SEO

- Title "Himasri Allu | AI Engineer", description from the hero summary
- Open Graph image generated at build (`src/app/opengraph-image.tsx`)
- `sitemap.xml` and `robots.txt` (`src/app/sitemap.ts`, `src/app/robots.ts`)
- JSON-LD `Person` schema in `src/app/layout.tsx`
