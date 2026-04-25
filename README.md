# Ginete Healthcare Consulting Group

Marketing website for Ginete Healthcare Consulting Group, helping healthcare organizations navigate local, state, and federal regulatory compliance.

| | |
|---|---|
| **Status** | Production |
| **Infrastructure** | Cloudflare Pages (Workers for API routes) |
| **Live Site** | [ginete.co](https://ginete.co) |
| **Repository** | [github.com/Cloud-Magic-Technology/ginete-website](https://github.com/Cloud-Magic-Technology/ginete-website) |

## Features

- **Compliance Services** - CMS, DHCS, DMHC, and NCQA consulting services with detailed breakdowns
- **CMS Final Rules Tracker** - Filterable, searchable CMS rules database with side-by-side comparison
- **Gated Resource Library** - 6 PDF compliance guides (CMS, DHCS, DMHC, NCQA, MA Stars, Risk Assessment) with email-gated downloads
- **Healthcare News Aggregator** - Live RSS feed from CMS.gov, California DHCS, and NCQA
- **Contact & Booking** - Contact form via Resend API + Google Calendar scheduling, with branded HTML email templates
- **About & Team** - Company mission, values, and consultant credentials (CHC, CHRC, CPHRM)

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5, TypeScript |
| Adapter | @astrojs/cloudflare |
| CSS | Single global stylesheet, CSS custom properties |
| JS | Vanilla JavaScript (per-page bundles) |
| Email | Resend API |
| Hosting | Cloudflare Pages |

## Project Structure

```
ginete/
├── src/
│   ├── layouts/BaseLayout.astro        # Shared HTML shell (head, nav, footer)
│   ├── components/
│   │   ├── Navbar.astro                # Nav with activePage prop
│   │   └── Footer.astro                # Footer with clean URLs
│   ├── scripts/
│   │   ├── main.js                     # Global: mobile menu, scroll, contact form
│   │   ├── resources.js                # Modal, gated downloads, news feed
│   │   ├── cms-rules.js               # Filters, modals, comparison
│   │   └── calendar.js                 # Google Calendar link
│   ├── styles/global.css               # Full stylesheet with CSS custom properties
│   └── pages/
│       ├── index.astro                 # Homepage
│       ├── services.astro              # Services
│       ├── about.astro                 # About + team
│       ├── contact.astro               # Contact form + calendar
│       ├── resources.astro             # eBooks + news feed
│       ├── cms-final-rules.astro       # CMS rules tracker
│       ├── privacy.astro               # Privacy policy
│       ├── terms.astro                 # Terms of service
│       └── api/
│           ├── send-contact.ts         # POST - Resend email
│           ├── gate-resource.ts        # POST - Gated downloads
│           └── scrape-news.ts          # GET - RSS aggregation
├── public/
│   ├── images/                         # Site images
│   ├── resources/                      # 6 PDF eBooks
│   ├── data/cms-rules.json             # CMS rules data
│   └── _redirects                      # .html -> clean URL 301s
├── astro.config.mjs
├── wrangler.jsonc
└── package.json
```

## Pages

All 8 pages are prerendered at build time (`export const prerender = true`). Only the 3 API routes run as Cloudflare Workers.

| Page | Path | Description |
|------|------|-------------|
| Homepage | `/` | Value proposition, core services overview, CTAs |
| Services | `/services` | CMS, DHCS & DMHC, NCQA compliance service details |
| About | `/about` | Mission, values, team bios and credentials |
| Contact | `/contact` | Contact form (Resend) + Google Calendar booking |
| Resources | `/resources` | 6 gated PDF eBook downloads + live news feed |
| CMS Rules | `/cms-final-rules` | Searchable CMS final rules with filters and comparison |
| Privacy | `/privacy` | Privacy policy |
| Terms | `/terms` | Terms of service |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/send-contact` | POST | Contact form submission via Resend API |
| `/api/gate-resource` | POST | Gated eBook download with email capture |
| `/api/scrape-news` | GET | RSS aggregation from CMS, DHCS, NCQA |

## Quick Start

### Prerequisites

- Node.js 20+
- Wrangler CLI (for local preview)

### 1. Clone & Install

```bash
git clone git@github.com:Cloud-Magic-Technology/ginete-website.git
cd ginete-website
npm install
```

### 2. Configure Environment

Create `.dev.vars` for local development:

```bash
RESEND_API_KEY=re_...
```

### 3. Start Development

```bash
# Dev server (http://localhost:4321)
npm run dev

# Preview with Cloudflare Workers (http://localhost:8788)
npm run preview
```

## Deployment

Push to `main` branch triggers automatic Cloudflare Pages build + deploy.

```bash
# Production build
npm run build
```

Environment variables are set in the Cloudflare Pages dashboard.

## License

Proprietary - Cloud Magic Technology Group
