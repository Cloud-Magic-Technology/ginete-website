# TODO - Ginete Healthcare Consulting Website

**Last Updated**: 2026-01-23
**Status**: Active
**GitHub Repo**: git@github.com:Cloud-Magic-Technology/ginete-website.git

## Current Sprint

### Ready to Start
- [x] Verify ginete.co domain in Resend (add DNS records for SPF/DKIM/DMARC)
- [x] Create and upload PDF eBooks to `resources/` directory (all 6 complete)
- [ ] Deploy to Netlify (blocked: account credits exceeded)

### Blocked
- None

## Completed This Session

- [x] Commit and push pending changes (contact info, team photo, legal pages)
- [x] Fix nodemailer.createTransporter() → createTransport() bug
- [x] Migrate email from nodemailer/Gmail SMTP to Resend API
- [x] Set RESEND_API_KEY env var in Netlify
- [x] Remove old SMTP env vars (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
- [x] Verify contact form and eBook download functions working
- [x] Deploy to production

## Technical Debt / Future Work

- [ ] Add actual PDF resources for gated downloads (currently links to non-existent PDFs)
- [ ] Consider adding HTML email templates instead of plain text

## Git Status

**Branch**: main
**Uncommitted Changes**: 1 (TODO.md)
**Last Commit**: 12a9f9b - fix: switch email provider from nodemailer/Gmail to Resend

## Notes & Context

### Important Decisions Made
- Switched from nodemailer/Gmail SMTP to Resend for email delivery
- Emails sent from noreply@ginete.co (requires domain verification in Resend)

### Resources & Links
- Netlify: https://app.netlify.com/projects/unrivaled-mochi-bf3be6
- Live site: https://ginete.co
- GitHub: Cloud-Magic-Technology/ginete-website
- Resend dashboard: https://resend.com

---

*This TODO file is automatically managed by Claude Code. Keep it updated at the end of each task.*
