const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Connected to the database. Seeding data...');

    // We'll use simple INSERT statements with gen_random_uuid() or similar
    // We assume the tables are public."ExtractionMethod", public."AgritechTrial", public."MarketTrend"

    const uuid = () => crypto.randomUUID ? crypto.randomUUID() : require('crypto').randomUUID();

    // 1. Extraction Methods
    await client.query(`
      INSERT INTO "ExtractionMethod" (id, name, description, "curcuminYieldPct", "purityPct", "solventUsed", scalability, "costIntensity", sustainability, "updatedAt")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()),
      ($10, $11, $12, $13, $14, $15, $16, $17, $18, NOW()),
      ($19, $20, $21, $22, $23, $24, $25, $26, $27, NOW())
    `, [
      uuid(), 'Ionic Liquid-Integrated Ultrasound-Assisted Enzymatic Extraction (IL-UAE-EE)', 'Currently the most cutting-edge "green" method. Can dramatically increase curcumin solubility (30–50x). Allows Amroot to produce pharmaceutical-grade curcumin without toxic organic solvents.', 38.0, 98.0, 'Ionic Liquids & Enzymes', 'Medium', 'High', 'High',
      uuid(), 'Microwave-Assisted Extraction (MAE)', 'Fast, energy-efficient, and highly scalable for industrial use. Good middle-ground for scaling up extract production quickly.', 25.0, 85.0, 'Ethanol / Water', 'High', 'Medium', 'Medium',
      uuid(), 'Subcritical Water Extraction', 'Uses only water at specific temperatures/pressures. Extremely safe, 100% organic/food-grade compliant, making it perfect for European buyers who strictly audit for solvent residue.', 20.0, 80.0, 'Water', 'High', 'Low', 'Very High'
    ]);
    console.log('Inserted Extraction Methods.');

    // 2. Agritech Pilot Trials
    await client.query(`
      INSERT INTO "AgritechTrial" (id, title, "partnerName", "hardwareUsed", "softwareUsed", location, status, "startDate", "resultsSummary", "updatedAt")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()),
      ($10, $11, $12, $13, $14, $15, $16, $17, $18, NOW()),
      ($19, $20, $21, $22, $23, $24, $25, $26, $27, NOW())
    `, [
      uuid(), 'Mission Lakadong AI Soil Mapping & Monitoring', 'KVK West Jaintia Hills', 'IoT Soil Sensors (Moisture, NPK)', 'AI Analytics Dashboard', 'West Jaintia Hills, Meghalaya', 'FIELD_TESTING', new Date('2025-01-15'), 'Preliminary data shows 15% increase in yield by optimizing organic fertilizer application timing based on real-time soil moisture and nitrogen levels.',
      uuid(), 'Megha Turmeric-1 High-Yield Intercropping Trials', 'ICAR Meghalaya', 'Raised-bed systems', 'N/A', 'Umiam, Meghalaya', 'DEPLOYED', new Date('2024-05-01'), 'Intercropping Megha-1 with soybean on raised beds yielded 30% more rhizomes compared to traditional Jhum shifting cultivation.',
      uuid(), 'Solar-Powered Hybrid Slicers & Driers', 'Meghalaya Basin Management Agency (MBMA)', 'Photovoltaic hybrid driers, Mechanical Slicers', 'Temperature Monitoring App', 'Shillong, Meghalaya', 'PROTOTYPE', new Date('2026-02-10'), 'Reduced drying time by 40% while preventing curcumin degradation caused by direct sun exposure. Improves post-harvest quality control.'
    ]);
    console.log('Inserted Agritech Trials.');

    // 3. Market Intelligence
    await client.query(`
      INSERT INTO "MarketTrend" (id, title, category, "impactLevel", summary, source, "updatedAt")
      VALUES
      ($1, $2, $3, $4, $5, $6, NOW()),
      ($7, $8, $9, $10, $11, $12, NOW()),
      ($13, $14, $15, $16, $17, $18, NOW())
    `, [
      uuid(), 'The "Clean-Label" Premiumization Shift', 'CONSUMER_DEMAND', 'HIGH', 'EU and North American buyers are shifting away from generic commodity trading. They demand strict traceability, pesticide-free certifications, and sustainable sourcing. Emphasize the "organic by default" nature of Meghalaya farming.', 'Global Market Insights 2026',
      uuid(), 'Surge in Demand for Bioavailable Formulations', 'PRODUCT_INNOVATION', 'MEDIUM', 'The nutraceutical market is investing heavily in "nano-curcumin" and Piperine-combined products. Partnering with a lab that processes Lakadong into a highly bioavailable extract could 10x the profit margin.', 'Nutraceuticals World Report',
      uuid(), 'GI Tag as a Global Anti-Counterfeit Tool', 'REGULATION', 'CRITICAL', 'Lakadong Turmeric is now legally protected. Adulteration is the biggest fear for Western buyers. Use the GI tag aggressively in B2B pitches—it is the ultimate guarantee of authenticity and high curcumin.', 'Meghalaya Farmers Empowerment Commission (MFEC)'
    ]);
    console.log('Inserted Market Trends.');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

seed();
