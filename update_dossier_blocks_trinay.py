import sys

with open('src/app/competitors/CompetitorDossier.tsx', 'r') as f:
    content = f.read()

# Product Portfolio
tb_portfolio_end = """                      </tbody>
                    </table>
                  </div>
                ) : ("""

trinay_portfolio = """                      </tbody>
                    </table>
                  </div>
                ) : isTrinay ? (
                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm font-mono text-white/70">
                      <thead className="bg-[#0F0F0F] text-[10px] uppercase text-white/40 tracking-widest">
                        <tr>
                          <th className="px-4 py-3">Product Name</th>
                          <th className="px-4 py-3">SKU Variant</th>
                          <th className="px-4 py-3">Weight</th>
                          <th className="px-4 py-3">MRP</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-4 py-3 font-medium text-white">Turmeric / Haldi Powder</td>
                          <td className="px-4 py-3">Pouch / Box</td>
                          <td className="px-4 py-3">100g - 250g</td>
                          <td className="px-4 py-3">~ ₹80</td>
                          <td className="px-4 py-3 text-emerald-400">Active</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : ("""
content = content.replace(tb_portfolio_end, trinay_portfolio, 1)

# Packaging Intelligence
tb_packaging_end = """                    <Field label="Brand Colors" value="Off-white, Deep Yellow, Brown" verified />
                    <Field label="Unboxing Experience" value="Premium" />
                  </div>
                ) : ("""

trinay_packaging = """                    <Field label="Brand Colors" value="Off-white, Deep Yellow, Brown" verified />
                    <Field label="Unboxing Experience" value="Premium" />
                  </div>
                ) : isTrinay ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    <Field label="Primary Material" value="Unknown" />
                    <Field label="Luxury Score" value="N/A" />
                    <Field label="Shelf Impact" value="N/A" />
                    <Field label="Eco Score" value="Unknown" />
                    <Field label="Label Design" value="Standard Ayurvedic" />
                    <Field label="Brand Colors" value="Unknown" />
                    <Field label="Unboxing Experience" value="Standard" />
                  </div>
                ) : ("""
content = content.replace(tb_packaging_end, trinay_packaging, 1)

# Pricing Intelligence
tb_pricing_end = """                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : ("""

trinay_pricing = """                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : isTrinay ? (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                      <Field label="Premium Positioning" value="Standard Mass" verified />
                      <Field label="Website Price (Avg)" value="~ ₹80" />
                      <Field label="Retail Price" value="Unknown" />
                      <Field label="Cost per 100g (Turmeric)" value="₹80" />
                    </div>
                  </>
                ) : ("""
content = content.replace(tb_pricing_end, trinay_pricing, 1)

# Marketing Claims
content = content.replace(
    'isTwoBrothers ? "Regenerative Organic, Chemical-free, Fourth-Generation Farmers, Village-made" : null',
    'isTwoBrothers ? "Regenerative Organic, Chemical-free, Fourth-Generation Farmers, Village-made" : isTrinay ? "100% Natural, Ayurvedic, 95% Curcuminoids, Pesticide-free" : null'
)

# Amroot Strategy 
tb_strat_end = """                        Additionally, we can beat them on aesthetic luxury. Their branding is premium but earthy; Amroot should aim for a sleek, modern, ultra-premium look that feels like a high-end supplement or cosmetic, rather than a farm product.
                      </p>
                    </div>
                  </div>
                ) : ("""

trinay_strat = """                        Additionally, we can beat them on aesthetic luxury. Their branding is premium but earthy; Amroot should aim for a sleek, modern, ultra-premium look that feels like a high-end supplement or cosmetic, rather than a farm product.
                      </p>
                    </div>
                  </div>
                ) : isTrinay ? (
                  <div className="space-y-6">
                    <div className="p-6 border border-white/10 bg-white/[0.02] rounded-lg">
                      <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        How to beat Trinay Ayurveda?
                      </h4>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">
                        Trinay competes in the standard Ayurvedic supplement market. They do not have the high-end luxury appeal or the verifiable Lakadong GI story. Amroot can out-position them purely on brand aesthetics, modern science, and absolute premium quality, treating turmeric as an advanced nutraceutical rather than a basic herbal powder.
                      </p>
                    </div>
                  </div>
                ) : ("""
content = content.replace(tb_strat_end, trinay_strat, 1)

with open('src/app/competitors/CompetitorDossier.tsx', 'w') as f:
    f.write(content)

