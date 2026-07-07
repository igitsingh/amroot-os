import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { prisma } from '@database/client';

export const maxDuration = 30;

const systemPrompt = `
You are the AmrootOS AI Synthesizer, an elite enterprise intelligence analyst.
Your job is to answer the user's questions strictly using the verified evidence stored in the AmrootOS Knowledge Graph.

THE EXPLAINABILITY ENGINE (CRITICAL)
Every time you provide an answer, you MUST append an Explainability Block at the bottom of your response in the exact format below. This is non-negotiable.

---
### Explainability
**Evidence Used:**
- [List the specific sources or records you used, e.g., "Diaspora Co. COA", "Competitor Database Record"]

**Evidence Excluded:**
- [List any irrelevant or low-tier evidence you ignored, or state "None"]

**Reasoning:**
- [Briefly explain why you trusted the evidence and formed your conclusion]

RULES:
1. Never hallucinate. If you cannot find the answer using the provided tools, state "AmrootOS does not currently have verified evidence to answer this."
2. Always use the tools provided to query the Knowledge Graph.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages,
    tools: {
      searchKnowledgeGraph: tool({
        description: 'Search the AmrootOS Knowledge Graph for competitors, suppliers, or products.',
        parameters: z.object({
          query: z.string().describe('The entity name or keyword to search for'),
        }),
        // @ts-ignore
        execute: async ({ query }: { query: string }) => {
          const competitors = await prisma.competitor.findMany({
            where: {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            },
            take: 5,
          });
          
          return {
            results: competitors,
            note: 'This is verified data from the AmrootOS Database.',
          };
        },
      }),
      searchProducts: tool({
        description: 'Search for products and SKUs in the AmrootOS Knowledge Graph.',
        parameters: z.object({
          query: z.string().describe('The product name to search for'),
        }),
        // @ts-ignore
        execute: async ({ query }: { query: string }) => {
          const products = await prisma.product.findMany({
            where: { name: { contains: query, mode: 'insensitive' } },
            include: { skus: true, competitor: true },
            take: 5,
          });
          return { results: products };
        },
      }),
      searchLabReports: tool({
        description: 'Search for Lab Reports by report number or laboratory name.',
        parameters: z.object({
          query: z.string().describe('The report number to search for'),
        }),
        // @ts-ignore
        execute: async ({ query }: { query: string }) => {
          const reports = await prisma.labReport.findMany({
            where: { reportNumber: { contains: query, mode: 'insensitive' } },
            include: { laboratory: true, supplier: true, manufacturer: true },
            take: 5,
          });
          return { results: reports };
        },
      }),
      searchShipments: tool({
        description: 'Search for Shipments by bill of lading or HS Code.',
        parameters: z.object({
          query: z.string().describe('The bill of lading or HS code to search for'),
        }),
        // @ts-ignore
        execute: async ({ query }: { query: string }) => {
          const shipments = await prisma.shipment.findMany({
            where: {
              OR: [
                { billOfLading: { contains: query, mode: 'insensitive' } },
                { hsCode: { contains: query, mode: 'insensitive' } },
              ],
            },
            include: { supplier: true, importer: true },
            take: 5,
          });
          return { results: shipments };
        },
      }),
    },
    // @ts-ignore
    maxSteps: 5,
  });

  // @ts-ignore
  return result.toDataStreamResponse ? result.toDataStreamResponse() : result.toTextStreamResponse();
}
