export type VerificationStatus = 'Verified' | 'Pending' | 'Conflict' | 'Unknown' | 'Not Publicly Available';
export type SourceType = 'Official' | 'Third-Party' | 'Inference' | 'Internal' | 'Unknown';
export type ConfidenceScore = number; // 0-100. 100=Official, 95=Official+Secondary, 85=Multiple 3rd Party, 25=Inference, 0=Unknown

export interface ProvenanceTracker {
  id: string;
  source: string;
  sourceUrl: string;
  sourceType: SourceType;
  dateCollected: string; // ISO string
  dateLastVerified: string;
  confidenceScore: ConfidenceScore; 
  verificationStatus: VerificationStatus;
  notes?: string; 
}

// ----------------------------------------------------------------------------
// Core Entities
// ----------------------------------------------------------------------------

export type OrganizationRole = 
  | 'Competitor Brand' 
  | 'Manufacturer' 
  | 'Exporter' 
  | 'Importer' 
  | 'Distributor' 
  | 'Retailer' 
  | 'Laboratory' 
  | 'Certification Body' 
  | 'Packaging Supplier' 
  | 'Freight Partner';

export interface Organization extends ProvenanceTracker {
  name: string;
  roles: OrganizationRole[];
  legalEntity?: string;
  foundingYear?: number;
  headquarters?: string;
  originStory?: string;
  targetDemographic?: string;
  marketPositioning?: string;
  websiteUrl?: string;
  socialLinks?: Record<string, string>;
  manufacturingLicenses?: string[];
  swotAnalysis?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  paradiseOpportunity?: string; // Analysis of how Amroot can win against this entity
}

export interface Product extends ProvenanceTracker {
  organizationId: string; // Links to Organization
  name: string;
  spiceType: string; 
  originRegion?: string; 
  processingMethod?: string;
  claimedCurcuminPercent?: number | string; 
  ingredients?: string[]; // Ingredient declarations
  labelClaims?: string[]; // e.g. "Non-GMO", "Gluten-Free"
  certifications?: string[]; // Array of Certification IDs
}

export interface SKU extends ProvenanceTracker {
  productId: string; 
  name: string; 
  weightGrams?: number;
  packagingMaterial?: string; 
  dimensions?: string;
}

// ----------------------------------------------------------------------------
// Scientific & Testing Data
// ----------------------------------------------------------------------------

export interface LabReport extends ProvenanceTracker {
  productId: string;
  laboratoryId?: string; // Links to Organization (role: Laboratory)
  testDate?: string;
  reportId?: string;
  
  // Phytochemical Profile
  curcuminPercent?: number;
  volatileOilPercent?: number;
  moisturePercent?: number;
  
  // Heavy Metals (ppm)
  leadPpm?: number;
  arsenicPpm?: number;
  cadmiumPpm?: number;
  mercuryPpm?: number;
  
  // Microbiology (CFU/g)
  salmonella?: 'Negative' | 'Positive' | string;
  eColi?: 'Negative' | 'Positive' | string;
  yeastMoldCfu?: number;
  
  // Pesticides
  pesticideResidues?: 'Pass' | 'Fail' | string;
  
  pdfAssetId?: string; // Links to an Asset/Document
}

export interface InternalSample extends ProvenanceTracker {
  targetOrganizationId: string; 
  targetProductId?: string;
  sampleDate: string;
  sensoryEvaluation: {
    color: number; // 1-10
    aroma: number; // 1-10
    taste: number; // 1-10
    texture: number; // 1-10
  };
  internalNotes: string;
  internalLabReportId?: string; // Links to LabReport
}

export interface ScientificPaper extends ProvenanceTracker {
  title: string;
  authors: string[];
  journal: string;
  publicationDate: string;
  doi?: string;
  abstract: string;
  relevanceToParadise: string;
  pdfAssetId?: string;
}

// ----------------------------------------------------------------------------
// Market Intelligence & Compliance
// ----------------------------------------------------------------------------

export interface Certification extends ProvenanceTracker {
  organizationId: string;
  certificationBodyId?: string; // Links to Organization (role: Certification Body)
  name: string; // e.g. 'FSSAI', 'APEDA', 'USDA Organic'
  registrationNumber?: string;
  validityStartDate?: string;
  validityEndDate?: string;
  pdfAssetId?: string;
}

export interface MarketTrend extends ProvenanceTracker {
  title: string;
  category: 'Pricing' | 'Consumer Demand' | 'Regulatory' | 'Supply Chain';
  description: string;
  impactOnParadise: 'High' | 'Medium' | 'Low';
}

export interface Event extends ProvenanceTracker {
  name: string;
  eventType: 'Trade Fair' | 'Exhibition' | 'Conference';
  location: string;
  startDate: string;
  endDate: string;
  participants: string[]; // Array of Organization IDs
  keyTakeaways?: string;
}

export interface PricingHistory extends ProvenanceTracker {
  skuId: string;
  price: number;
  currency: string;
  pricePerGram: number; 
  channel: 'Direct to Consumer' | 'Amazon' | 'Wholesale' | 'Retail Store';
  isDiscounted: boolean;
  availabilityStatus: 'In Stock' | 'Out of Stock' | 'Discontinued';
}

// ----------------------------------------------------------------------------
// Documents & Assets
// ----------------------------------------------------------------------------

export interface DocumentAsset extends ProvenanceTracker {
  linkedEntityId: string; // Can link to Org, Product, SKU, etc.
  title: string;
  documentType: 'Technical Data Sheet' | 'MSDS/SDS' | 'Brochure' | 'Catalog' | 'COA' | 'Image';
  fileUrl: string; // Path or URL
  isInternalOnly: boolean;
}
