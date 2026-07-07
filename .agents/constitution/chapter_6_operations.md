# AmrootOS Constitution v1.0

## Chapter 6: Operations Constitution

### 6.1 Document Management (The Vault)
1. **The Central Vault:** All internal and external documents (Non-Disclosure Agreements, Certificates of Analysis, supplier contracts, lab results) must reside securely in the central Document Vault.
2. **Bi-Directional Linking:** A document must never be orphaned. Every uploaded document must be explicitly linked to the relevant entity (Supplier, Product, Importer, or Task) it validates. Documents are proof, and proof must be connected to claims.
3. **Immutable Document Versioning:** If a supplier issues a revised COA or a new contract is signed, the old document is never deleted. The new version is appended to the entity's history, ensuring a perfect audit trail of compliance over time.

### 6.2 Tasks & Meetings
1. **Intelligence-Driven Tasks:** Tasks in AmrootOS are not mere text strings; they are operational reactions to intelligence events. For example, if a `CONFLICT DETECTED` flag is raised on a competitor's pricing, the system should automatically spawn an investigation task.
2. **Contextual Meeting Records:** Institutional memory is critical. Meeting notes must be linked directly to the Importer, Supplier, or Internal Team being discussed. A user reviewing an Importer should immediately see the notes from all historical negotiations.

### 6.3 Samples
1. **Physical to Digital Bridging:** Physical raw material samples form the basis of our product quality. They must be rigidly tracked digitally.
2. **Traceability:** Every sample logged in the OS must link its unique ID back to the specific Supplier that provided it, the resulting Lab Report that tested it, and the internal Amroot Product formulation it may be used in.

### 6.4 Shipments
1. **Supply Chain Illumination:** Tracking shipments is required to verify importer volume and supplier relationships.
2. **Granular Freight Data:** The OS must track Bills of Lading, HS Codes, exact weights, and arrival dates to build an accurate, empirical model of how raw materials are moving across the globe.

### 6.5 Compliance
1. **Automated Expiry Tracking:** Certifications (e.g., USDA Organic, ISO, GMP, FDA registrations) are temporal. They must have explicit expiry dates.
2. **Proactive Flagging:** The system must proactively flag compliance risks *before* they expire. If a Amroot Supplier's organic certification is 30 days from expiring, an operational task must be generated to request the renewed certificate.
