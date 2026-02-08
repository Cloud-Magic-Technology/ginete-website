# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro-powered website for Ginete Healthcare Consulting Group - a healthcare compliance consulting firm. The site is an 8-page website deployed on Cloudflare Pages with server-side API routes for form handling and news aggregation.

## Commands

### Local Development
```bash
npm install                    # Install dependencies
npm run dev                    # Start Astro dev server
npm run build                  # Build for production
npm run preview                # Preview with Wrangler (Cloudflare local)
```

### Deployment
Push to `main` branch triggers automatic Cloudflare Pages build + deploy.

## Architecture

**Framework**: Astro 5 with `@astrojs/cloudflare` adapter
**Output**: `server` mode - 8 pages prerendered at build time, 3 API routes server-rendered
**CSS**: Single global stylesheet in `src/styles/global.css`
**JS**: Vanilla JS scripts bundled by Astro per-page

### Project Structure
```
ginete/
├── src/
│   ├── layouts/BaseLayout.astro       # Shared HTML shell (head, nav, footer, global JS)
│   ├── components/
│   │   ├── Navbar.astro               # Nav with activePage prop
│   │   └── Footer.astro               # Footer with clean URLs
│   ├── scripts/
│   │   ├── main.js                    # Global: mobile menu, scroll, contact form
│   │   ├── resources.js               # Page: modal, gated downloads, news feed
│   │   ├── cms-rules.js              # Page: filters, modals, comparison
│   │   └── calendar.js               # Page: Google Calendar link
│   ├── styles/global.css              # Full stylesheet with CSS custom properties
│   └── pages/
│       ├── index.astro                # Homepage
│       ├── services.astro             # Services
│       ├── about.astro                # About + team
│       ├── contact.astro              # Contact form + calendar
│       ├── resources.astro            # eBooks + news feed
│       ├── cms-final-rules.astro      # CMS rules tracker
│       ├── privacy.astro              # Privacy policy
│       ├── terms.astro                # Terms of service
│       └── api/
│           ├── send-contact.ts        # POST - Resend email
│           ├── gate-resource.ts       # POST - gated downloads
│           └── scrape-news.ts         # GET - RSS aggregation
├── public/
│   ├── images/                        # jenny-terry.jpg, pwd_by.png
│   ├── resources/                     # 6 PDF eBooks
│   ├── data/cms-rules.json            # CMS rules data
│   └── _redirects                     # .html -> clean URL 301s
├── astro.config.mjs
├── wrangler.jsonc
├── package.json
└── .dev.vars                          # RESEND_API_KEY (gitignored)
```

### API Routes (Astro Server Endpoints)
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/send-contact` | POST | Contact form -> email via Resend API |
| `/api/gate-resource` | POST | Gated eBook downloads with email capture |
| `/api/scrape-news` | GET | RSS aggregation from CMS, DHCS, NCQA |

### Data Flow
1. **Contact Form**: `main.js` -> `/api/send-contact` -> Resend API -> hello@ginete.co
2. **Resource Downloads**: `resources.js` -> `/api/gate-resource` -> emails user + admin notification
3. **News Feed**: `resources.js` -> `/api/scrape-news` -> RSS parser -> rendered cards

## Environment Variables
Set in Cloudflare Pages dashboard (and `.dev.vars` locally):
```
RESEND_API_KEY=<resend-api-key>
```

## Key Dependencies
- `astro`: Static site generator with server capabilities
- `@astrojs/cloudflare`: Cloudflare Pages adapter

## Resource IDs
The `gate-resource` endpoint recognizes these resource slugs:
- `cms-compliance-guide`
- `dhcs-medi-cal-guide`
- `dmhc-survey-guide`
- `ncqa-accreditation-roadmap`
- `ma-stars-rating-guide`
- `risk-assessment-guide`

## News Sources
RSS feeds aggregated by `scrape-news`:
- CMS.gov press releases
- California DHCS (filtered for Medi-Cal/managed care)
- NCQA news
- DMHC (manual placeholder - no RSS available)

## URLs
All pages use clean URLs (`/services` not `services.html`). Old `.html` paths redirect via `public/_redirects`.

## Legacy
The `ginete-website/` directory contains the old static site (pre-Astro). It will be removed after verifying the new deployment.
