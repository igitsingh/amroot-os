# AmrootOS Constitution v1.0

## Chapter 9: Design System Constitution

### 9.1 Core Philosophy
AmrootOS is an Intelligence Operating System. It must feel like an AI-native analyst workbench (akin to Claude, Cursor, Linear, or Stripe), not a traditional ERP or CRUD application.
- **Minimalism over decoration:** Whitespace is preferred over clutter.
- **Typography over color:** Information hierarchy is established through excellent typography (modern Google Fonts like Inter or Geist), not excessive coloring.
- **Search-First:** Navigation is driven by a global command palette/search, not a massive sidebar tree.
- **Evidence is paramount:** Visuals exist to support the evidence, never to distract from it.

### 9.2 Grid, Spacing, and Layout
1. **The Workbench Layout:** Interfaces should maximize screen real estate for data density while maintaining readability.
2. **Spacing:** Use a strict 4px/8px baseline grid.
3. **Empty States:** Empty states must be elegantly designed. Never use fabricated placeholder data to "fill up" a page. Provide clear actions for the Research Engine to fill the gaps.

### 9.3 Typography & Color
1. **Color Palette:** Grayscale-dominant with highly selective semantic colors (e.g., Green for Verified, Amber for Conflict/Manual Review, Red for Invalidated). Backgrounds should support sleek dark modes or clean light modes.
2. **Typography:** Use sans-serif fonts optimized for high-density data interfaces. Numbers must use tabular figures (`tnum`) for alignment in tables and metrics.

### 9.4 Components & Evidence Presentation
1. **The Intelligence Panel:** Every entity (Supplier, Product, Competitor) uses a standardized workspace layout (Overview, Relationships, Evidence, Documents, Timeline, AI Summary).
2. **Evidence Cards:** Every metric or claim must expose its source, confidence score, verification status, and collection date via hover or secondary click. Provenance is never hidden.
3. **The Global Timeline:** History must be visually represented as an immutable vertical timeline (e.g., Created → Certificate Added → Pricing Updated).

### 9.5 AI Interaction Patterns
1. **Contextual AI:** AI features must feel embedded into the workspace, not bolted on.
2. **No Hallucination UI:** If the AI summarizes a supplier or generates risks/opportunities, it must cite the specific AmrootOS evidence used. The UI must render these citations as clickable links to the underlying Knowledge Graph node or Document.

### 9.6 Search Behavior
1. **Universal Command Center:** `Cmd+K` / `Ctrl+K` must instantly open global search spanning Brands, Products, Documents, Research Jobs, Labs, and Countries.
2. **Instant Navigation:** Selecting a search result immediately opens its corresponding Entity Intelligence Workspace.
