import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/components/Sidebar.tsx"
with open(file_path, 'r') as f:
    content = f.read()

bad_toggle_1 = """            {/* Toggle Button */}
            <button onClick={() => setIsCollapsed(true)} className="text-[#F9F8F6]/50 hover:text-white transition-colors">
              <PanelLeftClose size={18} />
            </button>\n"""

bad_toggle_2 = """        {isCollapsed && (
           <button onClick={() => setIsCollapsed(false)} className="text-[#F9F8F6]/50 hover:text-white transition-colors mb-4 mt-2">
             <PanelLeftOpen size={20} />
           </button>
        )}\n"""

content = content.replace(bad_toggle_1, "")
content = content.replace(bad_toggle_2, "")

with open(file_path, 'w') as f:
    f.write(content)

print("Removed duplicate toggle buttons.")
