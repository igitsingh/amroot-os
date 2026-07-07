import os

path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/components/Sidebar.tsx"
with open(path, 'r') as f:
    content = f.read()

# Make background green
content = content.replace("bg-white backdrop-blur-3xl text-[#2D3142]/60", "bg-[#034F46] text-[#F9F8F6]/70")
# Remove border right since it's solid
content = content.replace("flex-shrink-0 border-r border-[#2D3142]/5 relative z-50", "flex-shrink-0 relative z-50")

# Update text colors in header
content = content.replace("text-[#2D3142]/90", "text-[#F9F8F6]")
content = content.replace("text-[#2D3142]/40 hover:text-[#2D3142]", "text-[#F9F8F6]/50 hover:text-[#F9F8F6]")

# Update link hover backgrounds
content = content.replace("hover:bg-[#2D3142]/5", "hover:bg-white/10")
# Update group hover text
content = content.replace("group-hover:text-[#2D3142]", "group-hover:text-white")

# Update section headers
content = content.replace("text-[#2D3142]/30", "text-[#F9F8F6]/50")

# Update borders
content = content.replace("border-t border-[#2D3142]/5", "border-t border-white/10")
content = content.replace("border-transparent hover:border-[#2D3142]/5", "border-transparent hover:border-white/10")

with open(path, 'w') as f:
    f.write(content)
