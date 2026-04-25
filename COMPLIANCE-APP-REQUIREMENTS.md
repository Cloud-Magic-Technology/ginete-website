# Ginete Compliance SaaS — Product Requirements Scaffold

**Status**: Pre-discovery — to be validated and completed at kickoff meeting 2026-04-26
**Product Owner**: Ginete Healthcare Consulting Group
**Builder**: Cloud Magic Technology Group
**Version**: 0.1 (draft)

---

## Product Summary

A multi-tenant SaaS platform that helps health plans track, manage, and demonstrate compliance with CMS, DHCS, DMHC, and NCQA regulations. Sold and marketed by Ginete Healthcare Consulting Group to their existing and prospective health plan client base.

**Elevator pitch** *(draft — validate with client)*:
> "Ginete Comply gives health plan compliance teams a single source of truth for every regulation, deadline, and document — so you're always audit-ready, not scrambling the week before."

---

## Users & Roles

| Role | Who | What They Need |
|------|-----|----------------|
| **Ginete Admin** | Ginete staff | See all tenants, seed regulation data, support clients |
| **Plan Admin** | Health plan CCO / VP Compliance | Org settings, user management, billing, full access |
| **Compliance Analyst** | Day-to-day compliance team | Create/update tasks, upload docs, track deadlines |
| **Reviewer** | Legal, medical director, board member | Read-only access, approve/sign off on items |
| **Auditor (external)** | Regulator or accreditation auditor | Time-limited, scoped read access to evidence packages |

---

## Core Features (MVP)

### 1. Multi-Tenant Onboarding
- Ginete admin creates a new organization (health plan)
- Plan Admin invited via email, sets up account
- Role-based access control from first login
- Stripe subscription activated at org creation

### 2. Regulation Library
- Global database of regulations seeded and maintained by Ginete
- Organized by regulator: CMS, DHCS, DMHC, NCQA
- Each regulation has: title, description, effective date, citation, category
- Ginete pushes updates when regulations change (push to all tenants)

### 3. Compliance Tracker
- Each organization has a copy of relevant regulations mapped to their plan type
- Status per regulation: Not Started / In Progress / Under Review / Compliant / Flagged
- Assignee, due date, notes, linked documents per regulation item
- Progress dashboard: % compliant by regulator, by category

### 4. Compliance Calendar
- Regulatory deadline calendar: submission windows, audit dates, renewal dates
- Deadline types: CMS annual, DHCS reporting, DMHC survey, NCQA accreditation
- Email alerts: 30-day, 7-day, 1-day reminders
- iCal export for personal calendar sync

### 5. Task Management
- Tasks linked to specific compliance items or deadlines
- Assigned to a user, due date, priority, status
- Comment thread per task
- Email notification on assignment and status change
- Bulk assign tasks from a gap assessment

### 6. Document Vault
- Upload policy documents, attestations, evidence files
- Linked to compliance items (this document satisfies this regulation)
- Version history (keep prior versions, surface current)
- File types: PDF, DOCX, XLSX, images
- Download all docs for an audit as a ZIP package

### 7. Gap Assessment Tool
- Questionnaire-driven: "Does your plan have X policy?" Yes / No / Partial
- Auto-generates action items from "No" or "Partial" responses
- Assigns recommended remediation steps (seeded by Ginete expertise)
- Produces a PDF gap report

### 8. Reporting & Exports
- Compliance status report: snapshot of all items, status, assignees
- Deadline calendar export (PDF)
- Evidence package: selected docs bundled for regulator submission
- Board-ready summary: high-level compliance score, open items, critical deadlines

### 9. Ginete Admin Panel
- Super-admin view of all tenant organizations
- Health of each org: last login, % compliance items complete, overdue tasks
- Regulation library management: add, edit, publish updates to all tenants
- Support tools: impersonate org (with audit log), reset passwords, manage billing

### 10. Billing & Subscriptions (Stripe)
- Plans tied to organization size or feature tier (TBD with client)
- Stripe Customer Portal: health plan admins manage their own subscription/invoices
- Trial period for pilot clients
- Dunning: payment failure → grace period → access restriction

---

## Phase 2 Features (Post-MVP)

| Feature | Description |
|---------|-------------|
| **AI Compliance Assistant** | Chat interface: "What does this CMS rule require of my plan?" — RAG over regulation library |
| **Regulation Change Alerts** | Auto-detect when CMS/DHCS publish rule changes, notify affected tenants |
| **SSO / SAML** | Enterprise SSO via Clerk (Azure AD, Okta, Google Workspace) |
| **API Access** | Webhook + REST API for health plans to integrate with their existing tools |
| **Workflow Approvals** | Multi-step approval chains (analyst → director → CCO sign-off) |
| **Audit Mode** | Time-limited external auditor access to a read-only evidence view |
| **Mobile App** | Native iOS/Android for on-the-go task management |
| **CMS API Integration** | Pull deadline data directly from CMS data feeds |

---

## Non-Functional Requirements

### Security
- HTTPS everywhere, TLS 1.2+
- Passwords: bcrypt via Supabase Auth
- All data encrypted at rest (Supabase AES-256)
- Row Level Security: users can never access another organization's data
- Audit log: immutable record of every data access, creation, modification
- Session timeout: configurable, default 8 hours idle

### HIPAA (if PHI is confirmed in scope)
- BAA executed with: Supabase, Cloudflare, Resend before go-live
- PHI fields identified and documented
- Access logs reviewed quarterly
- Incident response plan documented
- Employee training records (Ginete staff who can access data)

### Performance
- Page load: <2s on standard broadband
- API response: <500ms p95
- Document upload: support up to 50MB per file
- Concurrent users: support 50 concurrent per tenant at MVP

### Availability
- Target: 99.5% uptime (Supabase + Cloudflare provide this at their infrastructure level)
- Planned maintenance window: Sundays 2–4am PT
- Status page: hosted on statuspage.io or similar

### Data & Privacy
- Data residency: US-only (Supabase US region, Cloudflare US edge)
- Data retention: configurable per org, default 7 years (regulatory standard)
- Account deletion: full data purge within 30 days of cancellation
- Export: org admin can export all their data at any time

---

## Technical Architecture

### Stack
```
Frontend:     React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
Backend:      Supabase (PostgreSQL + RLS + Auth + Storage + Edge Functions)
Billing:      Stripe Billing + Stripe Customer Portal
Email:        Resend (transactional notifications)
Hosting:      Cloudflare Pages (frontend) + Supabase cloud (backend)
CI/CD:        GitHub Actions → Cloudflare Pages auto-deploy
Monitoring:   Splunk HEC (CMTG standard)
Error track:  Sentry
```

### Multi-Tenancy Architecture
```sql
-- Every table that contains tenant data has org_id
-- Row Level Security enforces isolation at the DB layer

CREATE POLICY "users_own_org" ON compliance_items
  USING (org_id = (SELECT org_id FROM users WHERE id = auth.uid()));

-- Ginete admin bypasses RLS via service_role key (never exposed to frontend)
```

### Repository Structure (draft)
```
ginete-compliance-app/
├── apps/
│   ├── web/                    # React frontend (Cloudflare Pages)
│   └── admin/                  # Ginete internal admin panel
├── packages/
│   ├── ui/                     # Shared shadcn/ui component library
│   ├── db/                     # Supabase types, migrations, seeds
│   └── emails/                 # Resend email templates
├── supabase/
│   ├── migrations/             # SQL migrations (version controlled)
│   ├── seed.sql                # Regulation library seed data
│   └── functions/              # Edge functions (Stripe webhooks, etc.)
└── .github/
    └── workflows/              # CI/CD pipelines
```

### Database Schema (draft)

```sql
-- Core tables

organizations (
  id uuid PRIMARY KEY,
  name text,
  plan_type text,           -- 'medicaid', 'medicare_advantage', 'commercial', 'mixed'
  state text,
  member_count int,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text, -- 'trialing', 'active', 'past_due', 'canceled'
  created_at timestamptz
)

users (
  id uuid PRIMARY KEY,      -- matches Supabase auth.users.id
  org_id uuid REFERENCES organizations,
  email text,
  full_name text,
  role text,                -- 'ginete_admin', 'plan_admin', 'analyst', 'reviewer'
  created_at timestamptz
)

regulations (
  id uuid PRIMARY KEY,
  regulator text,           -- 'CMS', 'DHCS', 'DMHC', 'NCQA'
  title text,
  description text,
  citation text,
  category text,
  effective_date date,
  applicable_plan_types text[],  -- which plan types this applies to
  is_active boolean,
  created_at timestamptz,
  updated_at timestamptz
)

compliance_items (
  id uuid PRIMARY KEY,
  org_id uuid REFERENCES organizations,  -- RLS key
  regulation_id uuid REFERENCES regulations,
  status text,              -- 'not_started', 'in_progress', 'under_review', 'compliant', 'flagged'
  assignee_id uuid REFERENCES users,
  due_date date,
  notes text,
  updated_at timestamptz
)

tasks (
  id uuid PRIMARY KEY,
  org_id uuid REFERENCES organizations,
  compliance_item_id uuid REFERENCES compliance_items,
  title text,
  description text,
  assignee_id uuid REFERENCES users,
  due_date date,
  priority text,            -- 'low', 'medium', 'high', 'critical'
  status text,              -- 'open', 'in_progress', 'done'
  created_by uuid REFERENCES users,
  created_at timestamptz
)

documents (
  id uuid PRIMARY KEY,
  org_id uuid REFERENCES organizations,
  compliance_item_id uuid REFERENCES compliance_items,
  filename text,
  storage_path text,        -- Supabase Storage path
  file_size_bytes int,
  uploaded_by uuid REFERENCES users,
  version int,
  is_current boolean,
  created_at timestamptz
)

deadlines (
  id uuid PRIMARY KEY,
  org_id uuid REFERENCES organizations,
  regulation_id uuid REFERENCES regulations,
  title text,
  deadline_date date,
  type text,                -- 'submission', 'audit', 'renewal', 'reporting'
  notes text
)

audit_logs (
  id bigserial PRIMARY KEY,
  org_id uuid,
  user_id uuid,
  action text,              -- 'read', 'create', 'update', 'delete', 'login', 'export'
  resource_type text,
  resource_id uuid,
  metadata jsonb,
  created_at timestamptz
)
```

---

## Success Metrics

### Product KPIs (6 months post-launch)
- 3+ health plan organizations on paid subscriptions
- ≥ $3,000 MRR
- Average user session ≥ 10 minutes (indicates real usage, not vanity logins)
- ≥ 80% of compliance items per org have an assignee and due date set
- Net Promoter Score ≥ 40

### CMTG Engagement KPIs
- M0 signed within 1 week of kickoff
- MVP launched within 18 weeks of M0 kickoff
- Retainer active by week 20
- Zero scope creep without signed change order

---

## Open Questions (to resolve at meeting)

| # | Question | Urgency |
|---|---------|---------|
| 1 | Product name / brand | High — needed for domain, repo, identity |
| 2 | PHI in scope? HIPAA BAA required? | High — blocks architecture decisions |
| 3 | Which pilot health plans? | High — shapes MVP scope |
| 4 | Pricing model (per seat / per org / tiered)? | High — needed for Stripe setup |
| 5 | SSO required by target clients? | Medium — affects auth architecture |
| 6 | SOC 2 requirement from any prospect? | Medium — affects timeline and cost |
| 7 | California-only launch or national? | Medium — affects regulation seeding scope |
| 8 | Consulting bundle with subscription? | Medium — affects packaging and pricing |
| 9 | Revenue share vs. build-to-own? | Medium — affects contract structure |
| 10 | Ginete staff who will be product owners? | Medium — needed to start M0 |

---

*To be updated after kickoff meeting with validated answers. Owner: Chris Marsh / CMTG*
