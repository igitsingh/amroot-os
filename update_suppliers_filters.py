import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/app/suppliers/SuppliersView.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# 1. Update state
old_state = """  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'total' | 'net_new' | 'saved'>('total');
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    lists: true,
    name: true,
    location: true,
    curcumin: true,
  });"""

new_state = """  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'total' | 'net_new' | 'saved'>('total');
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    location: true,
    marketTier: true,
    certifications: true,
    curcuminContent: true,
  });
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterToggle = (category: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      
      if (updated.length === 0) {
        const next = { ...prev };
        delete next[category];
        return next;
      }
      return { ...prev, [category]: updated };
    });
  };

  const getUniqueValues = (key: string, isArray: boolean = false) => {
    const allVals = initialSuppliers.flatMap(s => {
      if (isArray) return s[key] || [];
      return s[key] ? [String(s[key])] : [];
    });
    return Array.from(new Set(allVals)).filter(Boolean).sort();
  };

  const filteredSuppliers = initialSuppliers.filter(supp => {
    return Object.entries(selectedFilters).every(([key, selectedValues]) => {
      if (!selectedValues || selectedValues.length === 0) return true;
      if (key === 'certifications') {
        const certs = supp.certifications || [];
        return selectedValues.some(v => certs.includes(v));
      }
      const val = String(supp[key as keyof typeof supp] || '');
      return selectedValues.includes(val);
    });
  });"""

content = content.replace(old_state, new_state)

# 2. Update sortedSuppliers to use filteredSuppliers
old_sorted = """  const sortedSuppliers = [...suppliers].sort((a, b) => {"""
new_sorted = """  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {"""
content = content.replace(old_sorted, new_sorted)

# 3. Update FilterSection rendering
old_filter_section_def = """  const FilterSection = ({ title, id }: { title: string, id: string }) => ("""

# Replace from old_filter_section_def up to return (
old_filter_section = re.search(r'  const FilterSection = .*?  return \(', content, re.DOTALL).group(0)

new_filter_section = """  const DynamicFilterSection = ({ title, id, isArray = false }: { title: string, id: string, isArray?: boolean }) => {
    const options = getUniqueValues(id, isArray);
    if (options.length === 0) return null;

    return (
      <div className="border-b border-[#2D3142]/5">
        <button 
          onClick={() => toggleFilter(id)}
          className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/[0.02] transition-colors group"
        >
          <span className="text-xs font-semibold text-[#2D3142]/70 tracking-wide">{title}</span>
          {expandedFilters[id] ? (
            <ChevronDown className="w-4 h-4 text-[#2D3142]/40 group-hover:text-[#2D3142]/70" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[#2D3142]/40 group-hover:text-[#2D3142]/70" />
          )}
        </button>
        {expandedFilters[id] && (
          <div className="px-4 pb-3 flex flex-col gap-2">
            {options.map(opt => {
              const isChecked = (selectedFilters[id] || []).includes(opt);
              return (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group/label">
                  <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-colors ${isChecked ? 'bg-[#F16775] border-[#F16775]' : 'border-[#2D3142]/20 group-hover/label:border-[#F16775]/50'}`}>
                    {isChecked && <CheckSquare className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-xs text-[#2D3142]/60 group-hover/label:text-[#2D3142]/90 truncate">{opt}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return ("""

content = content.replace(old_filter_section, new_filter_section)

# 4. Replace the usage of FilterSection
old_usage = """          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <FilterSection title="Lists" id="lists" />
            <FilterSection title="Supplier Name" id="name" />
            <FilterSection title="Location" id="location" />
            <FilterSection title="Market Tier" id="tier" />
            <FilterSection title="Certifications" id="certifications" />
            <FilterSection title="Curcumin %" id="curcumin" />
          </div>"""

new_usage = """          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <DynamicFilterSection title="Location" id="location" />
            <DynamicFilterSection title="Market Tier" id="marketTier" />
            <DynamicFilterSection title="Certifications" id="certifications" isArray={true} />
            <DynamicFilterSection title="Curcumin %" id="curcuminContent" />
          </div>"""

content = content.replace(old_usage, new_usage)

# 5. Fix totals
content = content.replace("Total ({suppliers.length})", "Total ({filteredSuppliers.length})")
content = content.replace("Saved ({suppliers.length})", "Saved ({filteredSuppliers.length})")
content = content.replace("1 - {suppliers.length} of {suppliers.length}", "1 - {filteredSuppliers.length} of {initialSuppliers.length}")

with open(file_path, 'w') as f:
    f.write(content)

print("Updated SuppliersView with dynamic filters.")
