const fs = require('fs');
const path = require('path');

const SUPPLIERS_FILE = path.join(__dirname, '../src/db/intelligence/suppliers/suppliers.json');
let suppliersData = JSON.parse(fs.readFileSync(SUPPLIERS_FILE, 'utf-8'));

// Filter out the one with id 'supplier-pr-exports' which is the one with incomplete info
const initialCount = suppliersData.length;
suppliersData = suppliersData.filter(s => s.id !== 'supplier-pr-exports');
const finalCount = suppliersData.length;

if (initialCount !== finalCount) {
  fs.writeFileSync(SUPPLIERS_FILE, JSON.stringify(suppliersData, null, 2));
  console.log(`Successfully removed duplicate PR Exports. Count went from ${initialCount} to ${finalCount}.`);
} else {
  console.log("No duplicate PR Exports found.");
}
