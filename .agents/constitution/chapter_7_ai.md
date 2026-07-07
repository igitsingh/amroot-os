# AmrootOS Constitution v1.0

## Chapter 7: AI Constitution

### 7.1 AI Agent Rules
1. **Subservience to the Constitution:** AI coding agents must read and strictly adhere to all chapters of the AmrootOS Constitution before initiating any significant architectural, intelligence, or data-modeling actions.
2. **Verification Over Generation:** AI agents must never hallucinate missing data, fabricate placeholders, or guess code logic. If a requirement is ambiguous or data is missing, the agent must pause and request explicit user confirmation. Truth > AI Creativity.
3. **No Hidden Logic:** AI agents must explicitly document complex inferences or assumptions within the code (via docstrings) or the database (via the audit trail).

### 7.2 Prompt Standards
1. **Explicit Context:** System prompts and task delegations must be highly explicit, contextualized, and unambiguous. 
2. **Mandatory Format Adherence:** Prompts must explicitly enforce the required data provenance standards. If asking an agent to process data, the prompt must explicitly reference the Evidence Model schema requirement to ensure compliance.

### 7.3 Coding Standards
1. **Data-Model First:** Agents must definitively model Prisma schemas and database relationships before attempting to draft React components, layouts, or API routes.
2. **TypeScript Strictness:** Strict typing is mandatory. Interfaces must perfectly mirror the database schema and Evidence Model constraints. The use of `any` types is strictly prohibited in production code.
3. **Component Isolation:** UI components must be rigorously modular, purely functional where possible, and strictly adhere to the UI/UX Principles outlined in Chapter 4 (High Data Density, Intelligence Palette).

### 7.4 Definition of Done
A feature or sprint is only "Done" when it meets all of the following criteria:
1. **Schema Locked:** The database schema is fully modeled, verified, and migrated.
2. **Evidence Model Enforced:** The Evidence Model is strictly implemented for all new critical data fields.
3. **Zero Fabricated Data:** Absolutely no fabricated, placeholder, or randomized data exists in the UI. Empty states have been correctly implemented.
4. **Auditability:** The feature has been tested to ensure that any modification logs a correct temporal version in the audit trail.

### 7.5 Sprint Methodology
1. **Bounded Execution:** Sprints must be independently implementable, manageable chunks of work that do not span multiple isolated domains simultaneously.
2. **Sequential Flow:** All sprints must strictly follow the architectural sequence: Architecture Blueprint → Database Schema & Entities → Backend Logic → Interface Integration.

### 7.6 Code Review Rules
1. **Constitutional Audit:** Before finalizing a task, AI agents must perform a self-review of their proposed code against the core tenets of the Constitution.
2. **Anti-CRUD Verification:** Code must be specifically audited for "Anti-CRUD" compliance, ensuring that new dashboards maximize data relationships (the 360° Rule) rather than simply reading isolated rows from a database table.
