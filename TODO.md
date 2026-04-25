# TODO - Ginete Healthcare Consulting Website

**Last Updated**: 2026-04-24
**Status**: Production
**GitHub Repo**: git@github.com:Cloud-Magic-Technology/ginete-website.git

## Current Sprint

### Owner Action Required
- [x] Switch ginete.co URLs/DNS to point to Cloudflare Pages deployment (verified 2026-04-24)

### Ready to Start
- [x] Add HTML email templates instead of plain text for contact form and gated downloads (2026-04-24)
- [x] Remove legacy `ginete-website/` directory (2026-04-24)
- [x] Remove old `netlify.toml` at root (2026-04-24)

### Next Up - Compliance App Project
- [ ] Complete kickoff meeting with client (weekend 2026-04-26)
- [ ] Gather compliance app requirements (use kickoff guide)
- [ ] Define team structure and SOW
- [ ] Scope compliance app MVP and produce project plan

### Blocked
- None

## Completed

- [x] Migrate from Netlify to Cloudflare Pages
- [x] Migrate from static HTML to Astro 5 with Cloudflare adapter
- [x] Migrate email from nodemailer/Gmail SMTP to Resend API
- [x] Verify ginete.co domain in Resend (SPF/DKIM/DMARC)
- [x] Create and upload all 6 PDF eBook guides
- [x] Add cookie consent banner and self-host fonts
- [x] Add privacy policy and terms of service pages
- [x] Add CMS Final Rules tracker page
- [x] Set up gated resource downloads with email capture
- [x] Add healthcare news RSS aggregator
- [x] Deploy to production on Cloudflare Pages
- [x] Add standardized README
- [x] Update README descriptions to match actual site content
- [x] Update TODO.md for Cloudflare Pages architecture
- [x] Style footer powered-by logo

## Notes & Context

### Important Decisions Made
- Migrated from Netlify to Cloudflare Pages (Jan 2026)
- Migrated from static HTML to Astro 5 with server-side API routes
- Switched from nodemailer/Gmail SMTP to Resend for email delivery
- Emails sent from noreply@ginete.co (domain verified in Resend)
- RESEND_API_KEY set in Cloudflare Pages dashboard

### Resources & Links
- Cloudflare Pages: Cloudflare dashboard
- Live site: https://ginete.co
- GitHub: Cloud-Magic-Technology/ginete-website
- Resend dashboard: https://resend.com

---

*This TODO file is automatically managed by Claude Code. Keep it updated at the end of each task.*
