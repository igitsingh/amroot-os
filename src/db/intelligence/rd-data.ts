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

export const premiumTurmericData = {
  name: "Premium Lakadong Turmeric Powder",
  botanicalIdentity: {
    species: "Curcuma longa",
    family: "Zingiberaceae",
    partUsed: "Rhizome",
    origin: "Lakadong, Meghalaya, India (GI Tagged)"
  },
  keyBioactives: [
    { name: "Curcumin", percentage: "7% - 12%" },
    { name: "Demethoxycurcumin (DMC)", percentage: "1.5% - 2%" },
    { name: "Bisdemethoxycurcumin (BDMC)", percentage: "1% - 1.5%" },
    { name: "Volatile Oils (Turmerone)", percentage: "4% - 6%" }
  ],
  nutritionalProfile: {
    macronutrients: [
      { name: "Carbohydrates", value: "65g - 69g" },
      { name: "Dietary Fiber", value: "21g" },
      { name: "Protein", value: "8g" },
      { name: "Total Fat", value: "9.8g" },
      { name: "Energy", value: "312 kcal" }
    ],
    minerals: [
      { name: "Potassium", value: "2500 mg" },
      { name: "Iron", value: "41.4 mg" },
      { name: "Magnesium", value: "193 mg" },
      { name: "Calcium", value: "183 mg" }
    ],
    vitamins: [
      { name: "Vitamin C", value: "25.9 mg" },
      { name: "Vitamin B6", value: "1.8 mg" },
      { name: "Vitamin B3 (Niacin)", value: "5.1 mg" },
      { name: "Vitamin E", value: "3.1 mg" }
    ]
  },
  properties: {
    appearance: "Deep yellow-orange fine powder",
    solubility: "Insoluble in water; Soluble in ethanol, acetone, and oils",
    moistureContent: "< 10%",
    particleSize: "100% passes through 80 mesh"
  },
  sensory: {
    color: "Golden to deep orange",
    aroma: "Earthy, slightly musky with hints of citrus",
    taste: "Warm, slightly bitter, pungent"
  },
  safety: {
    heavyMetals: {
      lead: "< 2.0 ppm",
      arsenic: "< 1.0 ppm",
      cadmium: "< 1.0 ppm",
      mercury: "< 0.1 ppm"
    },
    microbial: {
      totalPlateCount: "< 10,000 cfu/g",
      yeastAndMold: "< 1,000 cfu/g",
      eColi: "Absent in 10g",
      salmonella: "Absent in 25g"
    }
  },
  adulterants: [
    "Lead Chromate (yellow dye)",
    "Metanil Yellow",
    "Starch (Corn/Cassava)",
    "Chalk Powder"
  ],
  formulation: {
    synergies: "Black Pepper (Piperine) increases bioavailability by 2000%; Lipids (Coconut oil, ghee) enhance absorption.",
    stability: "Light-sensitive (degrades rapidly in UV); Heat stable up to 150°C during cooking."
  },
  processingAndPackaging: {
    curingAndDrying: "Boil fresh rhizomes for 45 mins to ensure uniform color and sterilization, then sun/solar dry to < 10% moisture.",
    milling: "Use cryogenic or low-heat hammer mills to prevent thermal degradation of volatile oils. Sieve to 80 mesh.",
    packaging: "B2B: 25kg Polyethylene-lined multi-wall kraft bags. Retail: Laminated aluminum foil pouches for absolute UV/moisture block.",
    shelfLife: "24-36 months if stored < 25°C in airtight, light-proof containers."
  }
};

export const organicTurmericData = {
  name: "Organic Turmeric Powder",
  botanicalIdentity: {
    species: "Curcuma longa",
    family: "Zingiberaceae",
    partUsed: "Rhizome",
    origin: "India"
  },
  keyBioactives: [
    { name: "Curcumin", percentage: "2% - 4%" },
    { name: "Demethoxycurcumin (DMC)", percentage: "0.5% - 1%" },
    { name: "Bisdemethoxycurcumin (BDMC)", percentage: "0.2% - 0.5%" },
    { name: "Volatile Oils (Turmerone)", percentage: "1% - 3%" }
  ],
  nutritionalProfile: {
    macronutrients: [
      { name: "Carbohydrates", value: "65g - 69g" },
      { name: "Dietary Fiber", value: "21g" },
      { name: "Protein", value: "8g" },
      { name: "Total Fat", value: "9.8g" },
      { name: "Energy", value: "312 kcal" }
    ],
    minerals: [
      { name: "Potassium", value: "2500 mg" },
      { name: "Iron", value: "41.4 mg" },
      { name: "Magnesium", value: "193 mg" },
      { name: "Calcium", value: "183 mg" }
    ],
    vitamins: [
      { name: "Vitamin C", value: "25.9 mg" },
      { name: "Vitamin B6", value: "1.8 mg" },
      { name: "Vitamin B3 (Niacin)", value: "5.1 mg" },
      { name: "Vitamin E", value: "3.1 mg" }
    ]
  },
  properties: {
    appearance: "Yellow to light orange fine powder",
    solubility: "Insoluble in water; Soluble in ethanol, acetone, and oils",
    moistureContent: "< 10%",
    particleSize: "100% passes through 80 mesh"
  },
  sensory: {
    color: "Yellow to light orange",
    aroma: "Earthy, mildly mustard-like",
    taste: "Warm, slightly bitter"
  },
  safety: {
    heavyMetals: {
      lead: "< 2.0 ppm",
      arsenic: "< 1.0 ppm",
      cadmium: "< 1.0 ppm",
      mercury: "< 0.1 ppm"
    },
    microbial: {
      totalPlateCount: "< 10,000 cfu/g",
      yeastAndMold: "< 1,000 cfu/g",
      eColi: "Absent in 10g",
      salmonella: "Absent in 25g"
    }
  },
  adulterants: [
    "Lead Chromate (yellow dye)",
    "Metanil Yellow",
    "Starch (Corn/Cassava)",
    "Chalk Powder"
  ],
  formulation: {
    synergies: "Black Pepper (Piperine) increases bioavailability by 2000%; Lipids (Coconut oil, ghee) enhance absorption.",
    stability: "Light-sensitive (degrades rapidly in UV); Heat stable up to 150°C during cooking."
  },
  processingAndPackaging: {
    curingAndDrying: "Standard curing process, sun/solar dry to < 10% moisture.",
    milling: "Standard hammer mills. Sieve to 80 mesh.",
    packaging: "B2B: 25kg Polyethylene-lined multi-wall kraft bags. Retail: Laminated aluminum foil pouches for absolute UV/moisture block.",
    shelfLife: "24-36 months if stored < 25°C in airtight, light-proof containers."
  }
};

export const premiumGingerData = {
  name: "Premium Jaintia Hills Ginger Powder",
  botanicalIdentity: {
    species: "Zingiber rubens (Ing Makhir)",
    family: "Zingiberaceae",
    partUsed: "Rhizome",
    origin: "Jaintia Hills, Meghalaya, India"
  },
  keyBioactives: [
    { name: "6-Gingerol", percentage: "1.5% - 2.5%" },
    { name: "8-Gingerol", percentage: "0.2% - 0.5%" },
    { name: "6-Shogaol (formed during drying)", percentage: "0.4% - 1.2%" },
    { name: "Essential Oils (Zingiberene)", percentage: "1% - 3%" }
  ],
  nutritionalProfile: {
    macronutrients: [
      { name: "Carbohydrates", value: "71.6g" },
      { name: "Dietary Fiber", value: "14.1g" },
      { name: "Protein", value: "8.9g" },
      { name: "Total Fat", value: "4.2g" },
      { name: "Energy", value: "335 kcal" }
    ],
    minerals: [
      { name: "Potassium", value: "1320 mg" },
      { name: "Magnesium", value: "214 mg" },
      { name: "Calcium", value: "114 mg" },
      { name: "Iron", value: "19.8 mg" },
      { name: "Manganese", value: "33.3 mg" }
    ],
    vitamins: [
      { name: "Vitamin C", value: "5 mg" },
      { name: "Vitamin B3 (Niacin)", value: "9.6 mg" },
      { name: "Vitamin B6", value: "0.6 mg" },
      { name: "Vitamin E", value: "18 mg" }
    ]
  },
  properties: {
    appearance: "Pale yellow to light brown fine powder",
    solubility: "Partially soluble in water; Soluble in alcohol",
    moistureContent: "< 10%",
    particleSize: "100% passes through 60-80 mesh"
  },
  sensory: {
    color: "Light creamy yellow",
    aroma: "Spicy, fresh, aromatic, slightly sweet",
    taste: "Hot, pungent, biting, slightly sweet"
  },
  safety: {
    heavyMetals: {
      lead: "< 2.0 ppm",
      arsenic: "< 1.0 ppm",
      cadmium: "< 1.0 ppm",
      mercury: "< 0.1 ppm"
    },
    microbial: {
      totalPlateCount: "< 10,000 cfu/g",
      yeastAndMold: "< 1,000 cfu/g",
      eColi: "Absent in 10g",
      salmonella: "Absent in 25g"
    }
  },
  adulterants: [
    "Exhausted Ginger (oil extracted)",
    "Chili Powder / Capsaicin (for artificial heat)",
    "Starch / Flour"
  ],
  formulation: {
    synergies: "Lemon, Honey, Turmeric (Anti-inflammatory stack), Mint (Digestive stack).",
    stability: "Gingerols convert to more pungent Shogaols upon heating or long-term storage."
  },
  processingAndPackaging: {
    curingAndDrying: "Wash thoroughly, slice thinly to maximize surface area, and mechanical dry at 50-60°C to < 10% moisture.",
    milling: "Low-temperature grinding required. High heat rapidly degrades gingerol content. Sieve to 60-80 mesh.",
    packaging: "B2B: 25kg PE-lined gunny bags. Retail: PET jars or multi-layer pouches to block oxygen and moisture.",
    shelfLife: "24 months in a cool, dry, dark environment."
  }
};

export const organicGingerData = {
  name: "Organic Ginger Powder",
  botanicalIdentity: {
    species: "Zingiber officinale",
    family: "Zingiberaceae",
    partUsed: "Rhizome",
    origin: "India"
  },
  keyBioactives: [
    { name: "6-Gingerol", percentage: "0.1% - 1.0%" },
    { name: "8-Gingerol", percentage: "0.05% - 0.2%" },
    { name: "6-Shogaol (formed during drying)", percentage: "0.1% - 0.4%" },
    { name: "Essential Oils (Zingiberene)", percentage: "0.5% - 1.5%" }
  ],
  nutritionalProfile: {
    macronutrients: [
      { name: "Carbohydrates", value: "71.6g" },
      { name: "Dietary Fiber", value: "14.1g" },
      { name: "Protein", value: "8.9g" },
      { name: "Total Fat", value: "4.2g" },
      { name: "Energy", value: "335 kcal" }
    ],
    minerals: [
      { name: "Potassium", value: "1320 mg" },
      { name: "Magnesium", value: "214 mg" },
      { name: "Calcium", value: "114 mg" },
      { name: "Iron", value: "19.8 mg" },
      { name: "Manganese", value: "33.3 mg" }
    ],
    vitamins: [
      { name: "Vitamin C", value: "5 mg" },
      { name: "Vitamin B3 (Niacin)", value: "9.6 mg" },
      { name: "Vitamin B6", value: "0.6 mg" },
      { name: "Vitamin E", value: "18 mg" }
    ]
  },
  properties: {
    appearance: "Pale yellow to light brown fine powder",
    solubility: "Partially soluble in water; Soluble in alcohol",
    moistureContent: "< 10%",
    particleSize: "100% passes through 60-80 mesh"
  },
  sensory: {
    color: "Light creamy yellow",
    aroma: "Mildly spicy, earthy",
    taste: "Warm, moderately pungent"
  },
  safety: {
    heavyMetals: {
      lead: "< 2.0 ppm",
      arsenic: "< 1.0 ppm",
      cadmium: "< 1.0 ppm",
      mercury: "< 0.1 ppm"
    },
    microbial: {
      totalPlateCount: "< 10,000 cfu/g",
      yeastAndMold: "< 1,000 cfu/g",
      eColi: "Absent in 10g",
      salmonella: "Absent in 25g"
    }
  },
  adulterants: [
    "Exhausted Ginger (oil extracted)",
    "Chili Powder / Capsaicin (for artificial heat)",
    "Starch / Flour"
  ],
  formulation: {
    synergies: "Lemon, Honey, Turmeric (Anti-inflammatory stack), Mint (Digestive stack).",
    stability: "Gingerols convert to more pungent Shogaols upon heating or long-term storage."
  },
  processingAndPackaging: {
    curingAndDrying: "Standard washing and sun drying to < 10% moisture.",
    milling: "Standard hammer mills. Sieve to 60-80 mesh.",
    packaging: "B2B: 25kg PE-lined gunny bags. Retail: PET jars or multi-layer pouches to block oxygen and moisture.",
    shelfLife: "24 months in a cool, dry, dark environment."
  }
};
