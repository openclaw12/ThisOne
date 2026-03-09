# SOC 2 Compliance Automation SaaS (MVP Foundation)

This repository contains an MVP foundation for a SOC 2 compliance automation platform targeted at SaaS and SMB teams.

## What is included

- **Backend API scaffold** in Node.js + TypeScript + Express.
- **Initial PostgreSQL schema** covering companies, users, policies, controls, evidence, integrations, and tasks.
- **SOC 2 domain seed data definitions** for common controls and policy templates.
- **Implementation roadmap docs** aligned to a 12-week launch timeline.

## Quick start

```bash
npm install
npm run dev
```

The server runs on `http://localhost:3000` and exposes:

- `GET /health`
- `GET /api/companies/:companyId/dashboard`
- Core CRUD stubs for companies, policies, controls, evidence, integrations

## Project structure

- `src/` - TypeScript backend API
- `db/schema.sql` - PostgreSQL schema
- `db/seeds/` - Seed SQL for controls and policy templates
- `docs/` - Product and execution documentation

## Notes

This is an MVP foundation, not a finished production system. It is intentionally structured so the next steps are implementation of:

1. persistent data layer,
2. auth/multi-tenant middleware,
3. integrations (GitHub/AWS/Okta/Slack),
4. policy generation and evidence analysis workflows.
