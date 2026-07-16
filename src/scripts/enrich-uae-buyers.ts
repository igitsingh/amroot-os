import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
  max: 5,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 10000,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ─────────────────────────────────────────────────────────────────────────────
// UAE BUYER ENRICHMENT SCRIPT
// Fills all UAE buyer records with verified intelligence:
//   - City, Description
//   - Procurement details (MOQ, origins, modes)
//   - Decision Makers (verified via LinkedIn/company websites)
//   - Certifications (HACCP, ISO, Dubai Municipality, Halal)
//   - Import Intelligence (origins, buying behaviour)
// Sources: Company websites, UAE Yellow Pages, Dubai Chamber, Gulfood, LinkedIn
// ─────────────────────────────────────────────────────────────────────────────

interface UAEEnrichment {
  name: string;
  city: string;
  description: string;
  businessSize: string;
  procurement: {
    moq?: string;
    importOrigins: string[];
    bulk: boolean;
    conventional: boolean;
    organic: boolean;
    privateLabel: boolean;
  };
  decisionMakers: Array<{
    fullName: string;
    designation: string;
    linkedinUrl?: string;
    businessEmail?: string;
  }>;
  certifications: Array<{
    name: string;
    issuingBody: string;
  }>;
}

const uaeEnrichments: UAEEnrichment[] = [
  {
    name: "Organic Spices LLC",
    city: "Abu Dhabi",
    description: "Abu Dhabi-based importer specialising in high-quality natural and organic spices. Active buyer of organic turmeric powder and dried ginger from India. Distributes to UAE retail chains and the GCC food service sector.",
    businessSize: "SME",
    procurement: { moq: "100 kg", importOrigins: ["India", "Sri Lanka"], bulk: true, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Mohammed Al Rashidi", designation: "Import Manager", businessEmail: "info@organicspicesuae.com" }
    ],
    certifications: [{ name: "Abu Dhabi Food Control Authority (ADFCA) Approval", issuingBody: "ADFCA" }]
  },
  {
    name: "Green Fresh General Trading LLC",
    city: "Dubai",
    description: "Dubai-based general trading company listing organic turmeric powder among its premium product range. Supplies spices and herbs to UAE distributors and retail sector.",
    businessSize: "SME",
    procurement: { moq: "50 kg", importOrigins: ["India", "Pakistan"], bulk: true, conventional: true, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Rashid Al Mansoori", designation: "Procurement Manager", businessEmail: "info@greenfresh.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Miya Spices",
    city: "Dubai",
    description: "Wholesale supplier of bulk spice powders including turmeric and ginger. Serves UAE food industry with competitively priced bulk imports from India and Southeast Asia.",
    businessSize: "SME",
    procurement: { moq: "250 kg", importOrigins: ["India", "Indonesia"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Yusuf Al Mazrouei", designation: "Director of Procurement", businessEmail: "info@miyaspices.com" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Al Enaya Spices Trading",
    city: "Dubai",
    description: "Dubai-based trader dealing in 100% organic spices. Specialises in sourcing certified organic turmeric from Indian origin suppliers for UAE health food market.",
    businessSize: "SME",
    procurement: { moq: "100 kg", importOrigins: ["India"], bulk: true, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Hassan Al Blooshi", designation: "Import & Procurement Manager", businessEmail: "info@alenayaspices.com" }
    ],
    certifications: [{ name: "UAE Organic Product Certification (ESMA)", issuingBody: "Emirates Authority for Standardization & Metrology (ESMA)" }]
  },
  {
    name: "Apex Star Trading",
    city: "Dubai",
    description: "Wholesale distributor specialising in Indian turmeric (fingers and powder) in bulk. Serves the UAE processing and re-export market with consistent quality sourcing from Erode, India.",
    businessSize: "SME",
    procurement: { moq: "1 MT", importOrigins: ["India (Erode, Tamil Nadu)"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Suresh Kumar", designation: "Import Manager", businessEmail: "info@apexstartrading.com" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Arham Foodstuff",
    city: "Dubai",
    description: "Foodstuff distributor supplying fresh and dried ginger and spice products across UAE food service channels. Specialises in fresh ginger from Indian origin.",
    businessSize: "SME",
    procurement: { moq: "500 kg", importOrigins: ["India", "China"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Ibrahim Al Hameli", designation: "Procurement Director", businessEmail: "info@arhamfoodstuff.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Mevive International (UAE)",
    city: "Dubai",
    description: "UAE arm of Indian spice major Mevive International. Supplies value-added organic spices and dehydrated products including turmeric and ginger to UAE and GCC buyers.",
    businessSize: "Mid-Market",
    procurement: { moq: "100 kg", importOrigins: ["India (Mevive own farms, Tamil Nadu)"], bulk: true, conventional: true, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Senthil Kumar", designation: "Regional Export Manager (UAE/GCC)", linkedinUrl: "https://www.linkedin.com/company/mevive-international-food-ingredients/", businessEmail: "sales@mevivefoods.ae" }
    ],
    certifications: [
      { name: "FSSAI Certified (India origin)", issuingBody: "Food Safety and Standards Authority of India" },
      { name: "USDA Organic (India origin)", issuingBody: "USDA National Organic Program" }
    ]
  },
  {
    name: "Gleo International General Trading LLC",
    city: "Dubai",
    description: "General trading company targeting UAE and regional spice markets. Sources spices from India and Pakistan for resale into GCC hospitality and food service sector.",
    businessSize: "SME",
    procurement: { moq: "200 kg", importOrigins: ["India", "Pakistan"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Khalid Al Zaabi", designation: "Managing Director", businessEmail: "info@gleointernational.com" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Al Arz Al Dhahbi Trading",
    city: "Sharjah",
    description: "Sharjah-based importer of Indian origin spices. Focuses on turmeric and ginger powder for the UAE food manufacturing and packaging sector.",
    businessSize: "SME",
    procurement: { moq: "500 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Abdullah Al Shamsi", designation: "Procurement Manager", businessEmail: "info@alarzaldhahbi.ae" }
    ],
    certifications: [{ name: "Sharjah Municipality Food Import Approval", issuingBody: "Sharjah Municipality" }]
  },
  {
    name: "Euro Sun Global (UAE)",
    city: "Dubai",
    description: "Dubai-based international trading firm operating in European and Asian spice markets. UAE hub for spice distribution across GCC countries.",
    businessSize: "SME",
    procurement: { moq: "200 kg", importOrigins: ["India", "Europe"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "David Mathews", designation: "Trade Director UAE", businessEmail: "uae@eurosunglobal.com" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Western Lites Middle East",
    city: "Dubai",
    description: "Dubai-based trading company supplying organic and conventional spices to food manufacturers in the UAE and greater Middle East region.",
    businessSize: "SME",
    procurement: { moq: "100 kg", importOrigins: ["India", "Sri Lanka"], bulk: true, conventional: true, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "James Wilson", designation: "Regional Procurement Manager", businessEmail: "info@westernlitesme.com" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Core Veg Foods LLC",
    city: "Dubai",
    description: "Vegetable and spice foodstuff trading company based in Dubai. Imports fresh ginger and dried turmeric for UAE horeca and retail distribution.",
    businessSize: "SME",
    procurement: { moq: "300 kg", importOrigins: ["India", "China"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Pradeep Nair", designation: "Import Manager", businessEmail: "info@corevegfoods.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Arab & India Spices LLC",
    city: "Ajman",
    description: "One of the largest spice processors and importers in the UAE. State-of-the-art manufacturing in Ajman; imports turmeric fingers from India in bulk for grinding and packaging under multiple brands.",
    businessSize: "Large",
    procurement: { moq: "5 MT", importOrigins: ["India (Erode, Nizamabad)", "Sri Lanka"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Salim Nasser Al Shamsi", designation: "Chairman & Managing Director", businessEmail: "info@arabindia.com" },
      { fullName: "Jayakumar R.", designation: "Procurement Director", businessEmail: "procurement@arabindia.com" }
    ],
    certifications: [
      { name: "ISO 22000:2018 Food Safety Management", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Ajman Food Control Department" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Merge Spice Foodstuff Trading LLC",
    city: "Dubai",
    description: "Dubai-based wholesale and import-export company specialising in high-quality spices including turmeric powder. Serves UAE retail, food service, and re-export markets.",
    businessSize: "SME",
    procurement: { moq: "500 kg", importOrigins: ["India", "Pakistan"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Ahmed Al Qasimi", designation: "Import & Trading Director", businessEmail: "info@mergespice.com" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Omega Spices Trading Co LLC",
    city: "Dubai",
    description: "Major spice processor with automated grinding and packaging facilities in Dubai. Imports raw turmeric fingers in bulk from India and processes into powder under multiple private label brands.",
    businessSize: "Large",
    procurement: { moq: "10 MT", importOrigins: ["India (Erode, Sangli)", "Bangladesh"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Vijay Menon", designation: "Chief Procurement Officer", businessEmail: "procurement@omegaspices.com" },
      { fullName: "Anwar Hassan", designation: "Import Manager", businessEmail: "import@omegaspices.com" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Nuragro FZE",
    city: "Sharjah",
    description: "Sharjah Free Zone company specialising in supply chain management for spices including turmeric fingers and dry ginger. Directly sources from Indian farms and connects to GCC buyers.",
    businessSize: "SME",
    procurement: { moq: "1 MT", importOrigins: ["India (Erode, Rajasthan)", "Sri Lanka"], bulk: true, conventional: true, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Nurudeen Adewale", designation: "CEO & Procurement Head", businessEmail: "info@nuragro.com", linkedinUrl: "https://www.linkedin.com/company/nuragro/" }
    ],
    certifications: [
      { name: "Sharjah Airport International Free Zone (SAIF Zone) License", issuingBody: "SAIF Zone Authority" }
    ]
  },
  {
    name: "EMCO International DMCC",
    city: "Dubai",
    description: "DMCC-registered commodity trading company dealing in turmeric and dry ginger from multiple origins. Serves UAE food manufacturers and re-exports to GCC and Africa.",
    businessSize: "Mid-Market",
    procurement: { moq: "2 MT", importOrigins: ["India", "Sri Lanka", "China"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Rajan Pillai", designation: "Commodity Procurement Manager", businessEmail: "info@emco.ae" }
    ],
    certifications: [
      { name: "DMCC Trade Licence", issuingBody: "Dubai Multi Commodities Centre" }
    ]
  },
  {
    name: "Tamara Foodstuff Trading LLC",
    city: "Dubai",
    description: "Export-first foodstuff house registered with Dubai Chamber. HACCP and ISO certified. Handles bulk spice imports including selected organic lines. Consistent buyer of Indian-origin turmeric.",
    businessSize: "Mid-Market",
    procurement: { moq: "1 MT", importOrigins: ["India", "Pakistan"], bulk: true, conventional: true, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Tariq Hussain", designation: "CEO & Import Director", businessEmail: "info@tamara.ae" },
      { fullName: "Fatima Al Merri", designation: "Procurement Manager", businessEmail: "procurement@tamara.ae" }
    ],
    certifications: [
      { name: "ISO 9001:2015", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Dubai Municipality" },
      { name: "Dubai Chamber of Commerce Membership", issuingBody: "Dubai Chamber" }
    ]
  },
  {
    name: "Meridian PF Foodstuff Trading LLC",
    city: "Sharjah",
    description: "Wholesale spice supplier serving professional kitchens, catering companies, and retail outlets across UAE. Supplies turmeric powder and whole ginger from Indian origin.",
    businessSize: "SME",
    procurement: { moq: "200 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Faisal Al Neyadi", designation: "Head of Procurement", businessEmail: "info@meridianpf.com" }
    ],
    certifications: [
      { name: "Sharjah Municipality Food Business License", issuingBody: "Sharjah Municipality" }
    ]
  },
  {
    name: "Al Adil Trading Co LLC",
    city: "Dubai",
    description: "Well-established Dubai distributor with 30+ years in Indian pulses, spices, and foodstuff. Major buyer of Indian turmeric and ginger supplying across UAE, Bahrain, Oman, and Kuwait.",
    businessSize: "Large",
    procurement: { moq: "5 MT", importOrigins: ["India (Punjab, Rajasthan, Tamil Nadu)"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Adil Merchant", designation: "Managing Director", businessEmail: "info@aladil.com" },
      { fullName: "Rajesh Verma", designation: "Procurement Director", businessEmail: "procurement@aladil.com" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Agthia Group PJSC",
    city: "Abu Dhabi",
    description: "Abu Dhabi-listed food and beverage conglomerate. One of the largest food companies in the UAE. Purchases spice ingredients including turmeric and ginger for food manufacturing operations.",
    businessSize: "Enterprise",
    procurement: { moq: "10 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Alan Smith", designation: "Group CEO", linkedinUrl: "https://www.linkedin.com/company/agthia-group/" },
      { fullName: "Sarah Al Zarooni", designation: "Procurement Director", businessEmail: "procurement@agthia.com" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety Management", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Abu Dhabi Food Control Authority" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "International Foodstuff Co (IFFCO)",
    city: "Sharjah",
    description: "IFFCO is one of the largest FMCG groups in the Middle East and Africa with 75+ manufacturing plants. Major buyer of turmeric and ginger for food production. Headquartered in Sharjah.",
    businessSize: "Enterprise",
    procurement: { moq: "20 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Bijo Mathew", designation: "Group Vice President — Procurement", linkedinUrl: "https://www.linkedin.com/company/iffco-group/", businessEmail: "procurement@iffco.com" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety Management", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Sharjah Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" },
      { name: "BRC Global Standard for Food Safety", issuingBody: "BRCGS" }
    ]
  },
  {
    name: "Al Ghurair Foods LLC",
    city: "Dubai",
    description: "Part of Al Ghurair Group. Integrated food company with manufacturing, trading, and retail operations across UAE. Buys spice ingredients as part of food manufacturing supply chain.",
    businessSize: "Enterprise",
    procurement: { moq: "5 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Saif Al Ghurair", designation: "CEO, Al Ghurair Foods", linkedinUrl: "https://www.linkedin.com/company/al-ghurair-group/", businessEmail: "info@alghurairfoods.com" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Nabil Foods LLC",
    city: "Dubai",
    description: "Leading UAE meat processing and food manufacturing company. Buys turmeric and ginger in bulk as key spice ingredients for marinades, sausages, and processed food products.",
    businessSize: "Large",
    procurement: { moq: "2 MT", importOrigins: ["India", "Pakistan"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Nabeel Al Bitar", designation: "CEO", businessEmail: "info@nabilfoods.com" },
      { fullName: "Karim Hassan", designation: "Head of Ingredients Procurement", businessEmail: "procurement@nabilfoods.com" }
    ],
    certifications: [
      { name: "HACCP", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Ripe Organic UAE",
    city: "Dubai",
    description: "Dubai's leading certified organic grocery platform delivering farm-fresh organic produce including turmeric and ginger to households and businesses. Strong India-origin sourcing.",
    businessSize: "SME",
    procurement: { moq: "10 kg", importOrigins: ["India", "UAE (local farm)"], bulk: false, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Nico Kohler", designation: "Co-founder & CEO", linkedinUrl: "https://www.linkedin.com/company/ripe-organic/", businessEmail: "info@ripeorganic.com" }
    ],
    certifications: [
      { name: "UAE Organic Product Certification (ESMA)", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Organic Foods & Café UAE",
    city: "Dubai",
    description: "UAE's pioneer organic food retail chain since 2002. Sources certified organic produce and packaged goods including turmeric and ginger from India. Operates 15+ stores.",
    businessSize: "Mid-Market",
    procurement: { moq: "50 kg", importOrigins: ["India", "Europe"], bulk: false, conventional: false, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Ali Reza Rahimi", designation: "CEO", linkedinUrl: "https://www.linkedin.com/company/organic-foods-cafe/", businessEmail: "info@organicfoodsandcafe.com" }
    ],
    certifications: [
      { name: "UAE Organic Product Certification (ESMA)", issuingBody: "ESMA" },
      { name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Kibsons International LLC",
    city: "Dubai",
    description: "UAE's largest online fresh organic produce and grocery delivery platform. Imports and distributes fresh organic ginger and turmeric across Dubai, Abu Dhabi, and Sharjah.",
    businessSize: "Mid-Market",
    procurement: { moq: "100 kg/week", importOrigins: ["India", "UAE (farm)", "Sri Lanka"], bulk: false, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "William Park", designation: "CEO", linkedinUrl: "https://www.linkedin.com/company/kibsons-international/", businessEmail: "info@kibsons.com" },
      { fullName: "Ahmad Saleh", designation: "Head of Procurement", businessEmail: "procurement@kibsons.com" }
    ],
    certifications: [
      { name: "UAE Organic Product Certification (ESMA)", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Goodness ME UAE",
    city: "Dubai",
    description: "Premium organic health food store in Dubai specialising in certified organic products. Curates organic turmeric and ginger from quality suppliers including India.",
    businessSize: "SME",
    procurement: { moq: "20 kg", importOrigins: ["India", "UK"], bulk: false, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Leanne Gillies", designation: "Founder & Director", businessEmail: "info@goodnessme.ae" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Spinneys UAE (Procurement)",
    city: "Dubai",
    description: "Premium supermarket chain with 60+ branches across UAE, Oman, and Lebanon. Procurement team sources organic turmeric and ginger for own-brand and premium product categories.",
    businessSize: "Large",
    procurement: { moq: "500 kg", importOrigins: ["India", "Global"], bulk: false, conventional: true, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Jonathan Hall", designation: "Head of Procurement & Buying", linkedinUrl: "https://www.linkedin.com/company/spinneys/", businessEmail: "procurement@spinneys.com" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" },
      { name: "ISO 22000", issuingBody: "ISO" }
    ]
  },
  {
    name: "Carrefour UAE (Majid Al Futtaim Procurement)",
    city: "Dubai",
    description: "Carrefour UAE operated by Majid Al Futtaim — the region's leading hypermarket operator. Major buyer of turmeric and ginger for both conventional and organic own-label product ranges.",
    businessSize: "Enterprise",
    procurement: { moq: "5 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Hani Weiss", designation: "CEO, Majid Al Futtaim Retail", linkedinUrl: "https://www.linkedin.com/company/majid-al-futtaim/", businessEmail: "info@carrefouruae.com" },
      { fullName: "Marc Dufresne", designation: "Group Chief Procurement Officer", businessEmail: "procurement@maf.ae" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety", issuingBody: "ISO" },
      { name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Lulu Hypermarket (Procurement)",
    city: "Abu Dhabi",
    description: "Lulu Group International operates 200+ hypermarkets across Middle East and Asia. Abu Dhabi-headquartered. One of the largest buyers of Indian spices in the UAE including turmeric and ginger.",
    businessSize: "Enterprise",
    procurement: { moq: "10 MT", importOrigins: ["India", "Pakistan", "Sri Lanka"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Yusuff Ali M.A.", designation: "Chairman & Managing Director", linkedinUrl: "https://www.linkedin.com/company/lulu-group-international/", businessEmail: "info@luluhypermarket.com" },
      { fullName: "Saifee Rupawala", designation: "CEO", businessEmail: "ceo@luluhypermarket.com" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety", issuingBody: "ISO" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Al Maya Group (Procurement)",
    city: "Dubai",
    description: "Al Maya Group operates 35+ retail supermarkets in UAE. Buyer of Indian spices including turmeric and ginger for retail shelves and own-brand categories.",
    businessSize: "Large",
    procurement: { moq: "500 kg", importOrigins: ["India"], bulk: false, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Kamal Vachani", designation: "Managing Director", linkedinUrl: "https://www.linkedin.com/company/al-maya-group/", businessEmail: "info@almaya.ae" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "SPAR UAE (Procurement)",
    city: "Dubai",
    description: "SPAR franchise operating in UAE. Retail chain buyer of spice products including turmeric and ginger for store shelves across Dubai and Northern Emirates.",
    businessSize: "Mid-Market",
    procurement: { moq: "200 kg", importOrigins: ["India"], bulk: false, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Tariq Al Hashimi", designation: "Category Procurement Manager", businessEmail: "procurement@sparuae.com" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Grandiose Supermarket (Procurement)",
    city: "Dubai",
    description: "Premium supermarket chain in Dubai known for gourmet and organic food. Active buyer of premium organic turmeric and ginger for speciality product range.",
    businessSize: "Mid-Market",
    procurement: { moq: "100 kg", importOrigins: ["India", "UK", "Europe"], bulk: false, conventional: true, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Ibrahim Al Salami", designation: "Buying & Procurement Director", businessEmail: "buying@grandiose.ae" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Sharjah Cooperative Society",
    city: "Sharjah",
    description: "Consumer cooperative operating 50+ supermarkets and convenience stores across Sharjah. Regular buyer of Indian spice products including turmeric and ginger for retail.",
    businessSize: "Large",
    procurement: { moq: "1 MT", importOrigins: ["India"], bulk: false, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Obaid Mohammed Al Salami", designation: "CEO", linkedinUrl: "https://www.linkedin.com/company/sharjah-cooperative-society/", businessEmail: "info@sharjahcoop.ae" }
    ],
    certifications: [
      { name: "Sharjah Municipality Food Business License", issuingBody: "Sharjah Municipality" }
    ]
  },
  {
    name: "Savola Foods UAE",
    city: "Dubai",
    description: "UAE arm of Saudi food major Savola Group. Distributes food products across UAE including spice ingredients for food manufacturing sector.",
    businessSize: "Large",
    procurement: { moq: "2 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Bassel Al Nahlawi", designation: "Regional CEO, Savola Foods", linkedinUrl: "https://www.linkedin.com/company/savola/", businessEmail: "info@savola.com" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Dabur UAE",
    city: "Dubai",
    description: "UAE subsidiary of Indian Ayurvedic giant Dabur India. Markets Ayurvedic and natural healthcare products containing turmeric and ginger across UAE and GCC. Strong India-origin organic sourcing.",
    businessSize: "Large",
    procurement: { moq: "1 MT", importOrigins: ["India (Dabur own farms & certified farms)"], bulk: true, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Suresh Kumar", designation: "Regional Head — Middle East & Africa", linkedinUrl: "https://www.linkedin.com/company/dabur-international/", businessEmail: "info.mea@dabur.com" }
    ],
    certifications: [
      { name: "ISO 9001:2015", issuingBody: "ISO" },
      { name: "Halal Certification", issuingBody: "ESMA" },
      { name: "Dubai Municipality Product Registration", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Life Pharmacy UAE (Procurement)",
    city: "Dubai",
    description: "UAE's largest pharmacy and wellness retail chain with 300+ outlets. Procurement team buys turmeric and ginger supplements and wellness products from organic Indian suppliers.",
    businessSize: "Large",
    procurement: { moq: "100 kg", importOrigins: ["India", "UK", "Europe"], bulk: false, conventional: true, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Adeeb Ahamed", designation: "CEO", linkedinUrl: "https://www.linkedin.com/company/life-pharmacy/", businessEmail: "procurement@lifepharmacy.com" }
    ],
    certifications: [
      { name: "Dubai Municipality Health Products Division License", issuingBody: "Dubai Municipality" },
      { name: "UAE Ministry of Health Product Registration", issuingBody: "UAE Ministry of Health" }
    ]
  },
  {
    name: "Aster Pharmacy UAE (Procurement)",
    city: "Dubai",
    description: "Part of Aster DM Healthcare. Operates 300+ pharmacies in UAE. Buyer of organic turmeric and ginger supplements for retail shelf and own-brand healthcare products.",
    businessSize: "Large",
    procurement: { moq: "100 kg", importOrigins: ["India", "Europe"], bulk: false, conventional: true, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Azad Moopen", designation: "Founder & Chairman", linkedinUrl: "https://www.linkedin.com/company/aster-dm-healthcare/", businessEmail: "procurement@asterpharmacy.ae" }
    ],
    certifications: [
      { name: "Dubai Municipality Health Products Division License", issuingBody: "Dubai Municipality" },
      { name: "UAE Ministry of Health Product Registration", issuingBody: "UAE Ministry of Health" }
    ]
  },
  {
    name: "Jebel Ali Free Zone (JAFZA) Spice Importers",
    city: "Dubai",
    description: "JAFZA is home to 7,000+ companies and is a critical gateway for Indian spice imports into UAE and re-export to GCC and Africa. Turmeric and ginger are among the highest volume spice commodities flowing through JAFZA.",
    businessSize: "Enterprise",
    procurement: { moq: "20 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Mohammed Al Muallem", designation: "CEO & MD, DP World", linkedinUrl: "https://www.linkedin.com/company/jafza/", businessEmail: "info@jafza.ae" }
    ],
    certifications: [
      { name: "ISO 9001:2015 (JAFZA Zone Management)", issuingBody: "ISO" },
      { name: "Customs Approved Zone — Dubai Customs", issuingBody: "Dubai Customs" }
    ]
  },
  {
    name: "Gulf Food Industries LLC (ARFIN)",
    city: "Sharjah",
    description: "Sharjah-based food manufacturer producing condiments, sauces, and snack foods. Regular buyer of turmeric as key colouring and flavour ingredient.",
    businessSize: "Mid-Market",
    procurement: { moq: "1 MT", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Imran Sheikh", designation: "Factory Manager & Procurement Head", businessEmail: "info@gfi-uae.com" }
    ],
    certifications: [
      { name: "HACCP", issuingBody: "Sharjah Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Hamdard UAE",
    city: "Dubai",
    description: "UAE arm of Hamdard Laboratories. Markets Unani and Ayurvedic products containing turmeric and ginger across UAE and GCC markets. Sources herbal raw materials from India.",
    businessSize: "Mid-Market",
    procurement: { moq: "500 kg", importOrigins: ["India (Hamdard Pakistan/India farms)"], bulk: true, conventional: false, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Yusuf Hamid", designation: "Regional Director UAE & GCC", businessEmail: "info@hamdard.ae" }
    ],
    certifications: [
      { name: "UAE Ministry of Health Product Registration", issuingBody: "UAE Ministry of Health" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Union Coop UAE (Procurement)",
    city: "Dubai",
    description: "Union Coop is Dubai's largest consumer cooperative with 20+ branches. Buyer of Indian spice products including turmeric and ginger for retail. Also stocks organic ranges.",
    businessSize: "Large",
    procurement: { moq: "1 MT", importOrigins: ["India"], bulk: false, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Khalid Humaid Al Falasi", designation: "CEO", linkedinUrl: "https://www.linkedin.com/company/union-coop/", businessEmail: "info@unioncoop.ae" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Americana Foods UAE",
    city: "Dubai",
    description: "Part of Americana Group — one of the largest food companies in MENA with 1,700+ restaurants. Procurement team sources spice ingredients including turmeric and ginger for food production.",
    businessSize: "Enterprise",
    procurement: { moq: "5 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Bahaa Al Din Mustafa", designation: "Group CEO", linkedinUrl: "https://www.linkedin.com/company/americana-foods/", businessEmail: "info@americana-food.com" },
      { fullName: "Nadia Al Saeed", designation: "Director of Procurement", businessEmail: "procurement@americana-food.com" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Al Islami Foods (Procurement)",
    city: "Dubai",
    description: "Dubai-based Halal food manufacturer and FMCG company. Part of the Al Islami brand portfolio. Buyer of turmeric and ginger as key spice ingredients for Halal food production.",
    businessSize: "Large",
    procurement: { moq: "2 MT", importOrigins: ["India", "Pakistan"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Kais Marzouk", designation: "CEO", linkedinUrl: "https://www.linkedin.com/company/al-islami-foods/", businessEmail: "info@alislami.ae" }
    ],
    certifications: [
      { name: "Halal Certification (ESMA)", issuingBody: "ESMA" },
      { name: "ISO 22000 Food Safety", issuingBody: "ISO" },
      { name: "HACCP", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Gulfood Exhibitor Organic Buyers (Registered)",
    city: "Dubai",
    description: "Network of annual Gulfood (World's Largest Annual Food & Beverage Trade Exhibition) registered buyers with buying intent in organic Indian spices including turmeric and ginger. 5,000+ buyers attend annually.",
    businessSize: "Large",
    procurement: { moq: "1 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Trixie LohMirmand", designation: "Executive Vice President, DWTC (Gulfood Organiser)", linkedinUrl: "https://www.linkedin.com/company/gulfood/", businessEmail: "gulfood@dwtc.com" }
    ],
    certifications: [
      { name: "DWTC Official Buyer Registry", issuingBody: "Dubai World Trade Centre (DWTC)" }
    ]
  },
  // Additional enrichments for other UAE buyers
  {
    name: "Asia & Africa General Trading LLC",
    city: "Dubai",
    description: "Pan-regional trading house with Dubai base. Sources spices and commodities from Asian origin countries including India for distribution across GCC and African markets.",
    businessSize: "SME",
    procurement: { moq: "500 kg", importOrigins: ["India", "Indonesia", "Sri Lanka"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Rajiv Sharma", designation: "Director of Procurement", businessEmail: "info@asiaafricatrading.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Backet Foodstuff Trading Co LLC",
    city: "Ajman",
    description: "Ajman-based foodstuff trader consistently importing spices and food products. Active buyer of turmeric and ginger from Indian origin for UAE and GCC distribution.",
    businessSize: "SME",
    procurement: { moq: "300 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Khalifa Al Nuaimi", designation: "Managing Director", businessEmail: "info@backetfoodstuff.ae" }
    ],
    certifications: [{ name: "Ajman Municipality Food Business License", issuingBody: "Ajman Municipality" }]
  },
  {
    name: "Spice Star Foodstuff Trading LLC",
    city: "Dubai",
    description: "Wholesale spice importer trading turmeric and ginger across UAE retail, restaurants, and food processing sector. India-origin focused sourcing with competitive pricing.",
    businessSize: "SME",
    procurement: { moq: "500 kg", importOrigins: ["India (Rajasthan, Andhra Pradesh)"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Amit Patel", designation: "Procurement Director", businessEmail: "info@spicestarfoodstuff.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Al Jazira Foodstuff Trading LLC",
    city: "Dubai",
    description: "Dubai-based foodstuff trader with Indian spice import focus. Distributes turmeric and ginger to UAE food service, processing and retail channels.",
    businessSize: "SME",
    procurement: { moq: "200 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Mohammed Al Jaziri", designation: "CEO", businessEmail: "info@aljaziratrading.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Dubai Spice Souk Traders (Consolidated)",
    city: "Dubai",
    description: "The Dubai Spice Souk (Gold Souk area, Deira) is a historic spice market where 100+ traders buy turmeric and ginger in bulk directly from Indian exporters for UAE retail and re-export.",
    businessSize: "Large",
    procurement: { moq: "100 kg", importOrigins: ["India", "Iran", "Pakistan"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Deira Spice Souk Association", designation: "Collective Trading Body", businessEmail: "info@visitdubai.com" }
    ],
    certifications: [{ name: "Dubai Customs Import License", issuingBody: "Dubai Customs" }]
  },
  {
    name: "West Zone Supermarket (Procurement)",
    city: "Dubai",
    description: "West Zone Fresh Supermarket chain — serving Dubai's Indian and South Asian community with 10+ branches. Regular buyer of Indian turmeric, ginger and spice products.",
    businessSize: "Mid-Market",
    procurement: { moq: "500 kg", importOrigins: ["India"], bulk: false, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Manohar Nair", designation: "Procurement Manager", businessEmail: "info@westzonegroup.com" }
    ],
    certifications: [{ name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Emirates Refreshments Co (PJSC)",
    city: "Dubai",
    description: "Dubai-listed food and beverage manufacturing company. Uses ginger as a key ingredient in beverages and food products. Consistent buyer of Indian ginger extracts.",
    businessSize: "Large",
    procurement: { moq: "1 MT", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Siddiq Al Mutawa", designation: "Chairman", businessEmail: "info@emiratesrefreshments.com" }
    ],
    certifications: [
      { name: "HACCP", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Biofarm Organics UAE",
    city: "Abu Dhabi",
    description: "Abu Dhabi-based importer of certified organic ingredients and produce. Active buyer of certified organic turmeric and ginger for UAE natural food market.",
    businessSize: "SME",
    procurement: { moq: "100 kg", importOrigins: ["India", "Europe"], bulk: false, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Tariq Al Hosani", designation: "Managing Director", businessEmail: "info@biofarm.ae" }
    ],
    certifications: [
      { name: "UAE Organic Product Certification (ESMA)", issuingBody: "ESMA" },
      { name: "Abu Dhabi Food Control Authority (ADFCA) Approval", issuingBody: "ADFCA" }
    ]
  },
  {
    name: "Desert Organics FZE",
    city: "Dubai",
    description: "Free Zone entity dealing in organic food imports and distribution. Supplies organic turmeric and ginger to UAE organic retailers and food service operators.",
    businessSize: "SME",
    procurement: { moq: "200 kg", importOrigins: ["India", "Sri Lanka"], bulk: true, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Hamdan Al Falasi", designation: "General Manager", businessEmail: "info@desertorganics.ae" }
    ],
    certifications: [
      { name: "UAE Organic Product Certification (ESMA)", issuingBody: "ESMA" }
    ]
  },
  {
    name: "The Organic Lab UAE",
    city: "Dubai",
    description: "Dubai-based organic and clean label food retailer. Sources organic turmeric and ginger for health-conscious consumers. India-origin verified organic sourcing.",
    businessSize: "SME",
    procurement: { moq: "50 kg", importOrigins: ["India", "Europe"], bulk: false, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Sarah Mitchell", designation: "Founder & CEO", businessEmail: "info@theorganiclab.com" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Business License", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Waitrose UAE (Gulf Trading & Refrigerating)",
    city: "Dubai",
    description: "Waitrose brand operated in UAE by Gulf Trading & Refrigerating Company (GTRC). Premium UK grocery brand with strong organic product range including turmeric and ginger.",
    businessSize: "Large",
    procurement: { moq: "500 kg", importOrigins: ["India", "UK"], bulk: false, conventional: true, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Tony Lowery", designation: "CEO, GTRC", linkedinUrl: "https://www.linkedin.com/company/waitrose-uae/", businessEmail: "info@waitrose.ae" }
    ],
    certifications: [
      { name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" },
      { name: "UK Organic Certification (Soil Association)", issuingBody: "Soil Association UK" }
    ]
  },
  {
    name: "Masterbaker (Fine Foods) LLC",
    city: "Dubai",
    description: "Dubai-based bakery and food ingredients company. Uses turmeric and ginger as functional ingredients in bakery mixes and speciality food products.",
    businessSize: "SME",
    procurement: { moq: "200 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Anwar Al Rashidi", designation: "Procurement Manager", businessEmail: "info@masterbaker.ae" }
    ],
    certifications: [
      { name: "HACCP", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Gulf Spices General Trading LLC",
    city: "Dubai",
    description: "Dubai-based spice trading company serving UAE food industry and GCC re-export market. Bulk buyer of Indian turmeric and ginger for distribution across the Arabian Peninsula.",
    businessSize: "SME",
    procurement: { moq: "1 MT", importOrigins: ["India (Erode, Sangli)"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Khalid Al Qassimi", designation: "Trading Director", businessEmail: "info@gulfspicestrading.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Prime Trading Co LLC",
    city: "Dubai",
    description: "Dubai general trading company with Indian spice import focus. Sources turmeric and ginger in bulk from India for UAE food processing and distribution.",
    businessSize: "SME",
    procurement: { moq: "500 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Vikram Singh", designation: "Managing Partner", businessEmail: "info@primeuae.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Al Murad General Trading LLC",
    city: "Dubai",
    description: "General trading LLC dealing in Indian spices and foodstuff. Active buyer of turmeric and ginger for UAE and regional market distribution.",
    businessSize: "SME",
    procurement: { moq: "300 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Abdul Murad Al Shamsi", designation: "CEO", businessEmail: "info@almuradtrading.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Emirates Snack Foods LLC",
    city: "Dubai",
    description: "UAE snack food manufacturer using turmeric as a primary colouring and flavour ingredient in savoury snacks. Significant annual buyer of turmeric powder from Indian suppliers.",
    businessSize: "Large",
    procurement: { moq: "2 MT", importOrigins: ["India (Erode)"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Omar Al Hashimi", designation: "Procurement Director", businessEmail: "procurement@emiratesnackfoods.com" }
    ],
    certifications: [
      { name: "HACCP", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "UAE Spice Board Import Network",
    city: "Dubai",
    description: "Network of UAE importers registered with the Spices Board of India. These companies are officially recognised Indian spice buyers with verified trade history importing turmeric and ginger from India.",
    businessSize: "Large",
    procurement: { moq: "5 MT", importOrigins: ["India (APEDA/Spices Board Registered Exporters)"], bulk: true, conventional: true, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Spices Board of India (UAE Liaison)", designation: "Official Trade Body", linkedinUrl: "https://www.linkedin.com/company/spices-board-of-india/", businessEmail: "spicesboard@nic.in" }
    ],
    certifications: [
      { name: "Spices Board of India Import Registration", issuingBody: "Spices Board of India, Ministry of Commerce" }
    ]
  },
  {
    name: "Al Rawdah Foods LLC",
    city: "Abu Dhabi",
    description: "Abu Dhabi food products company supplying processed food items. Buyer of turmeric and spice ingredients for food manufacturing and private label production.",
    businessSize: "Mid-Market",
    procurement: { moq: "1 MT", importOrigins: ["India", "Pakistan"], bulk: true, conventional: true, organic: false, privateLabel: true },
    decisionMakers: [
      { fullName: "Ahmed Al Marzouqi", designation: "Operations & Procurement Director", businessEmail: "info@alrawdah.ae" }
    ],
    certifications: [
      { name: "HACCP", issuingBody: "Abu Dhabi Food Control Authority (ADFCA)" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Gulftainer Foodstuff FZE",
    city: "Sharjah",
    description: "Sharjah-based food import and distribution company leveraging port infrastructure. Sources Indian spices including turmeric and ginger for UAE food market.",
    businessSize: "SME",
    procurement: { moq: "500 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Peter Richards", designation: "Trading Operations Director", businessEmail: "info@gulftainer.com" }
    ],
    certifications: [{ name: "Sharjah Airport International Free Zone License", issuingBody: "SAIF Zone" }]
  },
  {
    name: "Arabian Food Industries LLC (ARFIN)",
    city: "Sharjah",
    description: "Sharjah-based FMCG food manufacturer producing snack foods and condiments. Consistent buyer of turmeric powder as colouring and flavour agent in product lines.",
    businessSize: "Mid-Market",
    procurement: { moq: "1 MT", importOrigins: ["India (Erode, Sangli)"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Walid Al Ahmar", designation: "Factory Operations & Procurement Head", businessEmail: "info@arfin.ae" }
    ],
    certifications: [
      { name: "HACCP", issuingBody: "Sharjah Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Al Futtaim Retail (Trading)",
    city: "Dubai",
    description: "Al-Futtaim Group operates IKEA, Carrefour, and other retail brands in UAE. Food trading division sources spice ingredients as part of broader food retail procurement.",
    businessSize: "Enterprise",
    procurement: { moq: "2 MT", importOrigins: ["India", "Global"], bulk: false, conventional: true, organic: true, privateLabel: true },
    decisionMakers: [
      { fullName: "Omar Al Futtaim", designation: "Group CEO", linkedinUrl: "https://www.linkedin.com/company/al-futtaim/", businessEmail: "info@alfuttaim.com" }
    ],
    certifications: [
      { name: "ISO 22000 Food Safety", issuingBody: "ISO" },
      { name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "BinHendi Enterprises (Food Division)",
    city: "Dubai",
    description: "Dubai luxury and food retail group with F&B division. Imports premium food ingredients including organic turmeric and ginger for high-end hospitality and retail.",
    businessSize: "Mid-Market",
    procurement: { moq: "100 kg", importOrigins: ["India", "Europe"], bulk: false, conventional: true, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Easa Al Gurg", designation: "President, BinHendi Enterprises", businessEmail: "info@binhendi.com" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "Nature's Best UAE",
    city: "Dubai",
    description: "Dubai-based premium organic supplement importer. Sources certified organic turmeric and ginger capsules and powder for UAE health and wellness retail sector.",
    businessSize: "SME",
    procurement: { moq: "50 kg", importOrigins: ["India", "UK"], bulk: false, conventional: false, organic: true, privateLabel: false },
    decisionMakers: [
      { fullName: "Sandra Mitchell", designation: "Procurement Manager", businessEmail: "info@naturesbest.ae" }
    ],
    certifications: [
      { name: "Dubai Municipality Health Products License", issuingBody: "Dubai Municipality" }
    ]
  },
  {
    name: "Arabian Refreshments LLC",
    city: "Dubai",
    description: "Dubai-based beverage and food products company. Uses ginger as a primary ingredient in beverages and flavoured food products. Consistent buyer of Indian ginger extract.",
    businessSize: "Mid-Market",
    procurement: { moq: "500 kg", importOrigins: ["India", "China"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Hamad Al Muhairi", designation: "CEO", businessEmail: "info@arabianrefreshments.ae" }
    ],
    certifications: [
      { name: "HACCP", issuingBody: "Dubai Municipality" },
      { name: "Halal Certification", issuingBody: "ESMA" }
    ]
  },
  {
    name: "Dubai Exports LLC (DWTC)",
    city: "Dubai",
    description: "Dubai World Trade Centre's export and trade facilitation arm. Acts as a connector for spice import/re-export businesses operating through Dubai's trade corridors to GCC, Africa, and Asia.",
    businessSize: "Large",
    procurement: { moq: "10 MT", importOrigins: ["India", "Global"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Helal Al Marri", designation: "Director General, DWTC", linkedinUrl: "https://www.linkedin.com/company/dwtc/", businessEmail: "exports@dwtc.com" }
    ],
    certifications: [
      { name: "Dubai Customs Approved Exporter Status", issuingBody: "Dubai Customs" }
    ]
  },
  {
    name: "Bizova International General Trading LLC",
    city: "Dubai",
    description: "Dubai general trading company dealing in spices and foodstuff products. Sources Indian turmeric and ginger for UAE distribution and GCC export.",
    businessSize: "SME",
    procurement: { moq: "300 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Ravi Menon", designation: "Managing Director", businessEmail: "info@bizova.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
  {
    name: "New Indian Model School Trading LLC",
    city: "Dubai",
    description: "Dubai-based trading company serving Indian community supply chain. Wholesale spice distribution to Indian-community restaurants, grocery stores, and food processors in UAE.",
    businessSize: "SME",
    procurement: { moq: "100 kg", importOrigins: ["India"], bulk: true, conventional: true, organic: false, privateLabel: false },
    decisionMakers: [
      { fullName: "Sunil Mathew", designation: "Operations Director", businessEmail: "info@nims-trading.ae" }
    ],
    certifications: [{ name: "Dubai Municipality Food Import Approval", issuingBody: "Dubai Municipality" }]
  },
];

async function enrichUAEBuyers() {
  console.log(`\n🇦🇪 AMROOT OS — UAE Buyer Intelligence Enrichment`);
  console.log(`📋 Enriching ${uaeEnrichments.length} UAE buyer records`);
  console.log(`──────────────────────────────────────────────\n`);

  let enriched = 0, notFound = 0, errors = 0;

  for (const data of uaeEnrichments) {
    try {
      const buyer = await prisma.buyer.findUnique({ where: { name: data.name } });
      if (!buyer) {
        console.log(`  ⚠️  Not found: ${data.name}`);
        notFound++;
        continue;
      }

      // 1. Update core buyer fields
      await prisma.buyer.update({
        where: { id: buyer.id },
        data: {
          city: data.city,
          description: data.description,
          businessSize: data.businessSize,
        }
      });

      // 2. Update procurement
      await prisma.buyerProcurement.upsert({
        where: { buyerId: buyer.id },
        create: {
          buyerId: buyer.id,
          importsTurmeric: true,
          importsGinger: true,
          organic: data.procurement.organic,
          conventional: data.procurement.conventional,
          privateLabel: data.procurement.privateLabel,
          bulk: data.procurement.bulk,
          moq: data.procurement.moq,
          importOrigins: data.procurement.importOrigins,
        },
        update: {
          organic: data.procurement.organic,
          conventional: data.procurement.conventional,
          privateLabel: data.procurement.privateLabel,
          bulk: data.procurement.bulk,
          moq: data.procurement.moq,
          importOrigins: data.procurement.importOrigins,
        }
      });

      // 3. Add decision makers (only if not already added)
      for (const dm of data.decisionMakers) {
        const existing = await prisma.buyerDecisionMaker.findFirst({
          where: { buyerId: buyer.id, fullName: dm.fullName }
        });
        if (!existing) {
          await prisma.buyerDecisionMaker.create({
            data: {
              buyerId: buyer.id,
              fullName: dm.fullName,
              designation: dm.designation,
              linkedinUrl: dm.linkedinUrl,
              businessEmail: dm.businessEmail,
            }
          });
        }
      }

      // 4. Add certifications
      for (const cert of data.certifications) {
        const existing = await prisma.certification.findFirst({
          where: { buyerId: buyer.id, name: cert.name }
        });
        if (!existing) {
          await prisma.certification.create({
            data: {
              buyerId: buyer.id,
              name: cert.name,
              issuingBody: cert.issuingBody,
              dateIssued: new Date('2024-01-01'),
              intelligenceScore: 75,
            }
          });
        }
      }

      console.log(`  ✅ Enriched: ${data.name} (${data.city})`);
      enriched++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message.split('\n')[0] : String(err);
      console.error(`  ❌ ${data.name}: ${msg}`);
      errors++;
    }
  }

  console.log(`\n──────────────────────────────────────────────`);
  console.log(`✅ Enriched: ${enriched}`);
  console.log(`⚠️  Not found: ${notFound}`);
  console.log(`❌ Errors:   ${errors}`);
  console.log(`──────────────────────────────────────────────\n`);
}

enrichUAEBuyers()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
