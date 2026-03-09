import { Router } from 'express';
import { z } from 'zod';
import { store } from '../services/store.js';

const companySchema = z.object({
  name: z.string().min(2),
  industry: z.string().min(2),
  size: z.number().int().positive(),
  dataTypes: z.array(z.string()).default([]),
  targetAuditDate: z.string().optional()
});

const policySchema = z.object({
  policyType: z.string(),
  title: z.string(),
  content: z.string(),
  version: z.number().int().min(1),
  status: z.enum(['draft', 'active', 'archived'])
});

const controlSchema = z.object({
  controlId: z.string(),
  title: z.string(),
  trustCriteria: z.enum(['CC', 'C', 'I', 'A', 'R']),
  status: z.enum(['not-started', 'in-progress', 'satisfied'])
});

const evidenceSchema = z.object({
  controlId: z.string(),
  title: z.string(),
  evidenceType: z.enum(['file', 'integration', 'manual']),
  status: z.enum(['pending', 'approved', 'archived'])
});

export const apiRouter = Router();

apiRouter.post('/companies', (req, res) => {
  const parsed = companySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  return res.status(201).json(store.createCompany(parsed.data));
});

apiRouter.get('/companies', (_req, res) => res.json(store.listCompanies()));

apiRouter.get('/companies/:companyId', (req, res) => {
  const company = store.getCompany(req.params.companyId);
  if (!company) return res.status(404).json({ error: 'Company not found' });
  return res.json(company);
});

apiRouter.get('/companies/:companyId/policies', (req, res) => res.json(store.listPolicies(req.params.companyId)));

apiRouter.post('/companies/:companyId/policies', (req, res) => {
  const parsed = policySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  return res.status(201).json(store.createPolicy({ ...parsed.data, companyId: req.params.companyId }));
});

apiRouter.get('/companies/:companyId/controls', (req, res) => res.json(store.listControls(req.params.companyId)));

apiRouter.post('/companies/:companyId/controls', (req, res) => {
  const parsed = controlSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  return res.status(201).json(store.createControl({ ...parsed.data, companyId: req.params.companyId }));
});

apiRouter.put('/companies/:companyId/controls/:controlId', (req, res) => {
  const status = z.enum(['not-started', 'in-progress', 'satisfied']).safeParse(req.body?.status);
  if (!status.success) return res.status(400).json({ error: status.error.flatten() });

  const updated = store.updateControlStatus(req.params.companyId, req.params.controlId, status.data);
  if (!updated) return res.status(404).json({ error: 'Control not found' });
  return res.json(updated);
});

apiRouter.get('/companies/:companyId/evidence', (req, res) => res.json(store.listEvidence(req.params.companyId)));

apiRouter.post('/companies/:companyId/evidence', (req, res) => {
  const parsed = evidenceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  return res.status(201).json(store.createEvidence({ ...parsed.data, companyId: req.params.companyId }));
});

apiRouter.get('/companies/:companyId/dashboard', (req, res) => {
  const controls = store.listControls(req.params.companyId);
  const total = controls.length;
  const satisfied = controls.filter((c) => c.status === 'satisfied').length;
  const inProgress = controls.filter((c) => c.status === 'in-progress').length;
  const notStarted = controls.filter((c) => c.status === 'not-started').length;

  const score = total === 0 ? 0 : Math.round((satisfied / total) * 100);

  return res.json({
    controlSummary: { total, satisfied, inProgress, notStarted },
    complianceScore: score,
    evidenceCount: store.listEvidence(req.params.companyId).length,
    policyCount: store.listPolicies(req.params.companyId).length
  });
});
