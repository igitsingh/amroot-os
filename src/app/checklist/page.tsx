'use client';
import React, { useState, useEffect } from 'react';
import { Outfit } from 'next/font/google';
import { CheckCircle2, Circle, ListTodo, Globe, Box, Rocket, ShieldCheck, ExternalLink, FlaskConical, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const BRAND_COLORS = {
  primary: '#034F46',
  secondary: '#F4F1EA',
  accent: '#F16775',
};

const PHASES = [
  {
    id: 'p0',
    title: 'Phase 1: Pre-Registration Document Collection',
    icon: <FileText className="w-5 h-5" />,
    tasks: [
      { id: 't0_0', title: 'Brand & Proprietary Name Selection', desc: 'Select a distinct, non-trademarked name for the brand.', why: 'Avoids costly trademark disputes and rebranding. Amroot and Amroot Organics present severe risks due to existing similar marks. A highly distinctive name ensures clear registration in Class 30.', actions: [{ label: 'View 280+ Name Options', href: '/brand#name-selection' }] },
      { id: 't0_1', mutexGroup: 'company_types', subheading: 'COMPANY REGISTRATION TYPES', title: 'Individual / Proprietorship Docs', desc: 'Name, Postal Address, PAN, and Aadhaar.', why: 'Used by solo founders at the very early ideation stage to test the market. It requires minimal compliance but carries unlimited personal liability.', actions: [{ label: 'Proprietorship Guide', href: 'https://www.startupindia.gov.in/' }, { label: 'MSME Udyam Portal', href: 'https://udyamregistration.gov.in/' }, { label: 'GST Portal', href: 'https://www.gst.gov.in/' }] },
      { id: 't0_2', mutexGroup: 'company_types', title: 'Partnership Firm Docs', desc: 'Partnership Deed, Firm PAN, Address Proof.', why: 'Used by 2+ founders seeking a simple, traditional structure to pool resources. Often used in family businesses. Partners share unlimited liability.', actions: [{ label: 'Partnership Act (PDF)', href: 'https://www.mca.gov.in/Ministry/actsbills/pdf/Partnership_Act_1932.pdf' }, { label: 'Apply for PAN (Protean)', href: 'https://www.protean-tinpan.com/' }, { label: 'GST Portal', href: 'https://www.gst.gov.in/' }] },
      { id: 't0_3', mutexGroup: 'company_types', title: 'LLP Documents', desc: 'LLP Agreement, LLP PAN, LLPIN.', why: 'Highly recommended for bootstrapping SMEs. Used by service or trading agencies that want personal asset protection but with a lower compliance burden than a Private Limited Company.', actions: [{ label: 'MCA FiLLiP Portal', href: 'https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/llp-incorporation.html' }, { label: 'Check Name Availability', href: 'https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/company-llp-name-search.html' }, { label: 'Find a CA/CS', href: 'https://www.icai.org/' }] },
      { id: 't0_4', mutexGroup: 'company_types', title: 'Company Documents', desc: 'Certificate of Incorporation (COI), Company PAN, CIN, Board Resolution.', why: 'The gold standard for scalable startups. Used by companies planning to raise Venture Capital, offer ESOPs, and build global operations. Requires strict annual ROC filings and statutory audits.', actions: [{ label: 'MCA SPICe+ Portal', href: 'https://www.mca.gov.in/content/mca/global/en/mca/e-services/incorporation/spice.html' }, { label: 'Check Name Availability', href: 'https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/company-llp-name-search.html' }, { label: 'Startup India Hub', href: 'https://www.startupindia.gov.in/' }] },
      { id: 't0_5', mutexGroup: 'company_types', title: 'Trust / Society Documents', desc: 'Trust Deed / Society Registration Certificate.', why: 'Exclusively used for charitable, educational, or non-profit objectives (e.g., NGOs). Not suitable or recommended for commercial export businesses.', actions: [{ label: 'NGO Darpan', href: 'https://ngodarpan.gov.in/' }, { label: 'Section 8 (MCA Portal)', href: 'https://www.mca.gov.in/content/mca/global/en/mca/e-services/incorporation/section-8-company.html' }] },
    ]
  },
  {
    id: 'p1',
    title: 'Phase 2: Corporate & Brand Foundation',
    icon: <Globe className="w-5 h-5" />,
    tasks: [
      { id: 't1_3', title: 'Company Registration & Bank Account', desc: 'Ensure proper business structure for export operations.', action: { label: 'MCA Login Portal', href: 'https://www.mca.gov.in/content/mca/global/en/home.html' } },
      { id: 't1_4', title: 'GST Registration', desc: 'Goods and Services Tax portal for the business entity. Required for LUT for exports.', action: { label: 'Apply Now', href: 'https://www.gst.gov.in/' } },
      { id: 't1_2', title: 'Logo Finalisation', desc: 'Finalize the primary logo design and variations for the brand identity.', action: { label: 'View Options', href: '/brand' } },
      { id: 't0_6', title: 'Trademark Representation', desc: 'Exact trademark image/text for filing. 💡 Hint: File under Class 30 (Spices). A distinct brand protects your IP and builds global trust.', action: { label: 'IP India Portal', href: 'https://ipindia.gov.in/' }, optional: 'NOT NECESSARY UNTIL YOU HAVE SHIPPED ATLEAST 10+ ORDERS' },
      { id: 't1_5', title: 'Brand Name Trademark', desc: 'Secure the text trademark for the Amroot Organics brand name.', action: { label: 'Apply Now', href: 'https://ipindia.gov.in/' }, optional: 'NOT NECESSARY UNTIL YOU HAVE SHIPPED ATLEAST 10+ ORDERS' },
      { id: 't1_6', title: 'Logo Trademark', desc: 'Secure the visual trademark for the finalized Amroot Organics logo.', action: { label: 'Apply Now', href: 'https://ipindia.gov.in/' }, optional: 'NOT NECESSARY UNTIL YOU HAVE SHIPPED ATLEAST 10+ ORDERS' },
      { id: 't1_1', title: 'Website Domain Registrations', desc: 'Register domain names for the global e-commerce and corporate sites.', action: { label: 'Register', href: 'https://www.hostinger.com', doneHref: 'https://hpanel.hostinger.com/domains' } },
      { id: 't1_9', title: 'MSME / Udyam', desc: 'Registration for access to government subsidies and trade fairs.', action: { label: 'Apply Now', href: 'https://udyamregistration.gov.in/' } },
    ]
  },
  {
    id: 'p2',
    title: 'Phase 3: Export & Regulatory Setup',
    icon: <FileText className="w-5 h-5" />,
    tasks: [
      { id: 't1_7', title: 'IEC (Importer Exporter Code)', desc: 'Obtained from the Directorate General of Foreign Trade (DGFT).', action: { label: 'Apply Now', href: 'https://www.dgft.gov.in/CP/' } },
      { id: 't1_8', title: 'FSSAI Central License', desc: 'The highest tier food safety license in India, required for 100% EOUs.', action: { label: 'Apply Now', href: 'https://foscos.fssai.gov.in/' } },
      { id: 't1_10', title: 'Spices Board CRES', desc: 'Certificate of Registration as Exporter of Spices. Mandatory for turmeric.', action: { label: 'Apply Now', href: 'https://www.indianspices.com/export/cres-registration.html' } },
      { id: 't1_11', title: 'APEDA RCMC', desc: 'Registration-Cum-Membership Certificate for agricultural products export.', action: { label: 'Apply Now', href: 'https://apeda.gov.in/' } },
      { id: 't1_12', title: 'AD Code Registration', desc: 'Authorized Dealer Code registration at the port of export.', action: { label: 'Apply Now', href: 'https://www.icegate.gov.in/' } },
    ]
  },
  {
    id: 'p3',
    title: 'Phase 4: Sourcing & Product Readiness',
    icon: <Box className="w-5 h-5" />,
    tasks: [
      { id: 't2_1', title: 'Secure Supply Chain', desc: 'Finalize contracts with farmers in Meghalaya for consistent supply.', action: { label: 'View Suppliers', href: '/suppliers' } },
      { id: 't4_1', title: 'Export-Grade Packaging', desc: 'Finalize moisture-proof bulk packaging for oceanic transit.', action: { label: 'View Standard', href: 'https://www.iip-in.com/' } },
    ]
  },
  {
    id: 'p4',
    title: 'Phase 5: Lab Testing & Quality Assurance',
    icon: <FlaskConical className="w-5 h-5" />,
    tasks: [
      { id: 't2_3', subheading: 'GLOBAL & PREMIUM STANDARDS', title: 'Curcuminoid & Gingerol Profiling (HPLC)', desc: 'Test for active compound percentage (e.g., Curcumin >6%) to justify premium pricing and health claims.', action: { label: 'Spices Board Lab', href: 'https://www.indianspices.com/quality/quality-evaluation-lab.html' } },
      { id: 't2_6', title: 'Pesticide Residue Analysis (MRLs)', desc: 'Multi-residue screening (200+ chemicals) to ensure strict NPOP/USDA/EU organic pesticide compliance.', action: { label: 'View EPA Limits', href: 'https://www.epa.gov/pesticide-tolerances' } },
      { id: 't2_9', title: 'Non-Irradiation Certificate', desc: 'Proof that the spices were not sterilized using radiation, which is prohibited under all organic standards.', action: { label: 'View USDA Standard', href: 'https://www.ams.usda.gov/rules-regulations/organic' } },
      { id: 't2_10', title: 'Microbiological & Pathogen Panel', desc: 'Test for Salmonella, E. Coli, Coliforms, Yeast, and Mold to ensure food safety and prevent outbreaks.', action: { label: 'SGS Food Testing', href: 'https://www.sgs.com/en/agriculture-food/food/food-testing' } },
      { id: 't2_11', title: 'Moisture Content & Physical Specs', desc: 'Ensure moisture is < 12% to prevent mold during ocean transit. Verifies limits on extraneous matter (twigs, soil).', action: { label: 'ASTA Portal', href: 'https://www.astaspice.org/' } },
      
      { id: 't2_7', subheading: 'UNITED STATES (USA)', title: 'Lead Chromate & Sudan Dye Test', desc: 'Critical adulteration testing for Turmeric. US FDA aggressively rejects shipments with these illegal synthetic colors.', action: { label: 'View FDA Alert', href: 'https://www.fda.gov/food/cfsan-constituent-updates/fda-issues-alert-concerning-adulteration-turmeric-lead-chromate' } },
      
      { id: 't2_4', subheading: 'EUROPEAN UNION & UK', title: 'Heavy Metals Panel', desc: 'Test for Lead, Arsenic, Cadmium, and Mercury to ensure soil contaminants are below strict international EU thresholds.', action: { label: 'Eurofins Testing', href: 'https://www.eurofins.in/food-testing/' } },
      { id: 't2_8', title: 'Ethylene Oxide (EtO) Testing', desc: 'Test for EtO fumigant residues. EtO is strictly banned in the EU and UK and causes immediate rejections at the port.', action: { label: 'View Regulations', href: 'https://food.ec.europa.eu/safety/chemical-safety/contaminants_en' } },
    ]
  },
  {
    id: 'p5',
    title: 'Phase 6: Certifications & Market Compliance',
    icon: <ShieldCheck className="w-5 h-5" />,
    tasks: [
      { id: 't2_2', subheading: 'GLOBAL / INDIA BASE', title: 'NPOP/NOP Organic Certification', desc: 'Ensure all products meet domestic and international organic standards.', action: { label: 'View Standard', href: 'https://www.ams.usda.gov/services/organic-certification' } },
      
      { id: 't3_1', subheading: 'UNITED STATES (USA)', title: 'USA: FDA FSMA Compliance', desc: 'Food Safety Modernization Act registration and preventative controls.', action: { label: 'Apply Now', href: 'https://www.fda.gov/food/food-safety-modernization-act-fsma' } },
      { id: 't3_2', title: 'USA: USDA Organic', desc: 'Strict standards for organic farming. Requires NOP compliance.', action: { label: 'View Standard', href: 'https://www.ams.usda.gov/services/organic-certification' } },
      
      { id: 't3_3', subheading: 'EUROPEAN UNION (EU)', title: 'EU: BRCGS / IFS', desc: 'Global Standard for Food Safety, strictly required by EU retailers.', action: { label: 'View Standard', href: 'https://www.brcgs.com/' } },
      { id: 't3_4', title: 'EU: Organic Certification & REACH', desc: 'EU organic farming regulations and REACH for curcumin extracts.', action: { label: 'View Standard', href: 'https://echa.europa.eu/regulations/reach/understanding-reach' } },
      
      { id: 't3_10', subheading: 'UNITED KINGDOM (UK)', title: 'UK: FSA & Port Health Compliance', desc: 'Food Standards Agency requirements and Port Health Authority checks at UK borders.', action: { label: 'View Guidelines', href: 'https://www.food.gov.uk/business-guidance/importing-products-of-non-animal-origin' } },
      { id: 't3_11', title: 'UK: DEFRA Phytosanitary Certificate', desc: 'Department for Environment, Food & Rural Affairs biosecurity controls for plant products.', action: { label: 'Apply Now', href: 'https://www.gov.uk/guidance/importing-plants-and-plant-products-from-non-eu-countries-to-great-britain' } },
      { id: 't3_12', title: 'UK: Soil Association / Organic Equivalency', desc: 'UK organic standards for premium market entry and retail compliance.', action: { label: 'View Standard', href: 'https://www.soilassociation.org/certification/food-drink/' } },
      
      { id: 't3_5', subheading: 'MIDDLE EAST (UAE & KSA)', title: 'UAE/KSA: Halal Certification', desc: 'Recognized Islamic certification body verifying processing agents.', action: { label: 'Apply Now', href: 'https://apeda.gov.in/apedawebsite/Announcements/Halal_Certification.htm' } },
      { id: 't3_6', title: 'UAE/KSA: SFDA & ESMA / MoIAT', desc: 'Saudi FDA and Emirates Authority for Standardization certifications.', action: { label: 'Apply Now', href: 'https://www.sfda.gov.sa/en/food' } },
      { id: 't3_7', title: 'UAE/KSA: SABER / SASO CoC', desc: 'Certificate of Conformity required for customs clearance.', action: { label: 'Apply Now', href: 'https://saber.sa/' } },
      
      { id: 't3_8', subheading: 'AUSTRALIA (AUS)', title: 'AUS: DAFF Phytosanitary & BICON', desc: 'Department of Agriculture biosecurity and import conditions.', action: { label: 'Apply Now', href: 'https://bicon.agriculture.gov.au/BiconWeb4.0' } },
      { id: 't3_9', title: 'AUS: ACO Certification', desc: 'Australian Certified Organic standard for premium retail.', action: { label: 'View Standard', href: 'https://aco.net.au/' } },
    ]
  },
  {
    id: 'p6',
    title: 'Phase 7: Logistics, Launch & Shipping',
    icon: <Rocket className="w-5 h-5" />,
    tasks: [
      { id: 't4_2', title: 'Finalize Freight Forwarders & CHA', desc: 'Appoint reliable shipping partners and Customs House Agents.', action: { label: 'Apply Now', href: 'https://www.icegate.gov.in/' } },
      { id: 't4_3', title: 'Marine Insurance', desc: 'Secure comprehensive coverage for international shipments.', action: { label: 'Apply Now', href: 'https://main.ecgc.in/english/' } },
      { id: 't5_1', title: 'AmrootOS & Store Live', desc: 'Ensure digital infrastructure is ready to receive and process orders.', action: { label: 'Go to Operations', href: '/operations' } },
      { id: 't4_4', title: 'Commercial Invoices & Packing Lists', desc: 'Generate correct documentation for the first consignment.', action: { label: 'Go to Documents', href: '/documents' } },
      { id: 't5_2', title: 'First Shipment Dispatched', desc: 'Load and dispatch the first LCL/FCL container.', action: { label: 'Track Shipment', href: 'https://www.icegate.gov.in/TrackAtICES/' } },
      { id: 't5_3', title: 'Post-Arrival Verification', desc: 'Gather buyer feedback and verify quality upon arrival.', action: { label: 'View Research', href: '/research' } },
    ]
  }
];

export default function LaunchChecklistPage() {
  const { user } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [savedTasks, setSavedTasks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const fetchChecklist = async () => {
      if (!user) {
        setIsLoaded(true);
        return;
      }
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.checklist) {
            setCompletedTasks(data.checklist);
            setSavedTasks(data.checklist);
          }
        }
      } catch (e) {
        console.error('Failed to load checklist', e);
      }
      setIsLoaded(true);
    };
    fetchChecklist();
  }, [user]);

  const toggleTask = (taskId: string, phase?: any) => {
    let updated = [...completedTasks];
    const task = phase?.tasks.find((t: any) => t.id === taskId);
    
    if (completedTasks.includes(taskId)) {
      updated = updated.filter(id => id !== taskId);
    } else {
      if (task?.mutexGroup) {
        const otherTaskIds = phase.tasks
          .filter((t: any) => t.mutexGroup === task.mutexGroup && t.id !== taskId)
          .map((t: any) => t.id);
        updated = updated.filter(id => !otherTaskIds.includes(id));
      }
      updated.push(taskId);
    }
    
    setCompletedTasks(updated);
    
    // Check if it's different from saved tasks to show unsaved badge
    const isDifferent = updated.length !== savedTasks.length || !updated.every(v => savedTasks.includes(v)) || !savedTasks.every(v => updated.includes(v));
    setHasUnsavedChanges(isDifferent);
  };

  const handleSave = async (overrideTasks?: string[]) => {
    const tasksToSave = overrideTasks || completedTasks;
    if (!user) return;
    if (!hasUnsavedChanges && !overrideTasks) return;
    
    setIsSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { checklist: tasksToSave }, { merge: true });
      setSavedTasks(tasksToSave);
      setHasUnsavedChanges(false);
      showToast("Checklist Progress Saved to Cloud!");
    } catch (error) {
      console.error('Error saving checklist: ', error);
      showToast("Failed to save progress.");
    } finally {
      setIsSaving(false);
    }
  };

  const totalTasks = PHASES.reduce((acc, phase) => {
    // @ts-ignore
    return acc + (phase.isMutuallyExclusive ? 1 : phase.tasks.length);
  }, 0);
  
  const completedCount = PHASES.reduce((acc, phase) => {
    const doneInPhase = phase.tasks.filter(t => completedTasks.includes(t.id)).length;
    // @ts-ignore
    return acc + (phase.isMutuallyExclusive ? Math.min(doneInPhase, 1) : doneInPhase);
  }, 0);

  const progressPercentage = Math.round((completedCount / totalTasks) * 100) || 0;

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <div className={`min-h-screen bg-[#F4F1EA] flex flex-col ${outfit.className}`}>
      
      {/* Header */}
      <div className="bg-white border-b border-[#2D3142]/10 px-8 py-10 shrink-0">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#034F46]/10 text-[#034F46] text-sm font-semibold mb-4">
              <Rocket className="w-4 h-4" />
              Go-To-Market Plan
            </div>
            <h1 className="text-4xl font-bold text-[#2D3142] tracking-tight">Global Launch Checklist</h1>
            <p className="text-[#2D3142]/60 mt-2 max-w-2xl text-lg">
              The complete roadmap to launching Amroot Organics in the UAE, UK, and Germany. 
              Track and persist your progress through every critical phase.
            </p>
          </div>

          <div className="flex flex-col items-end min-w-[200px]">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold" style={{ color: BRAND_COLORS.accent }}>{progressPercentage}%</span>
              <span className="text-sm font-medium text-[#2D3142]/50 uppercase tracking-wider">Completed</span>
            </div>
            <div className="w-full h-3 bg-[#2D3142]/5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%`, backgroundColor: BRAND_COLORS.accent }}
              />
            </div>
            <div className="text-xs text-[#2D3142]/40 font-medium mt-2">
              {completedCount} of {totalTasks} tasks done
            </div>
            
            <button 
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
              className={`mt-4 px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                isSaving 
                  ? 'bg-[#2D3142]/10 text-[#2D3142]/40 cursor-not-allowed'
                  : hasUnsavedChanges 
                    ? 'bg-[#034F46] text-white shadow-md hover:bg-[#034F46]/90 hover:-translate-y-0.5' 
                    : 'bg-[#034F46]/10 text-[#034F46]/50 cursor-not-allowed'
              }`}
            >
              {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Progress' : 'Saved'}
            </button>
            
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#2D3142] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-12">
          
          {PHASES.map((phase, index) => {
            const phaseTasksDone = phase.tasks.filter(t => completedTasks.includes(t.id)).length;
            // @ts-ignore
            const mutexGroups = new Set(phase.tasks.map(t => t.mutexGroup).filter(Boolean));
            // @ts-ignore
            const standardTasksCount = phase.tasks.filter(t => !t.mutexGroup).length;
            const displayTasksTotal = standardTasksCount + mutexGroups.size;

            // @ts-ignore
            let doneStandard = phase.tasks.filter(t => !t.mutexGroup && completedTasks.includes(t.id)).length;
            let doneMutex = 0;
            mutexGroups.forEach(group => {
               // @ts-ignore
               if (phase.tasks.some(t => t.mutexGroup === group && completedTasks.includes(t.id))) {
                   doneMutex++;
               }
            });
            const displayTasksDone = doneStandard + doneMutex;
            const isPhaseComplete = displayTasksDone === displayTasksTotal;
            
            return (
              <div key={phase.id} className="bg-white border border-[#2D3142]/10 rounded-2xl overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                
                {/* Phase Header */}
                <div className={`p-6 flex items-center justify-between border-b border-[#2D3142]/5 transition-colors ${isPhaseComplete ? 'bg-[#034F46]/5' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isPhaseComplete ? 'bg-[#034F46] text-white' : 'bg-[#F4F1EA] text-[#034F46]'}`}>
                      {phase.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#2D3142]">{phase.title}</h2>
                      <div className="text-sm font-medium text-[#2D3142]/50 mt-0.5">
                        {displayTasksDone} / {displayTasksTotal} Completed
                      </div>
                    </div>
                  </div>
                  {isPhaseComplete && (
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#034F46] text-white text-xs font-bold uppercase tracking-wider rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                      Phase Complete
                    </div>
                  )}
                </div>

                {/* Tasks List */}
                <div className="flex flex-col">
                  {phase.tasks.map((task, i) => {
                    const isDone = completedTasks.includes(task.id);
                    return (
                      <React.Fragment key={task.id}>
                        {/* @ts-ignore */}
                        {task.subheading && (
                          <div className="px-6 py-4 bg-[#F4F1EA]/50 border-b border-[#2D3142]/5">
                            {/* @ts-ignore */}
                            <h3 className="text-xs font-black text-[#2D3142]/40 tracking-widest uppercase">{task.subheading}</h3>
                          </div>
                        )}
                        <div 
                          onClick={() => toggleTask(task.id, phase)}
                          // @ts-ignore
                          className={`group flex items-start gap-4 p-5 cursor-pointer transition-colors hover:bg-[#F4F1EA]/50 ${i !== phase.tasks.length - 1 && (!task.mutexGroup || phase.tasks[i+1]?.mutexGroup !== task.mutexGroup) ? 'border-b border-[#2D3142]/5' : ''}`}
                        >
                        <div className="mt-0.5 shrink-0 transition-transform group-hover:scale-110">
                          {isDone ? (
                            <CheckCircle2 className="w-6 h-6 text-[#F16775]" />
                          ) : (
                            <Circle className="w-6 h-6 text-[#2D3142]/20 group-hover:text-[#F16775]/50" />
                          )}
                        </div>
                        <div className="flex-1 flex flex-col items-start">
                          <h3 className={`text-base font-bold transition-colors flex items-center flex-wrap gap-2 ${isDone ? 'text-[#2D3142]/40 line-through' : 'text-[#2D3142]'}`}>
                            {task.title}
                            {/* @ts-ignore */}
                            {task.optional && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-700 border border-amber-200 ml-2">
                                {task.optional}
                              </span>
                            )}
                          </h3>
                          <p className={`text-sm mt-1 transition-colors ${isDone ? 'text-[#2D3142]/30' : 'text-[#2D3142]/60'}`}>
                            {task.desc}
                          </p>
                          {/* @ts-ignore */}
                          {task.why && (
                            <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed transition-colors ${isDone ? 'bg-[#034F46]/50 text-white/70' : 'bg-[#034F46] text-white/90 shadow-sm'}`}>
                              <span className={`font-bold tracking-wider uppercase mb-1 block text-[10px] ${isDone ? 'text-white/50' : 'text-[#F4F1EA]'}`}>Why use this?</span>
                              {/* @ts-ignore */}
                              {task.why}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {/* @ts-ignore */}
                            {task.action && (
                              <a 
                                // @ts-ignore
                                href={isDone && task.action.doneHref ? task.action.doneHref : task.action.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${isDone ? 'bg-[#034F46] text-white hover:bg-[#046C60]' : 'bg-[#034F46]/5 text-[#034F46] hover:bg-[#034F46]/10'}`}
                              >
                                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                                {/* @ts-ignore */}
                                {isDone ? (task.action.label === 'Register' ? 'Registered' : task.action.label.includes('Apply') ? 'Applied' : 'Verified') : task.action.label}
                              </a>
                            )}
                            {/* @ts-ignore */}
                            {task.actions && task.actions.map((act: any, idx: number) => (
                              <a 
                                key={idx}
                                href={isDone && act.doneHref ? act.doneHref : act.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${isDone ? 'bg-[#034F46] text-white hover:bg-[#046C60]' : 'bg-[#034F46]/5 text-[#034F46] hover:bg-[#034F46]/10'}`}
                              >
                                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                                {isDone ? (act.label === 'Register' ? 'Registered' : act.label.includes('Apply') ? 'Applied' : 'Verified') : act.label}
                              </a>
                            ))}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isDone) {
                                  // Mark as done and save immediately
                                  let updated = [...completedTasks];
                                  if (task.mutexGroup) {
                                    const otherTaskIds = phase.tasks
                                      .filter((t: any) => t.mutexGroup === task.mutexGroup && t.id !== task.id)
                                      .map((t: any) => t.id);
                                    updated = updated.filter(id => !otherTaskIds.includes(id));
                                  }
                                  updated.push(task.id);
                                  setCompletedTasks(updated);
                                  handleSave(updated);
                                } else if (hasUnsavedChanges) {
                                  handleSave();
                                }
                              }}
                              disabled={isSaving || (isDone && !hasUnsavedChanges)}
                              className={`inline-flex items-center justify-center min-w-[120px] px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ml-auto ${
                                isSaving 
                                  ? 'bg-[#2D3142]/10 text-[#2D3142]/40 cursor-not-allowed'
                                  : (isDone && !hasUnsavedChanges)
                                    ? 'bg-[#034F46]/10 text-[#034F46]/50 cursor-not-allowed'
                                    : 'bg-[#034F46] text-white shadow-md hover:bg-[#034F46]/90 hover:-translate-y-0.5' 
                              }`}
                            >
                              {isSaving ? 'Saving...' : (isDone && !hasUnsavedChanges) ? 'Saved' : 'Save Progress'}
                            </button>
                          </div>
                        </div>
                        </div>
                        {/* @ts-ignore */}
                        {task.mutexGroup && i !== phase.tasks.length - 1 && phase.tasks[i+1]?.mutexGroup === task.mutexGroup && (
                          <div className="flex items-center justify-center py-2 bg-[#F4F1EA]/30 border-b border-t border-[#2D3142]/5">
                            <span className="text-xs font-bold text-[#2D3142]/40 tracking-widest uppercase">Or</span>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  );
}
