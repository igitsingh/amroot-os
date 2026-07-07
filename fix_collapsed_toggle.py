import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/components/Sidebar.tsx"
with open(file_path, 'r') as f:
    content = f.read()

old_button = """        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`text-[#F9F8F6]/50 hover:text-[#F9F8F6] transition-colors ${isCollapsed ? 'absolute bottom-8' : ''}`}
        >"""

new_button = """        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#F9F8F6]/50 hover:text-[#F9F8F6] transition-colors"
        >"""

content = content.replace(old_button, new_button)

with open(file_path, 'w') as f:
    f.write(content)

print("Fixed collapsed toggle button position.")
