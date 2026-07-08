import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// If DATABASE_URL is missing, we create a proxy that instantly rejects all database queries.
// This prevents Next.js Server Components from hanging on Prisma retries when the DB is down.
const createMockPrisma = () => {
  return new Proxy({}, {
    get(target, prop) {
      if (prop === '$connect') return async () => {};
      if (prop === '$disconnect') return async () => {};
      return new Proxy({}, {
        get(t, p) {
          return () => Promise.reject(new Error("Database connection disabled (DATABASE_URL not set). Falling back to JSON."));
        }
      });
    }
  }) as PrismaClient;
};

const basePrisma = process.env.DATABASE_URL
  ? new PrismaClient({ adapter, log: ['query', 'info'] })
  : createMockPrisma();

export const prisma = globalForPrisma.prisma || basePrisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

