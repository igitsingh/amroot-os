const fs = require('fs');
const path = require('path');

const SUPPLIERS_FILE = path.join(__dirname, '../src/db/intelligence/suppliers/suppliers.json');
const suppliersData = JSON.parse(fs.readFileSync(SUPPLIERS_FILE, 'utf-8'));

const index = suppliersData.findIndex(s => s.id === 'supplier-nahar-organics');

if (index !== -1) {
  const nahar = suppliersData[index];
  
  nahar.socialMedia = {
    ...nahar.socialMedia,
    youtube: "https://youtube.com/@naharorganics3798",
    facebook: "https://facebook.com/NaharOrganics",
    instagram: "https://instagram.com/nahar_organics"
  };
  
  // Adding the new WhatsApp number to primaryContact
  if (!nahar.primaryContact.phone.includes("74170 01236")) {
    nahar.primaryContact.phone += " / +91-7417001236";
  }

  // Adding other details found on social media
  nahar.bio = "Nahar Organics is engaged in providing the quality products Spices, Herbs, Staple foods/grains, Essential Oil and fruits/Nuts. Deals in exotic spices and herbs.";
  
  fs.writeFileSync(SUPPLIERS_FILE, JSON.stringify(suppliersData, null, 2));
  console.log("Successfully updated Nahar Organics with social media and WhatsApp information.");
} else {
  console.log("Nahar Organics not found in suppliers.json");
}
