import os
import re

DIRECTORY = "/Users/isachinsingh/Desktop/PARADISE-OS/src"

REPLACEMENTS = {
    # Layout background and text
    r'bg-\[\#050505\]': 'bg-[#F9F8F6]',
    r'text-\[\#FAFAFA\]': 'text-[#2D3142]',
    r'bg-[#050505]': 'bg-[#F9F8F6]',
    r'text-[#FAFAFA]': 'text-[#2D3142]',
    r'bg-\[\#1C2128\]/50': 'bg-white',
    r'bg-\[\#1C2128\]': 'bg-white',
    
    # Text colors
    r'text-white': 'text-[#2D3142]',
    r'text-white/(\d+)': r'text-[#2D3142]/\1',
    r'text-gray-400': 'text-[#2D3142]/70',
    r'text-gray-300': 'text-[#2D3142]/80',
    r'text-emerald-500': 'text-[#034F46]',
    r'text-emerald-400': 'text-[#034F46]',
    r'text-\[\#10B981\]': 'text-[#034F46]',
    r'text-blue-500': 'text-[#F16775]',
    r'text-blue-400': 'text-[#F16775]',
    r'text-indigo-500': 'text-[#F16775]',
    r'text-indigo-400': 'text-[#F16775]',
    r'text-amber-500': 'text-[#F59E0B]',
    r'text-amber-400': 'text-[#F59E0B]',
    
    # Backgrounds
    r'bg-black/40': 'bg-white',
    r'bg-black/50': 'bg-white',
    r'bg-black/60': 'bg-white',
    r'bg-white/5': 'bg-[#2D3142]/5',
    r'bg-white/10': 'bg-[#2D3142]/10',
    r'bg-emerald-500/10': 'bg-[#034F46]/10',
    r'bg-emerald-500/20': 'bg-[#034F46]/20',
    r'bg-emerald-500/30': 'bg-[#034F46]/30',
    r'bg-emerald-500': 'bg-[#034F46]',
    r'bg-blue-500/5': 'bg-[#F16775]/10',
    r'bg-blue-500/10': 'bg-[#F16775]/10',
    r'bg-blue-500/20': 'bg-[#F16775]/20',
    r'bg-indigo-500/10': 'bg-[#F16775]/10',
    
    # Borders
    r'border-white/10': 'border-[#2D3142]/10',
    r'border-white/5': 'border-[#2D3142]/5',
    r'border-emerald-500/20': 'border-[#034F46]/20',
    r'border-emerald-500/30': 'border-[#034F46]/30',
    r'border-emerald-500/40': 'border-[#034F46]/40',
    r'border-emerald-500/50': 'border-[#034F46]/50',
    r'border-emerald-500': 'border-[#034F46]',
    r'border-blue-500/10': 'border-[#F16775]/10',
    r'border-blue-500/20': 'border-[#F16775]/20',
    r'border-blue-500/30': 'border-[#F16775]/30',
    r'border-blue-500/40': 'border-[#F16775]/40',
    r'border-blue-500': 'border-[#F16775]',
    
    # Rings & Others
    r'ring-emerald-500/50': 'ring-[#034F46]/50',
    r'ring-blue-500/50': 'ring-[#F16775]/50',
    r'shadow-emerald-500/10': 'shadow-[#034F46]/10',
}

for root, _, files in os.walk(DIRECTORY):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            original = content
            for pattern, replacement in REPLACEMENTS.items():
                content = re.sub(pattern, replacement, content)
                
            if content != original:
                with open(path, 'w') as f:
                    f.write(content)
                print(f"Updated {path}")
