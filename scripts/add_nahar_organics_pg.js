const { Client } = require('pg');
const crypto = require('crypto');
require('dotenv').config();

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:51214/template1?sslmode=disable"
  });

  await client.connect();
  console.log("Connected to database");

  const supplierName = "Nahar Organics";
  
  // Check if supplier exists
  let res = await client.query('SELECT id, name FROM "Supplier" WHERE name = $1', [supplierName]);
  let supplierId;
  
  if (res.rows.length > 0) {
    supplierId = res.rows[0].id;
    console.log(`Supplier already exists: ${supplierName}`);
  } else {
    supplierId = crypto.randomUUID();
    await client.query(
      'INSERT INTO "Supplier" (id, name, "lifecycleStage", "intelligenceScore", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())',
      [supplierId, supplierName, 'DISCOVERED', 85.0]
    );
    console.log(`Created supplier: ${supplierName}`);
  }

  const evidences = [
    { fieldName: 'GST Number', value: '18BLQPG3257H1ZT' },
    { fieldName: 'Legal Name', value: 'BINITA GOGOI' },
    { fieldName: 'Address', value: 'Office No-103, 1st Floor, DN Tower, Basistha Chariali, NH-37, PS- Baisistha, Guwahati, Assam - 781029' },
    { fieldName: 'Contact Person', value: 'Suraj Baruah (Business Development Associate)' },
    { fieldName: 'Phone', value: '+919287501662, +918840243048, +919287996189' },
    { fieldName: 'Email', value: 'bassociate45@gmail.com, info@naharorganics.com, sales@naharorganics.com' },
    { fieldName: 'Website', value: 'www.naharorganics.com' },
    { fieldName: 'Products', value: 'Premium range of spices & herbs, NPOP/NOP products' },
    { fieldName: 'Pricing: Lakadong Turmeric Slice', value: '340/kg (ex factory)' },
    { fieldName: 'Pricing: Lakadong Turmeric Powder', value: '480/kg (ex factory)' }
  ];

  for (const ev of evidences) {
    await client.query(
      `INSERT INTO "Evidence" (
        id, "entityType", "entityId", "fieldName", "value", "valueType", 
        "sourceName", "sourceTier", "confidenceScore", "verificationStatus", 
        "createdAt", "updatedAt", "version", "isCurrent", "dateCollected", "lastVerified"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), 1, true, NOW(), NOW())`,
      [
        crypto.randomUUID(), 'Supplier', supplierId, ev.fieldName, ev.value, 'String',
        'Inbound Lead (WhatsApp & Documents)', 1, 100, 'VERIFIED'
      ]
    );
  }

  console.log('Successfully added Nahar Organics and its evidence.');
  await client.end();
}

main().catch(console.error);
