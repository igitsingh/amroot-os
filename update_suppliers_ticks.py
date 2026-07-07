import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/app/suppliers/SuppliersView.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# Fix Header Checkbox
old_header_checkbox = """<th className="px-4 py-3 w-10 text-center" onClick={toggleAllRows}>
                    {selectedRowIds.length === sortedSuppliers.length && sortedSuppliers.length > 0 ? (
                      <CheckSquare className="w-4 h-4 mx-auto cursor-pointer text-[#F16775]" />
                    ) : (
                      <Square className="w-4 h-4 mx-auto cursor-pointer" />
                    )}
                  </th>"""

new_header_checkbox = """<th className="px-4 py-3 w-10 text-center">
                    <input 
                      type="checkbox" 
                      className="cursor-pointer accent-[#F16775]"
                      checked={selectedRowIds.length === sortedSuppliers.length && sortedSuppliers.length > 0}
                      onChange={toggleAllRows}
                    />
                  </th>"""
content = content.replace(old_header_checkbox, new_header_checkbox)

# Fix Row Checkbox
old_row_checkbox = """                      <td 
                        className="px-4 py-3 w-10 text-center text-[#2D3142]/20 group-hover:text-[#2D3142]/40"
                        onClick={() => toggleRowSelection(supp.id)}
                      >
                        {selectedRowIds.includes(supp.id) ? (
                          <CheckSquare className="w-4 h-4 mx-auto cursor-pointer text-[#F16775]" />
                        ) : (
                          <Square className="w-4 h-4 mx-auto cursor-pointer" />
                        )}
                      </td>"""

new_row_checkbox = """                      <td className="px-4 py-3 w-10 text-center">
                        <input 
                          type="checkbox" 
                          className="cursor-pointer accent-[#F16775]"
                          checked={selectedRowIds.includes(supp.id)}
                          onChange={(e) => toggleRowSelection(supp.id)}
                        />
                      </td>"""

content = content.replace(old_row_checkbox, new_row_checkbox)

# Update row highlighting (add pink background if selected)
old_tr = """<tr key={supp.id} className="hover:bg-white/[0.02] group transition-colors">"""
new_tr = """<tr key={supp.id} className={`hover:bg-white/[0.02] group transition-colors ${selectedRowIds.includes(supp.id) ? 'bg-[#F16775]/5' : ''}`}>"""
content = content.replace(old_tr, new_tr)


# Let's also fix the filter checkboxes to exactly match the ones in CompetitorsView
# In CompetitorsView they use a custom div with CheckSquare but maybe the user wants it to look like a native checkbox too?
# Let's check how the custom div is rendered in SuppliersView
old_filter_div = """                  <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border transition-colors ${isChecked ? 'bg-[#F16775] border-[#F16775]' : 'border-[#2D3142]/20 group-hover/label:border-[#F16775]/50'}`}>
                    {isChecked && <CheckSquare className="w-3 h-3 text-white" />}
                  </div>"""

new_filter_div = """                  <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${isChecked ? 'bg-[#F16775] border-[#F16775]' : 'border-[#2D3142]/20 group-hover/label:border-[#F16775]/50 bg-white'}`}>
                    {isChecked && <CheckSquare className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>"""
content = content.replace(old_filter_div, new_filter_div)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated ticks.")
