const fs = require('fs');
const path = 'src/app/competitors/CompetitorDossier.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add Pricing and Packaging Intelligence to the render block

const pricingAndPackaging = `
            {/* DOMAIN 4: PACKAGING INTELLIGENCE */}
            {activeSection.includes("Packaging Intelligence") && (
              <div className="space-y-6">
                {isDiaspora ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    <Field label="Primary Material" value="Glass Jar / Tin Box" verified />
                    <Field label="Luxury Score" value="9.2 / 10" verified />
                    <Field label="Shelf Impact" value="High (Vibrant Colors)" verified />
                    <Field label="Eco Score" value="8.5 / 10 (Recyclable)" />
                    <Field label="Label Design" value="Minimalist, bold typography" />
                    <Field label="Brand Colors" value="Deep Yellow, Red, Green" verified />
                    <Field label="Unboxing Experience" value="Ultra Premium" />
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center border border-white/5 bg-white/[0.01] rounded-lg border-dashed">
                    <ShieldAlert className="w-8 h-8 text-white/10 mb-4" />
                    <h4 className="text-white/40 font-mono text-sm uppercase tracking-widest mb-2">Evidence Required</h4>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 5: PRICING INTELLIGENCE */}
            {activeSection.includes("Pricing Intelligence") && (
              <div className="space-y-6">
                {isDiaspora ? (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                      <Field label="Premium Positioning" value="Ultra Premium" verified />
                      <Field label="Website Price (Avg)" value="$12.00 - $24.00" verified />
                      <Field label="Retail Price" value="$14.99 (Estimated)" />
                      <Field label="Cost per 100g (Turmeric)" value="$18.46" verified />
                    </div>
                    
                    <h4 className="text-white font-bold mt-6 mb-4">SKU Price Breakdown</h4>
                    <div className="border border-white/10 rounded-lg overflow-hidden">
                      <table className="w-full text-left text-sm font-mono text-white/70">
                        <thead className="bg-[#0F0F0F] text-[10px] uppercase text-white/40 tracking-widest">
                          <tr>
                            <th className="px-4 py-3">Product Name</th>
                            <th className="px-4 py-3">Weight</th>
                            <th className="px-4 py-3">Website Price</th>
                            <th className="px-4 py-3">Cost / Gram</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          <tr>
                            <td className="px-4 py-3 font-medium text-white">Pragati Turmeric</td>
                            <td className="px-4 py-3">65g</td>
                            <td className="px-4 py-3">$12.00</td>
                            <td className="px-4 py-3">$0.18 / g</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-white">Kashmiri Saffron</td>
                            <td className="px-4 py-3">1g</td>
                            <td className="px-4 py-3">$24.00</td>
                            <td className="px-4 py-3">$24.00 / g</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-white">Garam Masala</td>
                            <td className="px-4 py-3">60g</td>
                            <td className="px-4 py-3">$14.00</td>
                            <td className="px-4 py-3">$0.23 / g</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center border border-white/5 bg-white/[0.01] rounded-lg border-dashed">
                    <ShieldAlert className="w-8 h-8 text-white/10 mb-4" />
                    <h4 className="text-white/40 font-mono text-sm uppercase tracking-widest mb-2">Evidence Required</h4>
                  </div>
                )}
              </div>
            )}
`;

// Insert before DOMAIN 6
content = content.replace('{/* DOMAIN 6: BRAND POSITIONING */}', pricingAndPackaging + '\n            {/* DOMAIN 6: BRAND POSITIONING */}');

// Update the catch-all array
content = content.replace('!["Company Profile", "Product Portfolio", "Curcumin Information", "Brand Positioning", "Amroot Strategy"].some(t => activeSection.includes(t))', 
'!["Company Profile", "Product Portfolio", "Curcumin Information", "Packaging Intelligence", "Pricing Intelligence", "Brand Positioning", "Amroot Strategy"].some(t => activeSection.includes(t))');

fs.writeFileSync(path, content, 'utf8');
