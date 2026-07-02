const fs = require('fs');
const path = require('path');

const SUPPLIERS_FILE = path.join(__dirname, '../src/db/intelligence/suppliers/suppliers.json');
const suppliersData = JSON.parse(fs.readFileSync(SUPPLIERS_FILE, 'utf-8'));

const index = suppliersData.findIndex(s => s.id === 'supplier-nahar-organics');

if (index !== -1) {
  const nahar = suppliersData[index];
  
  // Updating Address and adding Branch Office
  nahar.location = "Corporate: Guwahati, Assam | Branch: Lucknow, UP";
  nahar.addresses = [
    { type: 'Corporate Office', address: 'Office No-103, 1st Floor, DN Tower, Basistha Chariali, NH-37, PS- Baisistha, Guwahati, Assam 781029, India' },
    { type: 'Branch Office', address: '304, Oel Shalimar Apartment, Old Hyderabad, Near Hanuman Setu, Lucknow, UP 226007, India' }
  ];

  // Update Certifications
  const newCertifications = [
    "FSSAI", 
    "APEDA", 
    "Spices Board India", 
    "India Organic", 
    "USDA Organic", 
    "REACH Compliant", 
    "HACCP Certified"
  ];
  nahar.certifications = Array.from(new Set([...nahar.certifications, ...newCertifications]));

  // Update Contacts
  nahar.additionalContacts = [
    {
      department: "Purchase (Business Development Manager)",
      phone: "+91 92879 96189",
      email: "purchase@naharorganics.com"
    },
    {
      department: "Sale To Nahar (Sourcing - Manager)",
      phone: "+91 92879 99650",
      email: "sales@naharorganics.com"
    },
    {
      department: "Documentation (Manager - Operations & Accounts Head)",
      phone: "+91 93955 46193",
      email: "sales@naharorganics.com"
    },
    {
      department: "General Enquiries",
      phone: "+91 92879 81708 / +91 361 2735142",
      email: "info@naharorganics.com"
    }
  ];

  // Update Products/Specs based on product page
  nahar.qualitySpecs += " | Turmeric (Curcuma Longa) - Organic, Whole, Sun-Dried. Ethically sourced via contract farming from North East India. Available in bulk & custom packing.";

  fs.writeFileSync(SUPPLIERS_FILE, JSON.stringify(suppliersData, null, 2));
  console.log("Successfully updated Nahar Organics with detailed information from website screenshots.");
} else {
  console.log("Nahar Organics not found in suppliers.json");
}
