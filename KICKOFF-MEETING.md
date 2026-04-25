# Ginete Healthcare Consulting — Client Kickoff Meeting Guide

**Meeting Date**: Weekend of 2026-04-26
**Prepared By**: Cloud Magic Technology Group
**Version**: 1.0

---

## Meeting Objectives

1. Confirm the website is live and client is satisfied with deliverables
2. Identify gaps or quick wins for the website (phase 1 closeout)
3. Scope the compliance app — define what it is, who uses it, and what success looks like
4. Align on team structure, timeline, and budget expectations
5. Define the engagement model that makes this project profitable for CMTG

---

## Part 1: Website Phase Closeout

### Status to Report to Client
- Site is live at ginete.co on Cloudflare Pages (fast, global CDN)
- 8 pages + 3 API routes (contact form, gated downloads, news aggregator)
- HTML email templates now active for all form submissions
- CMS Final Rules tracker page live
- 6 gated eBook guides generating leads

### Questions to Ask
- [ ] Are you receiving contact form submissions correctly?
- [ ] Have you downloaded any of the gated eBooks — did you receive the email?
- [ ] Is the CMS Rules tracker data current and accurate?
- [ ] Any copy changes or pages you'd like added before we close phase 1?
- [ ] Do you want Google Analytics / conversion tracking added?

### Potential Quick Wins (Phase 1 Extras)
- Google Analytics 4 + event tracking on form submissions and downloads
- Calendly embed on the contact page
- Blog/news section for thought leadership content
- Testimonials section on homepage

---

## Part 2: Compliance App — Discovery

### What Problem Are We Solving?
Ask the client to describe the problem in their own words first. Then probe:

- [ ] Who is the primary user? (health plan compliance officers, internal Ginete team, client organizations?)
- [ ] What does their current compliance tracking workflow look like today? (spreadsheets, manual, another tool?)
- [ ] What regulatory bodies are in scope? (CMS, DHCS, DMHC, NCQA, other?)
- [ ] Is this a tool Ginete uses internally, sells to clients as SaaS, or both?
- [ ] How many organizations/clients would use this at launch?
- [ ] What data sources need to feed into it? (regulatory databases, internal docs, audit results?)

### Core App Concept Hypotheses (validate with client)
Based on Ginete's domain, the compliance app likely involves one or more of:

| Concept | Description |
|---------|-------------|
| **Compliance Calendar** | Track regulatory deadlines, submission windows, audit dates by plan/client |
| **Regulation Tracker** | Monitor CMS/DHCS/DMHC rule changes and tie them to action items |
| **Audit Readiness Dashboard** | Document status (uploaded, reviewed, approved) per regulation/survey |
| **Gap Assessment Tool** | Questionnaire-driven gap analysis generating a prioritized action plan |
| **Client Portal** | Health plan clients log in to track their own compliance status |
| **Task & Workflow Manager** | Assign compliance tasks to team members with deadlines and approval steps |

Ask: *"If you could only build one of these first, which solves the most urgent problem?"*

### Scope Clarification Questions
- [ ] Should this be web-only, or mobile too?
- [ ] Multi-tenant (multiple health plan clients) or single-org?
- [ ] Role-based access? (admin, analyst, read-only reviewer?)
- [ ] Do clients need to upload documents?
- [ ] Does the app need to generate reports or exports (PDF, Excel)?
- [ ] Any existing tools we need to integrate with? (Salesforce, SharePoint, etc.)
- [ ] What does "done" look like in 6 months?

### Budget & Timeline Expectations
- [ ] Do you have a budget range in mind?
- [ ] Is there a hard deadline driving the timeline? (regulatory event, internal milestone?)
- [ ] Would you prefer fixed-price milestone billing or T&M?
- [ ] Do you want to be hands-on or hands-off during development?

---

## Part 3: Team Structure & Roles

### CMTG Team (proposed)

| Role | Person | Responsibilities |
|------|--------|-----------------|
| **Engagement Lead** | Chris Marsh | Client relationship, scope management, profitability |
| **Technical Lead / Architect** | TBD | System design, database schema, API architecture |
| **Full-Stack Developer** | TBD | Feature implementation (React/TypeScript + Supabase) |
| **UI/UX Designer** | TBD | Wireframes, component design, Figma handoff |
| **QA / Compliance SME** | TBD | Testing, verify regulatory accuracy of app logic |
| **DevOps** | Chris Marsh | Cloudflare Pages/Workers, Supabase, CI/CD, environments |

### Client-Side Team (identify in meeting)

| Role | Ask Client |
|------|-----------|
| **Executive Sponsor** | Who has final sign-off? |
| **Product Owner** | Who defines requirements and accepts deliverables? |
| **Subject Matter Expert** | Who can answer compliance domain questions quickly? |
| **IT Contact** | Who handles SSO, data security approvals, API access? |
| **End Users** | Can we schedule user interviews / feedback sessions? |

### Communication Cadence
- Weekly status call (30 min) — progress, blockers, decisions needed
- Bi-weekly demo — show working software, get feedback
- Slack/Teams channel for async questions
- Monthly billing + budget review

---

## Part 4: Making This Project Profitable

### Engagement Model Options

| Model | Pros | Cons | Best For |
|-------|------|------|----------|
| **Fixed-Price Milestones** | Predictable for client, forces scope clarity | CMTG absorbs overruns | Well-defined MVPs |
| **Time & Materials** | CMTG never loses money, transparent | Client anxiety about cost | Exploratory/evolving scope |
| **Retainer + Sprint** | Recurring revenue, predictable capacity | Requires ongoing value delivery | Long-term engagements |
| **SaaS Revenue Share** | High upside if product succeeds | Long payback period, shared risk | If Ginete is building a product to sell |

**Recommendation**: Fixed-price Phase 1 (MVP) to win trust, then move to monthly retainer for iterations.

### Milestone Structure (draft)

| Milestone | Deliverable | Suggested Price |
|-----------|-------------|-----------------|
| **M0 — Discovery & Design** | Requirements doc, wireframes, architecture plan | $5,000–8,000 |
| **M1 — MVP Backend** | Auth, data model, core API, admin dashboard | $12,000–18,000 |
| **M2 — MVP Frontend** | Full UI, compliance tracking core features | $12,000–18,000 |
| **M3 — Beta + UAT** | Testing, client feedback, bug fixes, deploy | $5,000–8,000 |
| **M4 — Launch + Handoff** | Production deploy, training, docs | $3,000–5,000 |
| **Ongoing Retainer** | Monthly support, iterations, hosting management | $2,000–4,000/mo |

*Adjust based on scope validated in meeting.*

### Profitability Levers
1. **Scope lock** — get a signed SOW before writing code. Change requests = change orders.
2. **Use CMTG stack** — Supabase + Cloudflare Pages = near-zero infra cost.
3. **Component reuse** — build a shared design system once (shadcn/ui base), reuse across client projects.
4. **Automate QA** — Playwright tests reduce manual QA time on every release.
5. **Recurring revenue** — hosting, maintenance retainer, and SLA coverage are high-margin.
6. **IP ownership** — CMTG retains rights to generic components; client owns their data and config.

### Signals This is a Good Engagement
- Client has budget authority (not waiting for approval)
- Clear executive sponsor identified
- Well-defined problem (not "build us an AI")
- Existing manual process to automate (Occam's razor for scope)
- Client is hands-on enough to give feedback but not micro-manage

### Red Flags to Watch For
- No internal champion at client org
- Scope described as "like Salesforce but for compliance"
- No budget range shared after direct ask
- "We just need something simple" with 47 requirements
- Decision-making by committee with no clear owner

---

## Part 5: Discovery Questions — Master List

Copy and bring to the meeting. Check off as you go.

### Business Context
- [ ] What is Ginete's primary revenue model today? (consulting hours, retainer, other?)
- [ ] Who are your target clients for the app? (health plans, hospitals, ACOs, other?)
- [ ] What geography? California-focused or national?
- [ ] What is the competitive landscape? (existing tools, why aren't clients using those?)
- [ ] What does success look like in 12 months for this app?

### Users & Workflow
- [ ] Walk me through how you handle a client compliance engagement today, step by step
- [ ] What takes the most time that shouldn't?
- [ ] What information do you track in spreadsheets that you wish was in a system?
- [ ] How many active client engagements do you run at once?
- [ ] What happens when a regulation changes — how does that propagate to clients?

### Technical Constraints
- [ ] Any data security requirements? (HIPAA BAA needed? SOC 2?)
- [ ] SSO requirement? (Google Workspace, Azure AD, Okta?)
- [ ] Any regulatory data sources you already have access to (APIs, feeds)?
- [ ] Existing software stack at client organizations we need to integrate with?

### Commercial
- [ ] Is this internal tooling or a product you'd sell/license to clients?
- [ ] If selling: what would you charge clients per month?
- [ ] What is your timeline pressure? Any external deadline?
- [ ] Have you budgeted for this? Ballpark range?
- [ ] Who else is involved in the buy decision?

---

## Next Steps After Meeting

1. **Within 24 hours**: Send meeting summary + decisions doc to client
2. **Within 48 hours**: Draft SOW v1 based on validated scope
3. **Within 1 week**: Deliver discovery milestone (wireframes + architecture outline) if M0 is agreed
4. **Immediate**: Open a project in GitHub (`ginete-compliance-app`) and set up Supabase project

---

*Document owner: Chris Marsh / CMTG — update after meeting with client answers and decisions*
