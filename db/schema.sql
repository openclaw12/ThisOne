CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(120) NOT NULL,
  size INT NOT NULL,
  data_types JSONB NOT NULL DEFAULT '[]'::jsonb,
  target_audit_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  email VARCHAR(320) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user', 'auditor')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  policy_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  version INT NOT NULL DEFAULT 1,
  status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'active', 'archived')),
  last_reviewed_at TIMESTAMP,
  next_review_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE policy_acknowledgments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  acknowledged_at TIMESTAMP NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(64)
);

CREATE TABLE controls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  control_id VARCHAR(30) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  trust_criteria VARCHAR(3) NOT NULL CHECK (trust_criteria IN ('CC', 'C', 'I', 'A', 'R')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('not-started', 'in-progress', 'satisfied')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(company_id, control_id)
);

CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  control_id UUID NOT NULL REFERENCES controls(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  evidence_type VARCHAR(20) NOT NULL CHECK (evidence_type IN ('file', 'integration', 'manual')),
  file_url TEXT,
  integration_type VARCHAR(40),
  integration_data JSONB,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'approved', 'archived')),
  uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  integration_type VARCHAR(40) NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  scope JSONB,
  last_synced_at TIMESTAMP,
  status VARCHAR(20) NOT NULL CHECK (status IN ('connected', 'disconnected', 'error')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(company_id, integration_type)
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  due_date DATE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('open', 'in-progress', 'completed')),
  priority INT NOT NULL DEFAULT 3,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
