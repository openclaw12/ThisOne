export type UUID = string;

export type ControlStatus = 'not-started' | 'in-progress' | 'satisfied';
export type EvidenceStatus = 'pending' | 'approved' | 'archived';

export interface Company {
  id: UUID;
  name: string;
  industry: string;
  size: number;
  dataTypes: string[];
  targetAuditDate?: string;
}

export interface Policy {
  id: UUID;
  companyId: UUID;
  policyType: string;
  title: string;
  content: string;
  version: number;
  status: 'draft' | 'active' | 'archived';
}

export interface Control {
  id: UUID;
  companyId: UUID;
  controlId: string;
  title: string;
  trustCriteria: 'CC' | 'C' | 'I' | 'A' | 'R';
  status: ControlStatus;
}

export interface Evidence {
  id: UUID;
  companyId: UUID;
  controlId: UUID;
  title: string;
  evidenceType: 'file' | 'integration' | 'manual';
  status: EvidenceStatus;
}
