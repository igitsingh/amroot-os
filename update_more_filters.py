import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/app/competitors/CompetitorsView.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# 1. Add X icon to imports
import_regex = r"import \{\s+Search, ChevronDown, ChevronRight, Filter, Download,"
new_import = "import { Search, ChevronDown, ChevronRight, Filter, Download, X,"
content = re.sub(import_regex, new_import, content)

# 2. Add state
state_regex = r"(const \[selectedExport, setSelectedExport\] = useState<string\[\]>\(\[\]\);)"
new_state = """\\1
  const [showMoreFiltersModal, setShowMoreFiltersModal] = useState(false);"""
content = re.sub(state_regex, new_state, content)

# 3. Update More Filters button
btn_regex = r"(<button className=\"w-full flex items-center justify-center gap-2 py-2 bg-\[\#F16775\] hover:bg-\[\#E05663\] text-white rounded font-medium transition-colors shadow-sm\">)"
new_btn = """<button onClick={() => setShowMoreFiltersModal(true)} className="w-full flex items-center justify-center gap-2 py-2 bg-[#F16775] hover:bg-[#E05663] text-white rounded font-medium transition-colors shadow-sm">"""
content = re.sub(btn_regex, new_btn, content)

# 4. Inject modal at the end of return statement
modal_code = """
      {showMoreFiltersModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2D3142]/40 backdrop-blur-sm" onClick={() => setShowMoreFiltersModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-[#2D3142]/10 flex flex-col" onClick={e => e.stopPropagation()}>
             <div className="flex items-center justify-between px-5 py-4 border-b border-[#2D3142]/10 bg-[#F9F8F6]">
               <h3 className="font-semibold text-[#2D3142] flex items-center gap-2"><Filter className="w-4 h-4 text-[#F16775]" /> Advanced Filters</h3>
               <button onClick={() => setShowMoreFiltersModal(false)} className="text-[#2D3142]/50 hover:text-[#2D3142] transition-colors">
                 <X className="w-5 h-5" />
               </button>
             </div>
             <div className="p-6 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
                <div className="text-sm text-[#2D3142]/70 bg-[#F16775]/5 p-4 rounded border border-[#F16775]/20">
                  <span className="font-semibold text-[#F16775]">Data Engine Connecting...</span>
                  <p className="mt-1">The intelligence engine is currently indexing deep data points like <strong>Lab Reports, Market Tier, Organic Status, and Manufacturing Capabilities.</strong></p>
                  <p className="mt-2">Once fully indexed, these advanced filters will become active here.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 opacity-50 pointer-events-none">
                  <div>
                    <span className="text-xs font-semibold text-[#2D3142]/70 block mb-2">Market Tier</span>
                    <label className="flex items-center gap-2 mb-1"><input type="checkbox" className="accent-[#F16775]" /> <span className="text-sm">Ultra-Premium</span></label>
                    <label className="flex items-center gap-2 mb-1"><input type="checkbox" className="accent-[#F16775]" /> <span className="text-sm">Premium</span></label>
                    <label className="flex items-center gap-2 mb-1"><input type="checkbox" className="accent-[#F16775]" /> <span className="text-sm">Mass Market</span></label>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#2D3142]/70 block mb-2">Entity Type</span>
                    <label className="flex items-center gap-2 mb-1"><input type="checkbox" className="accent-[#F16775]" /> <span className="text-sm">DTC Brand</span></label>
                    <label className="flex items-center gap-2 mb-1"><input type="checkbox" className="accent-[#F16775]" /> <span className="text-sm">B2B Ingredient</span></label>
                  </div>
                </div>
             </div>
             <div className="p-4 border-t border-[#2D3142]/10 bg-[#F9F8F6] flex justify-end">
               <button onClick={() => setShowMoreFiltersModal(false)} className="px-5 py-2 bg-[#F16775] text-white rounded font-medium text-sm hover:bg-[#E05663] transition-colors shadow-sm">Done</button>
             </div>
          </div>
        </div>
      )}
"""

end_regex = r"(      \{selectedId && selectedCompetitor && \([\s\S]*?<\/[a-zA-Z]+>\n\s*\)\}\n\s*</div>)"
content = re.sub(end_regex, modal_code + r"\n\1", content)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated More Filters logic.")
