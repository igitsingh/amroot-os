import sys

with open('src/app/competitors/CompetitorDossier.tsx', 'r') as f:
    content = f.read()

# 7. Marketing Claims
content = content.replace(
    'isMaatru ? "A2 Ghee, Stone-ground, Artisanal, Heritage, 1857 Recipes, Chemical-free" : null',
    'isMaatru ? "A2 Ghee, Stone-ground, Artisanal, Heritage, 1857 Recipes, Chemical-free" : isTwoBrothers ? "Regenerative Organic, Chemical-free, Fourth-Generation Farmers, Village-made" : null'
)

# 8. Social Media
maatru_social = """                      <div className="text-xl font-bold text-white mt-1">~5,000</div>
                    </div>
                  </div>
                ) : ("""

tb_social = """                      <div className="text-xl font-bold text-white mt-1">~5,000</div>
                    </div>
                  </div>
                ) : isTwoBrothers ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded border border-white/10 bg-white/[0.02]">
                      <div className="text-[10px] uppercase font-mono text-white/40 mb-1">Instagram</div>
                      <div className="text-xl font-bold text-white">~350K</div>
                      <div className="text-xs text-emerald-400 mt-1">Highly Active</div>
                    </div>
                    <div className="p-4 rounded border border-white/10 bg-white/[0.02]">
                      <div className="text-[10px] uppercase font-mono text-white/40 mb-1">Facebook</div>
                      <div className="text-xl font-bold text-white">~150K</div>
                      <div className="text-xs text-emerald-400 mt-1">Highly Active</div>
                    </div>
                    <div className="p-4 rounded border border-white/10 bg-white/[0.02]">
                      <div className="text-[10px] uppercase font-mono text-white/40 mb-1">YouTube</div>
                      <div className="text-xl font-bold text-white">~50K</div>
                      <div className="text-xs text-emerald-400 mt-1">Active</div>
                    </div>
                    <div className="p-4 rounded border border-white/10 bg-white/[0.02]">
                      <div className="text-[10px] uppercase font-mono text-white/40 mb-1">Newsletter</div>
                      <div className="text-xl font-bold text-white mt-1">Active</div>
                    </div>
                  </div>
                ) : ("""
content = content.replace(maatru_social, tb_social, 1)

# 9. Website Intelligence
content = content.replace(
    'isMaatru ? "Shopify" : null',
    'isMaatru ? "Shopify" : isTwoBrothers ? "Shopify" : null'
)
content = content.replace(
    'isMaatru ? "Slow, Traditional, Heritage" : null',
    'isMaatru ? "Slow, Traditional, Heritage" : isTwoBrothers ? "Farm-to-home, Rustic yet Premium" : null'
)
content = content.replace(
    'isMaatru ? "4.5 / 10" : null',
    'isMaatru ? "4.5 / 10" : isTwoBrothers ? "8.5 / 10" : null'
)

# 15. SWOT
maatru_swot = """                      <ul className="list-disc pl-4 space-y-2 mt-2 text-white/70">
                        <li>Vulnerable to highly polished D2C brands taking market share.</li>
                        <li>Small scale operations may limit broad distribution.</li>
                      </ul>
                    </div>
                  </div>
                ) : ("""

tb_swot = """                      <ul className="list-disc pl-4 space-y-2 mt-2 text-white/70">
                        <li>Vulnerable to highly polished D2C brands taking market share.</li>
                        <li>Small scale operations may limit broad distribution.</li>
                      </ul>
                    </div>
                  </div>
                ) : isTwoBrothers ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 border border-emerald-500/20 bg-emerald-500/5 rounded-lg">
                      <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2"><ArrowRight className="w-4 h-4"/> Strengths</h4>
                      <ul className="list-disc pl-4 space-y-2 mt-2 text-white/70">
                        <li>Exceptional founder story and authenticity (4th gen farmers).</li>
                        <li>Strong community trust and organic reach.</li>
                        <li>High variety in product portfolio driving basket size.</li>
                      </ul>
                    </div>
                    <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-lg">
                      <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2"><ArrowRight className="w-4 h-4"/> Weaknesses</h4>
                      <ul className="list-disc pl-4 space-y-2 mt-2 text-white/70">
                        <li>High price point compared to mass market organic brands.</li>
                        <li>Availability constraints for certain seasonal products.</li>
                      </ul>
                    </div>
                    <div className="p-5 border border-blue-500/20 bg-blue-500/5 rounded-lg">
                      <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2"><ArrowRight className="w-4 h-4"/> Opportunities</h4>
                      <ul className="list-disc pl-4 space-y-2 mt-2 text-white/70">
                        <li>Expanding further into international markets (already in 40+).</li>
                        <li>Introducing more standardized lab testing claims for superfoods.</li>
                      </ul>
                    </div>
                    <div className="p-5 border border-orange-500/20 bg-orange-500/5 rounded-lg">
                      <h4 className="text-orange-400 font-bold mb-3 flex items-center gap-2"><ArrowRight className="w-4 h-4"/> Threats</h4>
                      <ul className="list-disc pl-4 space-y-2 mt-2 text-white/70">
                        <li>Proliferation of cheaper "organic" brands diluting the premium tag.</li>
                        <li>Climate change impacting farm yields directly.</li>
                      </ul>
                    </div>
                  </div>
                ) : ("""
content = content.replace(maatru_swot, tb_swot, 1)

# 16. Amroot Strategy
maatru_strat = """                      <p className="mt-2 text-sm text-white/70 leading-relaxed">
                        Their digital presence and packaging are outdated. Amroot can easily win on aesthetics, modern convenience, and scientific validation (lab reports), appealing to the younger, health-conscious demographic while respecting the heritage aspect.
                      </p>
                    </div>
                  </div>
                ) : ("""

tb_strat = """                      <p className="mt-2 text-sm text-white/70 leading-relaxed">
                        Their digital presence and packaging are outdated. Amroot can easily win on aesthetics, modern convenience, and scientific validation (lab reports), appealing to the younger, health-conscious demographic while respecting the heritage aspect.
                      </p>
                    </div>
                  </div>
                ) : isTwoBrothers ? (
                  <div className="space-y-6">
                    <div className="p-6 border border-white/10 bg-white/[0.02] rounded-lg">
                      <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        How to beat Two Brothers Organic Farms?
                      </h4>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">
                        Two Brothers excels in the "Farmer/Village" authenticity narrative. To compete, Amroot must lean heavily into the "Scientific/Lab-Verified" and "Clinical Grade" angle. While they sell rustic farm goods, we sell high-performance, precision-dosed wellness. 
                      </p>
                      <p className="mt-4 text-sm text-white/70 leading-relaxed">
                        Additionally, we can beat them on aesthetic luxury. Their branding is premium but earthy; Amroot should aim for a sleek, modern, ultra-premium look that feels like a high-end supplement or cosmetic, rather than a farm product.
                      </p>
                    </div>
                  </div>
                ) : ("""
content = content.replace(maatru_strat, tb_strat, 1)

with open('src/app/competitors/CompetitorDossier.tsx', 'w') as f:
    f.write(content)

