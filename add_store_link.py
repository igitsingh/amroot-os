import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/components/Sidebar.tsx"
with open(file_path, 'r') as f:
    content = f.read()

import_regex = r"(import \{.*BookOpen)( \} from 'lucide-react';)"
content = re.sub(import_regex, r"\1, ExternalLink\2", content)

old_footer = """      <div className="mt-auto pt-6 border-t border-white/10">
        <Link href="/settings" className={getLinkClasses('/settings')}>
          <Settings size={16} className={getIconClasses('/settings')} />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>"""

new_footer = """      <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-1">
        <a href="https://amrootorganics.com" target="_blank" rel="noopener noreferrer" className={getLinkClasses('/external-store')}>
          <ExternalLink size={16} className={getIconClasses('/external-store')} />
          {!isCollapsed && <span>Live Store</span>}
        </a>
        <Link href="/settings" className={getLinkClasses('/settings')}>
          <Settings size={16} className={getIconClasses('/settings')} />
          {!isCollapsed && <span>Settings</span>}
        </Link>
      </div>"""

content = content.replace(old_footer, new_footer)

with open(file_path, 'w') as f:
    f.write(content)

print("Added Live Store link to sidebar footer.")
