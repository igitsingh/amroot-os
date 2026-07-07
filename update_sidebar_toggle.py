import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/components/Sidebar.tsx"
with open(file_path, 'r') as f:
    content = f.read()

old_button_1 = """            {/* Golden Glowing Circle Logo */}
            <button onClick={() => setIsCollapsed(true)} className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.6)] animate-pulse" />"""

new_button_1 = """            {/* Toggle Button */}
            <button onClick={() => setIsCollapsed(true)} className="text-[#F9F8F6]/50 hover:text-white transition-colors">
              <PanelLeftClose size={18} />
            </button>"""

old_button_2 = """           <button onClick={() => setIsCollapsed(false)} className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.6)] animate-pulse mb-4 mt-2" />"""

new_button_2 = """           <button onClick={() => setIsCollapsed(false)} className="text-[#F9F8F6]/50 hover:text-white transition-colors mb-4 mt-2">
             <PanelLeftOpen size={20} />
           </button>"""

content = content.replace(old_button_1, new_button_1)
content = content.replace(old_button_2, new_button_2)

with open(file_path, 'w') as f:
    f.write(content)

print("Removed glowing circles and added panel toggle icons.")
