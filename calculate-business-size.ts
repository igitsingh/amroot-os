import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Business Size Classification Logic
// Defined as per the user's requirements:
// 1. Years in industry
// 2. Revenue and Profit (Current, -1yr, -2yr, -3yr, -4yr)
// 3. Employee Count

const THRESHOLDS = {
  EMPLOYEES: { SMALL: 50, MEDIUM: 250 },
  REVENUE_USD: { SMALL: 5_000_000, MEDIUM: 50_000_000 },
  YEARS_IN_INDUSTRY: { SMALL: 5, MEDIUM: 15 }
};

function calculateSize(buyer: any) {
  let score = 0;
  let criteriaCount = 0;
  
  // 1. Number of Employees
  if (buyer.employeeCount) {
    criteriaCount++;
    if (buyer.employeeCount >= THRESHOLDS.EMPLOYEES.MEDIUM) score += 3;
    else if (buyer.employeeCount >= THRESHOLDS.EMPLOYEES.SMALL) score += 2;
    else score += 1;
  }
  
  // 2. Years in Industry
  if (buyer.foundingYear) {
    const currentYear = new Date().getFullYear();
    const yearsInIndustry = currentYear - buyer.foundingYear;
    criteriaCount++;
    if (yearsInIndustry >= THRESHOLDS.YEARS_IN_INDUSTRY.MEDIUM) score += 3;
    else if (yearsInIndustry >= THRESHOLDS.YEARS_IN_INDUSTRY.SMALL) score += 2;
    else score += 1;
  }
  
  // 3. Financial History (Revenue & Profit across 5 years)
  if (buyer.financialHistory && typeof buyer.financialHistory === 'object') {
    // We average the revenue across the available years
    const revs = buyer.financialHistory.revenue || [];
    if (revs.length > 0) {
      criteriaCount++;
      const avgRev = revs.reduce((a: number, b: number) => a + b, 0) / revs.length;
      if (avgRev >= THRESHOLDS.REVENUE_USD.MEDIUM) score += 3;
      else if (avgRev >= THRESHOLDS.REVENUE_USD.SMALL) score += 2;
      else score += 1;
    }
  }
  
  // If we have absolutely zero data, we cannot classify them without violating data integrity
  if (criteriaCount === 0) return null; 
  
  const avgScore = score / criteriaCount;
  
  if (avgScore >= 2.5) return 'Large';
  if (avgScore >= 1.5) return 'Medium';
  return 'Small';
}

async function main() {
  console.log("Running Business Size Classification Engine...");
  const buyers = await prisma.buyer.findMany();
  let updatedCount = 0;
  let unclassifiableCount = 0;
  
  for (const buyer of buyers) {
    const size = calculateSize(buyer);
    if (size) {
      if (size !== buyer.businessSize) {
        await prisma.buyer.update({
          where: { id: buyer.id },
          data: { businessSize: size }
        });
        updatedCount++;
      }
    } else {
      unclassifiableCount++;
    }
  }
  
  console.log(`Successfully classified ${updatedCount} companies.`);
  console.log(`Could not classify ${unclassifiableCount} companies due to missing financial/employee data.`);
  console.log("NOTE: AmrootOS Constitution forbids fabricating missing data.");
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
