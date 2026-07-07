# AmrootOS Data Integrity & Verification Policy

**This is a non-negotiable policy for all intelligence and data within AmrootOS.**

## 1. Never Invent Data
- Do not hallucinate information, guess missing values, or estimate facts.
- Do not create fictional suppliers, brands, products, people, pricing, reviews, or lab reports.
- If information is unverified, mark it as: Unknown, Not Publicly Available, Verification Pending, or Requires Manual Verification.

## 2. Source Verification & Metadata
Every data point/record must be auditable with the following metadata:
- **Source**: The name of the source.
- **Source URL**: Link to the original source.
- **Source Type**: Official, Third-Party, etc.
- **Date Collected**: ISO 8601 timestamp.
- **Date Last Verified**: ISO 8601 timestamp.
- **Confidence Score**: 100% (Official), 95% (Official + Secondary), 85% (Multiple 3rd Party), 60% (Single 3rd Party), 25% (Inference), 0% (Unknown).
- **Verification Status**: Verified, Conflict Detected, Requires Manual Review, etc.

## 3. Source Priority
1. **Tier 1 (Highest)**: Official company websites, government databases, official certifications/lab reports.
2. **Tier 2**: Official marketplace stores, LinkedIn, social media, press releases.
3. **Tier 3**: Distributor websites, industry associations, public filings.
4. **Tier 4 (Lowest)**: Customer reviews, blogs, forums. (Must never override Tier 1/2).

## 4. Cross Verification & Conflicts
- Verify every important fact (Curcumin claim, Pricing, Certifications) using at least two independent public sources.
- If two sources disagree: Store both values and explicitly flag "Conflict Detected" and "Require Manual Review".

## 5. Change History
- **Never overwrite information.**
- When a competitor or supplier changes a field (Packaging, Price, Website, Claims, etc.), create a **new dated version** of the record. 
- AmrootOS must preserve historical intelligence forever.

## 6. Golden Rule
- Accuracy > Completeness
- Verification > Speed
- Evidence > Assumptions
- Truth > AI Creativity
- Every record must be defensible, traceable, and backed by verifiable evidence. If a fact cannot be verified, explicitly say so rather than inventing an answer.

---

# ZERO FABRICATED DATA POLICY (CRITICAL SYSTEM RULE)

## ABSOLUTELY NO RANDOM DATA
Never generate fake values simply to make the UI appear complete.
This includes: Notification counts, Tasks, KPIs, Progress bars, Charts, Activity feeds, etc.
NO RANDOM PLACEHOLDER VALUES. NO MADE-UP METRICS.

## EVERY NUMBER MUST HAVE A SOURCE
Every visible number on the screen must be traceable to a real database record.
If there is no data, display "0" or an empty state. Never invent a number.

## EMPTY STATES
When no data exists, design beautiful empty states (e.g. "No suppliers have been added yet.").
Never replace empty states with fabricated content.

## PROVENANCE
Every record should internally maintain: Source, Date Created, Created By, Last Updated, Verification Status.
Any fabricated value is considered a software bug. Truth over aesthetics.

---

# AMROOT OS CONSTITUTION
All AI agents MUST read and strictly adhere to the permanent constitutional rules located in the `.agents/constitution/` directory before taking any significant action. These chapters dictate the entire engineering, philosophy, and architectural paradigm for AmrootOS.

Current Chapters:
- [Chapter 1: Philosophy & Mission](file:///Users/isachinsingh/Desktop/AMROOTOS/.agents/constitution/chapter_1_philosophy.md)
- [Chapter 2: Engineering Constitution](file:///Users/isachinsingh/Desktop/AMROOTOS/.agents/constitution/chapter_2_engineering.md)
- [Chapter 3: Research Constitution](file:///Users/isachinsingh/Desktop/AMROOTOS/.agents/constitution/chapter_3_research.md)
- [Chapter 4: Product Constitution](file:///Users/isachinsingh/Desktop/AMROOTOS/.agents/constitution/chapter_4_product.md)
- [Chapter 5: Intelligence Constitution](file:///Users/isachinsingh/Desktop/AMROOTOS/.agents/constitution/chapter_5_intelligence.md)
- [Chapter 6: Operations Constitution](file:///Users/isachinsingh/Desktop/AMROOTOS/.agents/constitution/chapter_6_operations.md)
- [Chapter 7: AI Constitution](file:///Users/isachinsingh/Desktop/AMROOTOS/.agents/constitution/chapter_7_ai.md)
- [Chapter 8: Amroot Organics Constitution](file:///Users/isachinsingh/Desktop/AMROOTOS/.agents/constitution/chapter_8_paradise.md)
