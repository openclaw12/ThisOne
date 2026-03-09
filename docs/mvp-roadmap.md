# MVP Delivery Roadmap (12 Weeks)

## Week 1-2: Foundation
- Finalize requirements and system boundaries
- Confirm SOC 2 control catalog and policy templates
- Set up repository, CI checks, and deployment targets

## Week 3-4: Backend Core
- Implement auth and tenant isolation middleware
- Replace in-memory store with PostgreSQL repositories
- Add API validation and OpenAPI docs
- Add Stripe subscriptions + webhook handling

## Week 5-6: Policy Workflow
- Build onboarding questionnaire
- Build policy generation endpoint (LLM provider abstraction)
- Add policy versioning and acknowledgment workflow

## Week 7-8: Dashboard + Evidence
- Add evidence upload + S3 storage
- Add control-to-evidence mapping and stale-evidence rules
- Build compliance score calculator

## Week 9: AI + Reporting
- Add evidence gap analysis feature
- Build audit narrative generator
- Add control export and evidence package ZIP generation

## Week 10-11: Hardening
- QA, security checks, and tenant boundary testing
- Performance tuning and observability
- Production deployment, runbook, and legal docs

## Week 12: Beta Launch
- Onboard first beta customers
- Track setup completion and time-to-value
- Prioritize bug fixes and missing must-have features
