const fs = require('fs');
const path = '/Users/isachinsingh/Desktop/AMROOT-OS/src/app/brand/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Rename BRAND_COLORS to INITIAL_BRAND_COLORS outside component
content = content.replace('const BRAND_COLORS = {', 'const INITIAL_BRAND_COLORS = {');

// 2. Add editable states inside component
const stateVars = `
  // Editable content states
  const [brandColors, setBrandColors] = useState(INITIAL_BRAND_COLORS);
  
  const [typography, setTypography] = useState({
    name: 'Orbitron',
    desc: 'The exclusive typeface for Amroot Organics. Used across all headers, interfaces, and print materials.',
    primary: 'Orbitron Black (Primary Font)',
    secondary: 'Orbitron Normal (Secondary Font)'
  });
  const [isEditingTypography, setIsEditingTypography] = useState(false);

  const [voiceItems, setVoiceItems] = useState([
    'Authoritative & Scientific',
    'Premium & Refined',
    'Transparent & Traceable'
  ]);
  const [isEditingVoice, setIsEditingVoice] = useState(false);
`;
content = content.replace('const [finalisedAudit, setFinalisedAudit] = useState(false);', 'const [finalisedAudit, setFinalisedAudit] = useState(false);\n' + stateVars);

// 3. Replace all remaining BRAND_COLORS. with brandColors.
content = content.replace(/BRAND_COLORS\./g, 'brandColors.');

// 4. Update the Color block UI to add <input type="color">
content = content.replace(
  '<div className="h-32 w-full flex items-center justify-center text-white/50 text-sm font-medium" style={{ backgroundColor: brandColors.primary }}>',
  '<div className="h-32 w-full flex items-center justify-center text-white/50 text-sm font-medium relative" style={{ backgroundColor: brandColors.primary }}>\n                    <input type="color" value={brandColors.primary} onChange={(e) => setBrandColors({...brandColors, primary: e.target.value})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />'
);

content = content.replace(
  '<div className="h-32 w-full flex items-center justify-center text-[#2D3142]/30 text-sm font-medium" style={{ backgroundColor: brandColors.secondary }}>',
  '<div className="h-32 w-full flex items-center justify-center text-[#2D3142]/30 text-sm font-medium relative" style={{ backgroundColor: brandColors.secondary }}>\n                    <input type="color" value={brandColors.secondary} onChange={(e) => setBrandColors({...brandColors, secondary: e.target.value})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />'
);

content = content.replace(
  '<div className="h-32 w-full flex items-center justify-center text-white/50 text-sm font-medium" style={{ backgroundColor: brandColors.accent }}>',
  '<div className="h-32 w-full flex items-center justify-center text-white/50 text-sm font-medium relative" style={{ backgroundColor: brandColors.accent }}>\n                    <input type="color" value={brandColors.accent} onChange={(e) => setBrandColors({...brandColors, accent: e.target.value})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />'
);

// 5. Update Typography section
const typographySection = `
                <h3 className="text-xl font-bold text-[#2D3142] mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#2D3142]/5 flex items-center justify-center">
                      <span className="font-bold text-lg text-[#F16775]">Aa</span>
                    </div>
                    Typography
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsEditingTypography(!isEditingTypography)}
                      className="text-xs font-bold uppercase tracking-wider text-[#2D3142]/50 hover:text-[#2D3142]"
                    >
                      {isEditingTypography ? 'Done' : 'Edit'}
                    </button>
                    <button 
                      onClick={() => setFinalisedTypography(!finalisedTypography)}
                      className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors \${finalisedTypography ? 'bg-[#034F46] text-white' : 'bg-[#034F46]/5 text-[#034F46] hover:bg-[#034F46]/10'}\`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {finalisedTypography ? 'Finalised' : 'Mark Final'}
                    </button>
                  </div>
                </h3>
                <div className="p-6 rounded-2xl bg-[#F4F1EA] border border-[#2D3142]/5">
                  {isEditingTypography ? (
                    <div className="flex flex-col gap-4">
                      <input type="text" value={typography.name} onChange={e => setTypography({...typography, name: e.target.value})} className="w-full bg-transparent border-b border-[#2D3142]/20 text-4xl font-black text-[#2D3142] mb-2 font-[family-name:var(--font-orbitron)] focus:outline-none" />
                      <textarea value={typography.desc} onChange={e => setTypography({...typography, desc: e.target.value})} className="w-full bg-transparent border border-[#2D3142]/20 rounded-md p-2 text-sm text-[#2D3142]/60 focus:outline-none" rows={2} />
                      <input type="text" value={typography.primary} onChange={e => setTypography({...typography, primary: e.target.value})} className="w-full bg-transparent border-b border-[#2D3142]/20 text-2xl font-black text-[#2D3142] focus:outline-none" />
                      <input type="text" value={typography.secondary} onChange={e => setTypography({...typography, secondary: e.target.value})} className="w-full bg-transparent border-b border-[#2D3142]/20 text-sm font-normal text-[#2D3142] focus:outline-none" />
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl font-black text-[#2D3142] mb-2 font-[family-name:var(--font-orbitron)]">{typography.name}</div>
                      <div className="text-sm text-[#2D3142]/60 leading-relaxed mb-4">{typography.desc}</div>
                      <div className="flex flex-col gap-2">
                        <div className="text-2xl font-black text-[#2D3142]">{typography.primary}</div>
                        <div className="text-sm font-normal text-[#2D3142]">{typography.secondary}</div>
                      </div>
                    </>
                  )}
                </div>
`;
content = content.replace(/<h3 className="text-xl font-bold text-\[\#2D3142\] mb-6 flex items-center justify-between">[\s\S]*?<div className="text-sm font-normal text-\[\#2D3142\]">Orbitron Normal \(Secondary Font\)<\/div>\n                      <\/div>\n                    <\/div>/, typographySection.trim());

// 6. Update Brand Voice section
const voiceSection = `
                <h3 className="text-xl font-bold text-[#2D3142] mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#2D3142]/5 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-[#F16775]" />
                    </div>
                    Brand Voice
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsEditingVoice(!isEditingVoice)}
                      className="text-xs font-bold uppercase tracking-wider text-[#2D3142]/50 hover:text-[#2D3142]"
                    >
                      {isEditingVoice ? 'Done' : 'Edit'}
                    </button>
                    <button 
                      onClick={() => setFinalisedVoice(!finalisedVoice)}
                      className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors \${finalisedVoice ? 'bg-[#034F46] text-white' : 'bg-[#034F46]/5 text-[#034F46] hover:bg-[#034F46]/10'}\`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {finalisedVoice ? 'Finalised' : 'Mark Final'}
                    </button>
                  </div>
                </h3>
                <div className="flex flex-col gap-3">
                  {voiceItems.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white border border-[#2D3142]/10 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {isEditingVoice ? (
                        <input 
                          type="text" 
                          value={item}
                          onChange={e => {
                            const newItems = [...voiceItems];
                            newItems[idx] = e.target.value;
                            setVoiceItems(newItems);
                          }}
                          className="w-full bg-transparent border-b border-[#2D3142]/20 font-medium text-[#2D3142] focus:outline-none"
                        />
                      ) : (
                        <span className="font-medium text-[#2D3142]">{item}</span>
                      )}
                    </div>
                  ))}
                </div>
`;
content = content.replace(/<h3 className="text-xl font-bold text-\[\#2D3142\] mb-6 flex items-center justify-between">[\s\S]*?<div className="p-3 rounded-lg bg-white border border-\[\#2D3142\]\/10 flex items-center gap-3">\n                      <CheckCircle2 className="w-4 h-4 text-emerald-500" \/>\n                      <span className="font-medium text-\[\#2D3142\]">Transparent & Traceable<\/span>\n                    <\/div>\n                  <\/div>/, voiceSection.trim());

fs.writeFileSync(path, content);
console.log('Done');
