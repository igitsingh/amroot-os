# AmrootOS Constitution v1.0

## Chapter 4: Product Constitution

### 4.1 AI-Native User Experience Principle (Non-Negotiable)
1. **AmrootOS shall be designed as an AI-native operating system** rather than a traditional enterprise application like SAP, Salesforce, or Zoho.
2. **Clarity over Structure:** The UI must prioritize clarity, speed, and decision-making over exposing raw database structures.
3. **Decoupled Architecture:** The backend architecture, database schema, evidence engine, and knowledge graph are the source of truth. The UI is a presentation layer only. UI redesigns must never require changes to the data model.
4. **Universal Accessibility:** Every screen must be capable of being replaced by another interface (desktop, mobile, AI chat, voice, API) without altering the underlying business logic. The same data must be accessible through dashboards, AI conversations, search, and reports.
5. **Data Integrity Above All:** No UI decision may compromise data integrity, auditability, or evidence tracking.

### 4.2 UI/UX Aesthetics
1. **Inspiration:** The OS must draw inspiration from modern AI-native products (ChatGPT, Claude, Perplexity, Cursor, Linear, Raycast, Notion Calendar, Stripe Dashboard).
2. **Extremely Clean:** Few colors, lots of whitespace, excellent typography, minimal chrome. Avoid massive ERP sidebars in favor of contextual search and focused navigation (e.g., Search, AI, Today, Knowledge, Operations).
3. **Conversational First:** Instead of presenting users with massive data tables and filters, present an AI intelligence layer ("What would you like to know?") supported by contextual suggestions.

### 4.3 Interaction Principles
1. **Search-First & Keyboard-First:** The primary method of navigation and discovery should be through intelligent search (⌘K) and AI commands, not hunting through nested menus.
2. **Contextual Actions:** Actions must be contextual to the data being viewed. Avoid huge static menus.
3. **Interconnected Navigation:** When the AI assembles an answer (e.g., "Show all Lakadong suppliers above 9% curcumin"), it must seamlessly link the Suppliers, Lab reports, Prices, and Documents from the backend without forcing the user to load separate modules.

### 4.4 Accessibility & Performance
1. **Semantic and Structural Rigor:** The application must strictly adhere to web accessibility standards.
2. **Instant Intelligence:** Dashboards and AI responses must load rapidly. Data fetching must be rigorously optimized.
3. **Core Web Vitals:** Strict adherence to LCP, INP, and CLS thresholds. The UI must never block the main thread when rendering intelligence.
