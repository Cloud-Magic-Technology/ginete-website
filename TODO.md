# TODO - Ginete Healthcare Consulting Website

**Last Updated**: 2026-02-12
**Status**: Production
**GitHub Repo**: git@github.com:Cloud-Magic-Technology/ginete-website.git

## Current Sprint

### Owner Action Required
- [ ] Switch ginete.co URLs/DNS to point to Cloudflare Pages deployment

### Ready to Start
- [ ] Add HTML email templates instead of plain text for contact form and gated downloads
- [ ] Remove legacy `ginete-website/` directory (old static site, still in repo)
- [ ] Remove old `netlify.toml` at root (pre-migration artifact, still in repo)

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
