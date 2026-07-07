# AmrootOS Constitution v1.0

## Chapter 2: Engineering Constitution

### 2.1 Engineering Principles
1. **Data-Model First:** Development never begins with the user interface. No UI components or routes are written until the underlying database schema, entity relationships, and evidence constraints are rigorously modeled and verified. The database dictates the screen.
2. **Truth Over Code:** A brittle, unoptimized feature built on verified truth is infinitely superior to perfectly optimized code presenting fabricated data. Engineering serves intelligence.
3. **Immutability of Intelligence:** Code can be refactored and deleted; intelligence cannot. Engineering must protect the data layer at all costs, ensuring that no historical intelligence is ever lost to an ill-conceived update or migration.

### 2.2 Architecture Rules
1. **The Anti-CRUD Architecture:** AmrootOS is an intelligence engine, not a standard web app. Standard "Create, Read, Update, Delete" flows are insufficient. Every data mutation must be treated as an "Intelligence Event" that cascades through the network (e.g., updating a supplier's certification status must automatically flag related products).
2. **The 360° Rule:** Every primary entity page must be architected to query and aggregate all connected nodes. Data must never be siloed. If a user views a Product, the architecture must eagerly fetch the connected Lab Reports, Packaging, Competitor Pricing, and active Tasks.
3. **Strict Separation of Domains:** Internal Operations (e.g., Amroot Team Tasks) and External Intelligence (e.g., Competitor Tracking) must remain cleanly separated in the application logic, but deeply connected in the relational database.

### 2.3 Database & Knowledge Graph Standards
1. **Relational Rigor:** The system uses PostgreSQL and Prisma to enforce strict, unyielding data integrity. Orphaned records and broken foreign keys are considered critical system failures.
2. **Knowledge Graph Methodology:** The relational database must be queried like a knowledge graph. Competitors, Suppliers, and Importers are not isolated text fields; they are first-class nodes. Queries must traverse depth (e.g., Brand → Product → Sourced From → Supplier → Holds → Certification).
3. **No Destructive Operations:** Hard deletes are prohibited for intelligence records. Entities are archived or superseded by newer temporal versions.

### 2.4 The Evidence Model
Every critical data point (Pricing, Ingredient Claims, Certifications) must implement the uniform Evidence Model. A field is not a primitive value; it is a complex audited object containing:
*   `value`: The actual data.
*   `source_name` & `source_url`: The exact origin of the intelligence.
*   `source_type`: Tiered classification (Official, Third-Party, etc.).
*   `date_collected` & `date_last_verified`: Timestamps for freshness.
*   `confidence_score`: A calculated metric of reliability.
*   `verification_status`: State tracking (e.g., Verified, Conflict Detected).
*   `supporting_document_ids`: Links to the Document Vault.

### 2.5 Zero Fabricated Data Policy
1. **No Placeholders:** Never invent metrics, progress bars, notification counts, or charts simply to make the UI look complete or aesthetically pleasing. 
2. **Every Number Auditable:** Every visible number on a dashboard must be traceable to a real, verifiable database record.
3. **Elegant Empty States:** When no data exists, the system must not guess. It must gracefully display an explicitly designed empty state (e.g., "No laboratory reports found").

### 2.6 Versioning & Audit Trails
1. **Historical Preservation:** Updates to critical intelligence (e.g., a competitor changing their formulation or a supplier losing a certification) must **never** overwrite the old data.
2. **Temporal States:** Changes must create a new temporal version in the audit trail, preserving the historical record forever.
3. **Provenance:** Every modification must meticulously log the actor (User or AI Agent), the timestamp, and the justification or new source of truth.

### 2.7 The Five Purposes Rule
To prevent AmrootOS from degrading into a generic ERP, every new feature must answer one strict question: **"Does this create, verify, enrich, connect, or use knowledge?"**

If a proposed feature, page, or database model does not fit one of those five purposes, it must be rejected or deferred to a later operational phase. Engineering must protect the system's core identity as an intelligence platform.

### 2.8 The No Orphan Feature Rule
Every feature, entity, and page must be structurally connected to the broader Knowledge Graph. There are no isolated modules.

To pass this rule, a feature must satisfy ALL of these constraints:
1. It creates, verifies, enriches, connects, or uses knowledge.
2. It must be connected to at least one (ideally many) existing entities.

**Example:** A `Supplier` must structurally connect to `Manufacturer`, `Product`, `Sample`, `Laboratory`, `Country`, `Importer`, `Research Job`, `Documents`, and `Certifications`. 

If an entity exists in a vacuum, it is an orphan and violates the architectural integrity of AmrootOS. No orphan entities. No orphan pages. No orphan features.
