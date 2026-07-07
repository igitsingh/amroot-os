export const extractionMethodsData = [
  {
    id: 'em-1',
    name: 'Ionic Liquid-Integrated Ultrasound-Assisted Enzymatic Extraction (IL-UAE-EE)',
    description: 'Currently the most cutting-edge "green" method. Can dramatically increase curcumin solubility (30–50x). Allows Amroot to produce pharmaceutical-grade curcumin without toxic organic solvents.',
    curcuminYieldPct: 38.0,
    purityPct: 98.0,
    solventUsed: 'Ionic Liquids & Enzymes',
    scalability: 'Medium',
    costIntensity: 'High',
    sustainability: 'High',
    url: 'https://www.atlantis-press.com/article/125964893.pdf'
  },
  {
    id: 'em-2',
    name: 'Microwave-Assisted Extraction (MAE)',
    description: 'Fast, energy-efficient, and highly scalable for industrial use. Good middle-ground for scaling up extract production quickly.',
    curcuminYieldPct: 25.0,
    purityPct: 85.0,
    solventUsed: 'Ethanol / Water',
    scalability: 'High',
    costIntensity: 'Medium',
    sustainability: 'Medium',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8945763/'
  },
  {
    id: 'em-3',
    name: 'Subcritical Water Extraction',
    description: 'Uses only water at specific temperatures/pressures. Extremely safe, 100% organic/food-grade compliant, making it perfect for European buyers who strictly audit for solvent residue.',
    curcuminYieldPct: 20.0,
    purityPct: 80.0,
    solventUsed: 'Water',
    scalability: 'High',
    costIntensity: 'Low',
    sustainability: 'Very High',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=subcritical+water+extraction+curcumin'
  }
];

export const agritechTrialsData = [
  {
    id: 'at-1',
    title: 'Mission Lakadong AI Soil Mapping & Monitoring',
    partnerName: 'KVK West Jaintia Hills',
    hardwareUsed: 'IoT Soil Sensors (Moisture, NPK)',
    softwareUsed: 'AI Analytics Dashboard',
    location: 'West Jaintia Hills, Meghalaya',
    status: 'FIELD_TESTING',
    resultsSummary: 'Preliminary data shows 15% increase in yield by optimizing organic fertilizer application timing based on real-time soil moisture and nitrogen levels.',
    url: 'https://india.mongabay.com/2021/04/lakadong-turmeric-gives-a-golden-hue-to-the-lives-of-women-farmers-in-meghalaya/'
  },
  {
    id: 'at-2',
    title: 'Megha Turmeric-1 High-Yield Intercropping Trials',
    partnerName: 'ICAR Meghalaya',
    hardwareUsed: 'Raised-bed systems',
    softwareUsed: 'N/A',
    location: 'Umiam, Meghalaya',
    status: 'DEPLOYED',
    resultsSummary: 'Intercropping Megha-1 with soybean on raised beds yielded 30% more rhizomes compared to traditional Jhum shifting cultivation.',
    url: 'https://icar.gov.in/'
  },
  {
    id: 'at-3',
    title: 'Solar-Powered Hybrid Slicers & Driers',
    partnerName: 'Meghalaya Basin Management Agency (MBMA)',
    hardwareUsed: 'Photovoltaic hybrid driers, Mechanical Slicers',
    softwareUsed: 'Temperature Monitoring App',
    location: 'Shillong, Meghalaya',
    status: 'PROTOTYPE',
    resultsSummary: 'Reduced drying time by 40% while preventing curcumin degradation caused by direct sun exposure. Improves post-harvest quality control.',
    url: 'https://www.megamb.gov.in/'
  }
];

export const marketTrendsData = [
  {
    id: 'mt-1',
    title: 'The "Clean-Label" Premiumization Shift',
    category: 'CONSUMER_DEMAND',
    impactLevel: 'HIGH',
    summary: 'EU and North American buyers are shifting away from generic commodity trading. They demand strict traceability, pesticide-free certifications, and sustainable sourcing. Emphasize the "organic by default" nature of Meghalaya farming.',
    source: 'Global Market Insights 2026',
    url: 'https://www.agronicfood.com/blog/organic-turmeric-market'
  },
  {
    id: 'mt-2',
    title: 'Surge in Demand for Bioavailable Formulations',
    category: 'PRODUCT_INNOVATION',
    impactLevel: 'MEDIUM',
    summary: 'The nutraceutical market is investing heavily in "nano-curcumin" and Piperine-combined products. Partnering with a lab that processes Lakadong into a highly bioavailable extract could 10x the profit margin.',
    source: 'Nutraceuticals World Report',
    url: 'https://www.grandviewresearch.com/industry-analysis/curcumin-market'
  },
  {
    id: 'mt-3',
    title: 'GI Tag as a Global Anti-Counterfeit Tool',
    category: 'REGULATION',
    impactLevel: 'CRITICAL',
    summary: 'Lakadong Turmeric is now legally protected. Adulteration is the biggest fear for Western buyers. Use the GI tag aggressively in B2B pitches—it is the ultimate guarantee of authenticity and high curcumin.',
    source: 'Meghalaya Farmers Empowerment Commission (MFEC)',
    url: 'https://www.mfec.in/appreciation-post-a-new-chapter-for-meghalayas-lakadong-begins-now/'
  }
];
