# Ginete Healthcare Consulting — Client Kickoff Meeting Guide

**Meeting Date**: Weekend of 2026-04-26
**Prepared By**: Cloud Magic Technology Group
**Version**: 2.0 — Updated: confirmed SaaS product sold to health plan clients

---

## Meeting Objectives

1. Confirm the website is live and client is satisfied with deliverables
2. Identify gaps or quick wins for the website (phase 1 closeout)
3. Define the SaaS product — name, positioning, who buys it, who uses it
4. Identify the first 2–3 pilot clients and what they need on day one
5. Align on team structure, HIPAA/compliance obligations, and pricing model
6. Define the engagement that makes this profitable for CMTG

---

## What We Know

**Confirmed**: This is a **multi-tenant SaaS product** that Ginete will sell/license to health plan clients — not internal tooling.

This changes everything:
- Architecture must be multi-tenant from day one (no retrofitting later)
- HIPAA Business Associate Agreement (BAA) almost certainly required
- Subscription billing infrastructure needed (Stripe)
- Customer onboarding, offboarding, and data isolation are first-class concerns
- Enterprise sales cycle — buyers are compliance officers and C-suite, not self-serve
- Ginete needs a pricing model before launch, not after

---

## Part 1: Website Phase Closeout

### Status to Report to Client
- Site is live at ginete.co on Cloudflare Pages
- HTML email templates now active for all form submissions
- CMS Final Rules tracker live, 6 gated eBook guides generating leads
- All phase 1 items complete

### Questions to Ask
- [ ] Are you receiving contact form submissions and eBook notifications?
- [ ] Is the CMS Rules tracker data current?
- [ ] Any copy changes before we officially close phase 1?
- [ ] Do you want Google Analytics + conversion tracking on the site?
- [ ] Should the website start promoting/linking to the compliance app once it's in beta?

---

## Part 2: Compliance App — SaaS Discovery

### Product Definition Questions

**What is it?**
- [ ] What do you want to call it? (Standalone brand vs. "Ginete Comply", "Ginete Platform", etc.)
- [ ] One sentence: what does this product do for a health plan?
- [ ] What is the core workflow a user completes every week inside the app?

**Who buys it?**
- [ ] Title of the economic buyer? (Chief Compliance Officer, VP Compliance, other?)
- [ ] Title of the day-to-day user?
- [ ] Are those the same person or different?
- [ ] What size health plans? (small community plans, regional, national?)
- [ ] California-only at launch or national?

**Why would they buy it over alternatives?**
- [ ] What tools are health plans using today? (spreadsheets, SharePoint, Salesforce, a competitor?)
- [ ] What makes those tools fail for compliance work?
- [ ] What is Ginete's unique advantage? (domain expertise embedded in the product, California-specific, relationship network?)

### Core Feature Hypotheses — Validate Each

| Feature | Hypothesis | Must-Have / Nice-to-Have? |
|---------|-----------|--------------------------|
| **Compliance Calendar** | Track regulatory deadlines, submission windows, audit dates per plan | Must-Have |
| **Regulation Change Feed** | Monitor CMS/DHCS/DMHC rule updates, tied to action items | Must-Have |
| **Audit Readiness Dashboard** | Document status (uploaded, reviewed, approved) per survey/regulation | Must-Have |
| **Gap Assessment Tool** | Questionnaire → prioritized action plan with assigned owners | High Priority |
| **Task & Workflow Manager** | Assign tasks to team members, deadlines, approval chains | High Priority |
| **Document Vault** | Secure upload/storage of policies, attestations, evidence | High Priority |
| **Client Portal (for Ginete)** | Ginete staff monitor all tenant health plans from one view | Must-Have |
| **Reporting & Exports** | PDF/Excel reports for board presentations, regulator responses | High Priority |
| **AI-Assisted Guidance** | "What does this CMS rule mean for my plan?" chat interface | Phase 2 |
| **Regulator Integration** | Pull data directly from CMS APIs | Phase 2 |

Ask: *"If a health plan could only use 3 of these features on day one, which 3 would make them pay for it?"*

### Pilot Client Questions
- [ ] Do you have existing clients who have expressed interest in this product?
- [ ] Who are the first 2–3 health plans you'd want to pilot with?
- [ ] Are any willing to be design partners? (co-develop features, give early feedback, pay reduced rate)
- [ ] What would make a pilot client say "yes" quickly?

### HIPAA & Security Questions
- [ ] Will the app store or process Protected Health Information (PHI)?
  - If yes: HIPAA BAA required with every customer. We need compliance baked in from day one.
- [ ] Do health plan clients have data residency requirements? (US-only storage?)
- [ ] Will clients require a penetration test or security review before signing?
- [ ] SOC 2 Type II — is this a blocker for your target clients, or is a security questionnaire sufficient?
- [ ] SSO requirement? (most enterprise health plans use Azure AD, Okta, or Google Workspace)
- [ ] Audit log requirement? (who accessed what, when — typical in regulated industries)

### Pricing Questions
- [ ] Have you thought about pricing? What feels right?
- [ ] Per-seat (per user), per-organization flat fee, or usage-based?
- [ ] Annual contracts or monthly?
- [ ] What would a health plan currently pay for a comparable tool (or consultants doing this manually)?
- [ ] Are you bundling consulting hours with the software subscription?

**CMTG Pricing Benchmarks for Reference** (share if helpful):
- Small health plan (<50k members): $500–1,500/mo
- Mid-size plan (50k–500k members): $2,000–5,000/mo
- Large plan (500k+): $8,000–15,000/mo or custom
- Implementation/onboarding fee: $3,000–10,000 one-time
- Consulting bundle: software + X hours/quarter Ginete expert time

---

## Part 3: Technical Architecture (CMTG Internal)

### Confirmed Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | React 19 + TypeScript + Tailwind CSS | CMTG standard, fast iteration |
| **UI Components** | shadcn/ui | Accessible, unstyled, composable |
| **Backend / DB** | Supabase (PostgreSQL + Row Level Security) | Multi-tenant isolation via RLS, real-time, auth built-in |
| **Auth** | Supabase Auth + Clerk (if SSO needed) | Supabase for basic auth; Clerk for enterprise SAML/OIDC |
| **API** | Supabase Edge Functions + Cloudflare Workers | Serverless, scales to zero, low cost |
| **File Storage** | Supabase Storage | Document vault, audit evidence uploads |
| **Billing** | Stripe Billing + Stripe Customer Portal | Subscriptions, invoicing, plan upgrades |
| **Email** | Resend | Transactional alerts, deadline notifications |
| **Hosting** | Cloudflare Pages (frontend) + Supabase (backend) | Near-zero infra cost |
| **CI/CD** | GitHub Actions → Cloudflare Pages | Auto-deploy on merge to main |
| **Monitoring** | Splunk HEC (CMTG standard) | Error tracking, audit log ingestion |

### Multi-Tenancy Model

```
Organizations (health plans)
  └── Users (compliance officers, analysts, read-only)
       └── Data (regulations, tasks, documents, deadlines)

Row Level Security policy: users only see rows where org_id = their org
Ginete admin users: can see all orgs (super-admin role)
```

### Data Model (Draft)

```
organizations         — health plan tenants
users                 — people with access (linked to org)
regulations           — CMS/DHCS/DMHC/NCQA rules (global, seeded by Ginete)
compliance_items      — org-specific tracking of each regulation
tasks                 — assigned action items with owner + deadline
documents             — uploaded files linked to compliance_items
deadlines             — regulatory calendar events per org
audit_logs            — who did what, when (immutable append-only)
subscriptions         — Stripe subscription state per org
```

### HIPAA Technical Safeguards (if PHI is in scope)
- Encryption at rest: Supabase provides AES-256 by default
- Encryption in transit: TLS 1.2+ enforced
- Audit logs: immutable, tamper-evident log of all data access
- Access controls: role-based, least-privilege
- BAA: Supabase offers BAA on paid plans; Cloudflare offers BAA on Business+
- Data retention and deletion: org offboarding must purge or export all data

---

## Part 4: Team Structure & Roles

### CMTG Team (proposed for SaaS build)

| Role | Person | Weekly Commitment | Responsibilities |
|------|--------|------------------|-----------------|
| **Engagement Lead** | Chris Marsh | 5–10 hrs | Client relationship, SOW, invoicing, architecture decisions |
| **Technical Lead** | TBD | 20–30 hrs | System design, DB schema, code review, security |
| **Full-Stack Developer** | TBD | 30–40 hrs | Feature implementation, API, UI |
| **UI/UX Designer** | TBD | 10–15 hrs | Figma wireframes → production components |
| **Compliance SME** | Ginete team | 2–4 hrs | Domain accuracy review, workflow validation |
| **DevOps / Infra** | Chris Marsh | 5 hrs | Supabase config, CI/CD, environments, monitoring |

### Client-Side Team (identify in meeting)

| Role | Who Is This? |
|------|-------------|
| **Executive Sponsor** | Final sign-off, budget owner |
| **Product Owner** | Defines features, accepts deliverables, attends weekly calls |
| **Compliance SME** | Answers domain questions in <24 hrs |
| **IT / Security Contact** | Approves HIPAA controls, SSO requirements |
| **Pilot Client Contacts** | 2–3 health plan contacts willing to test early |

### Communication Cadence
- **Weekly**: 30-min status call — progress, blockers, decisions needed
- **Bi-weekly**: Demo of working software — get feedback before building more
- **Monthly**: Budget + invoice review, roadmap prioritization
- **Async**: Slack or Teams channel, response SLA <4 hrs business hours

---

## Part 5: Engagement Model & Profitability

### Recommended Model: Build-to-Own with Retainer

Ginete pays CMTG to build the product. Ginete owns the product and keeps 100% of SaaS revenue. CMTG earns recurring retainer for ongoing development and hosting.

**Alternative**: Revenue share (CMTG takes 10–15% of SaaS revenue in exchange for reduced build fees). Higher upside, longer payback. Only offer if Ginete is budget-constrained.

### Milestone Pricing (SaaS-Calibrated)

| Milestone | Deliverable | Timeline | Price |
|-----------|-------------|----------|-------|
| **M0 — Discovery & Design** | Product spec, wireframes, data model, security plan | 3 weeks | $8,000–12,000 |
| **M1 — Foundation** | Multi-tenant auth, org management, Stripe billing, admin panel | 4 weeks | $15,000–20,000 |
| **M2 — Core Product** | Compliance tracking, calendar, task management, doc vault | 6 weeks | $20,000–28,000 |
| **M3 — Pilot** | UAT with 2–3 health plans, bug fixes, onboarding flow | 3 weeks | $8,000–12,000 |
| **M4 — Launch** | Production deploy, SOC 2 prep docs, training, handoff | 2 weeks | $5,000–8,000 |
| **Retainer** | Monthly dev sprints, hosting, monitoring, support | Ongoing | $4,000–6,000/mo |

**Total build cost**: ~$56,000–80,000 for full MVP + 12 months retainer = $48,000–72,000/yr
**Ginete break-even**: 10–15 mid-size health plan clients at $500–800/mo covers retainer + profit

### Profitability Levers for CMTG
1. **Scope gate at M0** — no code until spec is signed. M0 deliverable defines exactly what M1–M4 include.
2. **CMTG IP clause** — generic components (auth, billing, multi-tenancy shell) remain CMTG IP, reusable in future SaaS builds.
3. **Stripe takes the billing complexity** — don't build billing logic, use Stripe Billing + Customer Portal.
4. **Supabase RLS for multi-tenancy** — don't build tenant isolation middleware; let Postgres do it.
5. **Seeded regulation data = moat** — Ginete's domain expertise as structured data in the DB is the product differentiator and hardest thing to replicate.
6. **Hosting is high-margin recurring** — Supabase Pro + Cloudflare Pages costs ~$50–100/mo to host, bill $500–1,000/mo.

### Red Flags (SaaS Edition)
- Client wants to own all IP including reusable components — negotiate hard or walk away
- No pilot clients identified — "we'll find customers after it's built" is a red flag
- HIPAA requirements unclear — do not start building until PHI scope is settled
- Scope creep framed as "just one more thing" — every addition is a change order
- Expecting launch in <8 weeks — set realistic expectations now

---

## Part 6: Master Question List for Meeting

### Product & Market
- [ ] What do you want to call this product?
- [ ] Describe the ideal customer in one sentence
- [ ] What 3 features would make a health plan pay for it on day one?
- [ ] Who are the first 2–3 pilot health plans you have in mind?
- [ ] What do those pilots need that they can't get elsewhere?
- [ ] What would make this product defensible against a large vendor copying it?

### Commercial & GTM
- [ ] What's the pricing model? Per seat, per org, tiered by plan size?
- [ ] Annual or monthly contracts?
- [ ] Will Ginete sell this through existing consulting relationships or new sales motion?
- [ ] Will consulting services be bundled with the software?
- [ ] What's the target MRR at end of year 1?

### Security & Compliance (for the product itself)
- [ ] Will the app store PHI? (HIPAA BAA required if yes)
- [ ] Data residency requirements from target clients?
- [ ] SSO required by target clients? (Azure AD, Okta, Google)
- [ ] Audit log / access log requirement?
- [ ] Any prospect has already asked about SOC 2?

### Timeline & Budget
- [ ] Is there a regulatory event or conference creating a deadline?
- [ ] Budget for the build — ballpark range?
- [ ] Fixed-price milestones or retainer preference?
- [ ] Is anyone else bidding on this? (competitive situation)

---

## Immediate Next Steps

### Before the Meeting
- [ ] Review this doc, annotate any answers you already know
- [ ] Identify which pilot clients you want to bring up by name
- [ ] Have a verbal pricing range ready ($X/month for a mid-size plan)

### After the Meeting (CMTG actions, within 48 hrs)
1. Send meeting summary with all decisions documented
2. Draft SOW v1 covering M0 (Discovery & Design)
3. Get M0 signed before any further work begins
4. Create GitHub repo `ginete-compliance-app` (private)
5. Spin up Supabase project (free tier for dev)
6. Schedule first design session for wireframes

---

*Document owner: Chris Marsh / CMTG — v2.0 updated 2026-04-24 after confirming SaaS product model*
