# API Overview

This MVP includes API scaffolding for major entities required in SOC 2 preparation workflows.

## Implemented routes

- `POST /api/companies`
- `GET /api/companies`
- `GET /api/companies/:companyId`
- `GET /api/companies/:companyId/policies`
- `POST /api/companies/:companyId/policies`
- `GET /api/companies/:companyId/controls`
- `POST /api/companies/:companyId/controls`
- `PUT /api/companies/:companyId/controls/:controlId`
- `GET /api/companies/:companyId/evidence`
- `POST /api/companies/:companyId/evidence`
- `GET /api/companies/:companyId/dashboard`

## Planned next routes

- Auth: signup/login/logout
- Integrations: create, list, sync, disconnect
- Export: audit package and control-testing report
- AI: policy generation, evidence gap analysis, audit narrative
