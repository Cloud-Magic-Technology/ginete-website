# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Ginete Healthcare Consulting Group - a healthcare compliance consulting firm. The site is a 5-page static website deployed on Netlify with serverless functions for form handling and news aggregation.

## Commands

### Local Development
```bash
cd ginete-website
npm install                    # Install dependencies
netlify dev                    # Start local dev server at http://localhost:8888
```

### Deployment
```bash
netlify deploy --prod          # Deploy to production
```

No build step required - this is a static site with Netlify functions.

## Architecture

### Frontend Structure
```
ginete-website/
├── *.html                     # Static pages (index, services, about, resources, contact)
├── css/style.css              # Single stylesheet with CSS custom properties
└── js/
    ├── main.js                # Mobile menu, smooth scroll, contact form handler
    ├── resources.js           # Modal for gated downloads, news feed loader
    └── calendar.js            # Google Calendar appointment scheduling
```

### Netlify Functions (Serverless Backend)
All functions are in `netlify/functions/`:

| Function | Endpoint | Purpose |
|----------|----------|---------|
| `send-contact.js` | `POST /.netlify/functions/send-contact` | Contact form → email via nodemailer |
| `gate-resource.js` | `POST /.netlify/functions/gate-resource` | Gated eBook downloads with email capture |
| `scrape-news.js` | `GET /.netlify/functions/scrape-news` | RSS aggregation from CMS, DHCS, NCQA |

### Data Flow
1. **Contact Form**: `main.js` → `send-contact` function → nodemailer → hello@ginete.co
2. **Resource Downloads**: `resources.js` → `gate-resource` function → emails user + admin notification
3. **News Feed**: `resources.js` → `scrape-news` function → RSS parser → rendered cards

## Environment Variables (Netlify)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<email>
SMTP_PASS=<gmail-app-password>
```

## Key Dependencies
- `nodemailer`: Email sending for forms
- `axios`: HTTP client
- `rss-parser`: Healthcare news RSS feed parsing

## Resource IDs
The `gate-resource` function recognizes these resource slugs:
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

## Configuration Files
- `netlify.toml`: Netlify build config, security headers, function routing, caching rules
- API redirects: `/api/*` → `/.netlify/functions/:splat`
