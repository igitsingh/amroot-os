import { execSync } from 'child_process';

console.log("Starting full recovery of all social media profiles...");
try {
  console.log("Running UK Scraper...");
  execSync('npx tsx scrape-uk-companies.ts', { stdio: 'inherit' });
  
  console.log("Running UAE Scraper...");
  execSync('npx tsx scrape-uae-companies.ts', { stdio: 'inherit' });
  
  console.log("Running Europe Scraper...");
  execSync('npx tsx scrape-europe-companies.ts', { stdio: 'inherit' });
  
  console.log("Running Germany Scraper...");
  execSync('npx tsx scrape-germany-companies.ts', { stdio: 'inherit' });

  console.log("Recovery Complete!");
} catch (e) {
  console.error("Failed during scraping:", e);
}
