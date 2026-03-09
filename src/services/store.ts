import { randomUUID } from 'node:crypto';
import type { Company, Control, ControlStatus, Evidence, Policy, UUID } from '../types.js';

const companies: Company[] = [];
const policies: Policy[] = [];
const controls: Control[] = [];
const evidence: Evidence[] = [];

export const store = {
  createCompany(input: Omit<Company, 'id'>): Company {
    const company: Company = { id: randomUUID(), ...input };
    companies.push(company);
    return company;
  },
  listCompanies(): Company[] {
    return companies;
  },
  getCompany(companyId: UUID): Company | undefined {
    return companies.find((c) => c.id === companyId);
  },
  createPolicy(input: Omit<Policy, 'id'>): Policy {
    const policy: Policy = { id: randomUUID(), ...input };
    policies.push(policy);
    return policy;
  },
  listPolicies(companyId: UUID): Policy[] {
    return policies.filter((p) => p.companyId === companyId);
  },
  createControl(input: Omit<Control, 'id'>): Control {
    const control: Control = { id: randomUUID(), ...input };
    controls.push(control);
    return control;
  },
  listControls(companyId: UUID): Control[] {
    return controls.filter((c) => c.companyId === companyId);
  },
  updateControlStatus(companyId: UUID, controlId: UUID, status: ControlStatus): Control | undefined {
    const control = controls.find((c) => c.companyId === companyId && c.id === controlId);
    if (!control) {
      return undefined;
    }
    control.status = status;
    return control;
  },
  createEvidence(input: Omit<Evidence, 'id'>): Evidence {
    const item: Evidence = { id: randomUUID(), ...input };
    evidence.push(item);
    return item;
  },
  listEvidence(companyId: UUID): Evidence[] {
    return evidence.filter((e) => e.companyId === companyId);
  }
};
