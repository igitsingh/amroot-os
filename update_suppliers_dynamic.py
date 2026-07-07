import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/app/suppliers/SuppliersView.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# 1. Add states and selection functions
old_state_block = """  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    location: true,
    marketTier: true,
    certifications: true,
    curcuminContent: true,
  });
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});"""

new_state_block = """  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    location: true,
    marketTier: true,
    certifications: true,
    curcuminContent: true,
  });
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const toggleRowSelection = (id: string) => {
    setSelectedRowIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAllRows = () => {
    if (selectedRowIds.length === sortedSuppliers.length && sortedSuppliers.length > 0) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(sortedSuppliers.map(s => s.id));
    }
  };"""

content = content.replace(old_state_block, new_state_block)

# 2. Update filtering logic
old_filter_logic = """  const filteredSuppliers = initialSuppliers.filter(supp => {
    return Object.entries(selectedFilters).every(([key, selectedValues]) => {"""

new_filter_logic = """  const filteredSuppliers = initialSuppliers.filter(supp => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = (supp.name || '').toLowerCase().includes(q) || 
                    (supp.location || '').toLowerCase().includes(q) || 
                    (supp.entityType || '').toLowerCase().includes(q);
      if (!match) return false;
    }

    return Object.entries(selectedFilters).every(([key, selectedValues]) => {"""

content = content.replace(old_filter_logic, new_filter_logic)

# 3. Update search input
old_search_input = """              <input 
                type="text" 
                placeholder="Search Suppliers..."
                className="w-full bg-white/[0.03] border border-[#2D3142]/10 rounded-md py-2 pl-9 pr-3 text-sm text-[#2D3142] placeholder:text-[#2D3142]/30 focus:outline-none focus:border-[#F16775]/50"
              />"""

new_search_input = """              <input 
                type="text" 
                placeholder="Search Suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-[#2D3142]/10 rounded-md py-2 pl-9 pr-3 text-sm text-[#2D3142] placeholder:text-[#2D3142]/30 focus:outline-none focus:border-[#F16775]/50"
              />"""

content = content.replace(old_search_input, new_search_input)

# 4. Update button color
old_btn = """<button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-500 text-[#2D3142] rounded font-medium transition-colors">"""
new_btn = """<button className="w-full flex items-center justify-center gap-2 py-2 bg-[#F16775] hover:bg-[#d95d6a] text-white rounded font-medium transition-colors">"""
content = content.replace(old_btn, new_btn)

# 5. Update header checkbox
old_header_checkbox = """<th className="px-4 py-3 w-10 text-center"><Square className="w-4 h-4 mx-auto" /></th>"""
new_header_checkbox = """<th className="px-4 py-3 w-10 text-center" onClick={toggleAllRows}>
                    {selectedRowIds.length === sortedSuppliers.length && sortedSuppliers.length > 0 ? (
                      <CheckSquare className="w-4 h-4 mx-auto cursor-pointer text-[#F16775]" />
                    ) : (
                      <Square className="w-4 h-4 mx-auto cursor-pointer" />
                    )}
                  </th>"""
content = content.replace(old_header_checkbox, new_header_checkbox)

# 6. Update row checkbox
old_row_checkbox = """                      <td className="px-4 py-3 w-10 text-center text-[#2D3142]/20 group-hover:text-[#2D3142]/40">
                        <Square className="w-4 h-4 mx-auto cursor-pointer" />
                      </td>"""
new_row_checkbox = """                      <td 
                        className="px-4 py-3 w-10 text-center text-[#2D3142]/20 group-hover:text-[#2D3142]/40"
                        onClick={() => toggleRowSelection(supp.id)}
                      >
                        {selectedRowIds.includes(supp.id) ? (
                          <CheckSquare className="w-4 h-4 mx-auto cursor-pointer text-[#F16775]" />
                        ) : (
                          <Square className="w-4 h-4 mx-auto cursor-pointer" />
                        )}
                      </td>"""
content = content.replace(old_row_checkbox, new_row_checkbox)

with open(file_path, 'w') as f:
    f.write(content)

print("Dynamic updates applied to SuppliersView.")
