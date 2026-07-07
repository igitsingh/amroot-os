'use client';

import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Globe, ChevronDown, ChevronUp, AlertTriangle, Fingerprint, FileBadge, ExternalLink, Building2, Briefcase, FileSignature, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function RequirementsView() {
  const [isGlobalOpen, setIsGlobalOpen] = useState(true);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);

  const certifications = [
    {
      id: "usa",
      region: "United States (USA)",
      icon: <Globe className="w-5 h-5 text-[#F16775]" />,
      theme: "bg-[#F16775]/10 border-[#F16775]/20 text-[#F16775]",
      tests: [
        { name: "FDA FSMA Compliance", description: "Food Safety Modernization Act registration and preventative controls.", req: "Mandatory", url: "https://www.fda.gov/food/food-safety-modernization-act-fsma" },
        { name: "USDA Organic", description: "Strict standards for organic farming. Requires NOP compliance.", req: "For Organic Label", url: "https://www.ams.usda.gov/services/organic-certification" },
        { name: "ASTA Cleanliness Specs", description: "American Spice Trade Association limits on extraneous matter.", req: "Industry Standard", url: "https://www.astaspice.org/food-safety/cleanliness-specifications/" },
        { name: "EPA Pesticide Residue", description: "Maximum Residue Limits (MRLs) for agricultural chemicals.", req: "Mandatory", url: "https://www.epa.gov/pesticide-tolerances" }
      ]
    },
    {
      id: "eu",
      region: "United Kingdom & EU (Germany)",
      icon: <FileBadge className="w-5 h-5 text-[#F16775]" />,
      theme: "bg-indigo-500/5 border-indigo-500/20 text-[#F16775]",
      tests: [
        { name: "BRCGS / IFS", description: "Global Standard for Food Safety, strictly required by EU retailers.", req: "Mandatory (Retail)", url: "https://www.brcgs.com/" },
        { name: "EU Organic Certification", description: "Compliance with European Union organic farming regulations.", req: "For Organic Label", url: "https://agriculture.ec.europa.eu/farming/organic-farming_en" },
        { name: "Eurofins Heavy Metal", description: "Strict lab testing for Lead, Arsenic, Cadmium, and Mycotoxins.", req: "Mandatory", url: "https://www.eurofins.in/food-testing/" },
        { name: "REACH Registration", description: "For importing curcumin extracts / chemicals into the EU.", req: "For Extracts", url: "https://echa.europa.eu/regulations/reach/understanding-reach" }
      ]
    },
    {
      id: "me",
      region: "Middle East (UAE & KSA)",
      icon: <ShieldCheck className="w-5 h-5 text-[#034F46]" />,
      theme: "bg-[#034F46]/5 border-[#034F46]/20 text-[#034F46]",
      tests: [
        { name: "SFDA Approval", description: "Saudi Food and Drug Authority registration for exporting food.", req: "Mandatory (KSA)", url: "https://www.sfda.gov.sa/en/food" },
        { name: "ESMA / MoIAT", description: "Emirates Authority for Standardization and Metrology certification.", req: "Mandatory (UAE)", url: "https://moiat.gov.ae/en/services" },
        { name: "Halal Certification", description: "Recognized Islamic certification body verifying processing agents.", req: "Mandatory", url: "https://apeda.gov.in/apedawebsite/Announcements/Halal_Certification.htm" },
        { name: "SABER / SASO CoC", description: "Certificate of Conformity required for customs clearance.", req: "Mandatory (KSA)", url: "https://saber.sa/" }
      ]
    },
    {
      id: "aus",
      region: "Australia",
      icon: <Fingerprint className="w-5 h-5 text-[#F59E0B]" />,
      theme: "bg-amber-500/5 border-amber-500/20 text-[#F59E0B]",
      tests: [
        { name: "DAFF Phytosanitary", description: "Department of Agriculture strict bio-security inspection.", req: "Mandatory", url: "https://www.agriculture.gov.au/biosecurity-trade/export" },
        { name: "BICON Compliance", description: "Australian Biosecurity Import Conditions (no pests/diseases).", req: "Mandatory", url: "https://bicon.agriculture.gov.au/BiconWeb4.0" },
        { name: "ACO Certification", description: "Australian Certified Organic standard for premium retail.", req: "For Organic Label", url: "https://aco.net.au/" }
      ]
    }
  ];

  const registrations = [
    {
      id: "iec",
      name: "DGFT IEC Code",
      icon: <Globe className="w-5 h-5 text-[#F16775]" />,
      theme: "bg-[#F16775]/10 border-[#F16775]/20 text-[#F16775]",
      description: "Import Export Code. The fundamental 10-digit code required to export any commercial good from India.",
      req: "Mandatory",
      url: "https://www.dgft.gov.in/CP/"
    },
    {
      id: "cres",
      name: "Spices Board CRES",
      icon: <FileSignature className="w-5 h-5 text-[#034F46]" />,
      theme: "bg-[#034F46]/5 border-[#034F46]/20 text-[#034F46]",
      description: "Certificate of Registration as Exporter of Spices. Mandatory for exporting turmeric from India.",
      req: "Mandatory",
      url: "https://www.indianspices.com/export/cres-registration.html"
    },
    {
      id: "apeda",
      name: "APEDA RCMC",
      icon: <Landmark className="w-5 h-5 text-[#F59E0B]" />,
      theme: "bg-amber-500/5 border-amber-500/20 text-[#F59E0B]",
      description: "Registration-Cum-Membership Certificate for agricultural and processed food products export.",
      req: "Mandatory",
      url: "https://apeda.gov.in/"
    },
    {
      id: "fssai",
      name: "FSSAI Central License",
      icon: <ShieldCheck className="w-5 h-5 text-[#F16775]" />,
      theme: "bg-indigo-500/5 border-indigo-500/20 text-[#F16775]",
      description: "The highest tier food safety license in India, specifically required for 100% Export Oriented Units.",
      req: "Mandatory",
      url: "https://foscos.fssai.gov.in/"
    },
    {
      id: "udyam",
      name: "MSME / Udyam",
      icon: <Building2 className="w-5 h-5 text-cyan-400" />,
      theme: "bg-cyan-500/5 border-cyan-500/20 text-cyan-400",
      description: "Registration for micro, small, and medium enterprises to access government subsidies and trade fairs.",
      req: "Recommended",
      url: "https://udyamregistration.gov.in/"
    },
    {
      id: "gst",
      name: "GST Registration",
      icon: <Briefcase className="w-5 h-5 text-rose-400" />,
      theme: "bg-rose-500/5 border-rose-500/20 text-rose-400",
      description: "Goods and Services Tax portal for the business entity. Required for LUT (Letter of Undertaking) for exports.",
      req: "Mandatory",
      url: "https://www.gst.gov.in/"
    }
  ];

  return (
    <div className="h-full bg-[#F9F8F6] p-8 overflow-y-auto space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-[#F16775]/10 border border-indigo-500/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-[#F16775]" />
        </div>
        <div>
          <h1 className="text-3xl font-light tracking-tight text-[#2D3142]/90">Requirements & Standards</h1>
          <p className="text-[#2D3142]/40 mt-1">Track and manage mandatory world-class tests and export registrations for Amroot Organics.</p>
        </div>
      </div>

      {/* 1. Global Certifications Block */}
      <div className="bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-2xl overflow-hidden shadow-2xl">
        <button 
          onClick={() => setIsGlobalOpen(!isGlobalOpen)}
          className={`w-full flex items-center justify-between p-6 bg-[#2D3142]/5 hover:bg-[#2D3142]/10 transition-colors text-left ${isGlobalOpen ? 'border-b border-[#2D3142]/10' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F16775]/10 flex items-center justify-center border border-[#F16775]/20">
               <Globe className="w-5 h-5 text-[#F16775]" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-[#2D3142]/90">Global Certifications & Standards</h2>
              <p className="text-sm text-[#2D3142]/40">Requirements for exporting into USA, EU, Middle East, and Australia.</p>
            </div>
          </div>
          {isGlobalOpen ? <ChevronUp className="text-[#2D3142]/40" /> : <ChevronDown className="text-[#2D3142]/40" />}
        </button>

        {isGlobalOpen && (
          <div className="p-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {certifications.map((region) => (
                <div key={region.id} className="bg-[#F4F1EA]/20 border border-[#2D3142]/5 rounded-2xl overflow-hidden flex flex-col">
                  <div className={`px-5 py-4 border-b border-[#2D3142]/5 flex items-center gap-3 ${region.theme.split(' ')[0]}`}>
                    <div className="p-1.5 rounded-lg bg-[#F4F1EA]/20">
                      {region.icon}
                    </div>
                    <h3 className="text-lg font-medium text-[#2D3142]/90">{region.region}</h3>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col gap-3">
                    {region.tests.map((test, i) => (
                      <div key={i} className="bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-xl p-4 hover:border-white/20 transition-all group flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-[#2D3142]/90 font-medium text-sm">{test.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider border ${
                            test.req.includes('Mandatory') 
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                              : 'bg-[#034F46]/10 text-[#034F46] border-[#034F46]/20'
                          }`}>
                            {test.req}
                          </span>
                        </div>
                        <p className="text-xs text-[#2D3142]/50 mb-4 flex-1 leading-relaxed">{test.description}</p>
                        <div className="pt-3 border-t border-[#2D3142]/5">
                          <Link href={test.url} target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-[#F16775] hover:text-indigo-300 transition-colors w-max">
                            <ExternalLink size={14} /> View Standard
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[#F59E0B] font-medium text-sm mb-1">Amroot Organics Quality Promise</h3>
                <p className="text-[#2D3142]/60 text-xs leading-relaxed max-w-4xl">
                  By fulfilling all these tests simultaneously, Amroot Organics will establish a globally unique moat. The certifications above cover heavy metals (Eurofins), biosecurity (BICON), chemical safety (EPA/REACH), and regional import laws (SFDA, FSMA)—making our supply chain universally compliant.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Company Registration Block */}
      <div className="bg-[#2D3142]/5 border border-[#2D3142]/10 rounded-2xl overflow-hidden shadow-2xl">
        <button 
          onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
          className={`w-full flex items-center justify-between p-6 bg-[#2D3142]/5 hover:bg-[#2D3142]/10 transition-colors text-left ${isRegistrationOpen ? 'border-b border-[#2D3142]/10' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#034F46]/10 flex items-center justify-center border border-[#034F46]/20">
               <Building2 className="w-5 h-5 text-[#034F46]" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-[#2D3142]/90">Company Registration & Export Licenses</h2>
              <p className="text-sm text-[#2D3142]/40">Mandatory licenses for exporting from India to the world.</p>
            </div>
          </div>
          {isRegistrationOpen ? <ChevronUp className="text-[#2D3142]/40" /> : <ChevronDown className="text-[#2D3142]/40" />}
        </button>

        {isRegistrationOpen && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {registrations.map((reg) => (
                <div key={reg.id} className="bg-[#F4F1EA]/20 border border-[#2D3142]/5 rounded-2xl p-5 hover:border-[#2D3142]/10 transition-all flex flex-col group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${reg.theme}`}>
                        {reg.icon}
                      </div>
                      <h3 className="text-[#2D3142]/90 font-medium">{reg.name}</h3>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider border shrink-0 ${
                      reg.req === 'Mandatory' 
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                        : 'bg-[#F16775]/10 text-[#F16775] border-indigo-500/20'
                    }`}>
                      {reg.req}
                    </span>
                  </div>
                  <p className="text-xs text-[#2D3142]/50 mb-5 flex-1 leading-relaxed">{reg.description}</p>
                  
                  <div className="pt-4 border-t border-[#2D3142]/5 mt-auto">
                    <Link href={reg.url} target="_blank" className="flex items-center gap-1.5 text-xs font-medium text-[#034F46] hover:text-emerald-300 transition-colors w-max">
                      <ExternalLink size={14} /> Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
