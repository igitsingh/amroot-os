import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/app/competitors/CompetitorsView.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# 1. Clean up any lingering line numbers from the tool glitch (e.g. "      303: ")
# We match beginning of line, optional whitespace, digits, colon, optional space
content = re.sub(r'^(?:\s*)\d+:\s+', lambda m: m.group(0).replace(m.group(0).strip(), ''), content, flags=re.MULTILINE)
# wait, replacing the stripped group might be tricky. Let's just do:
def replacer(m):
    # m.group(0) is like "     303: "
    # we want to return just the spaces
    spaces = len(m.group(0)) - len(m.group(0).lstrip())
    return " " * spaces

content = re.sub(r'^\s*\d+:\s', replacer, content, flags=re.MULTILINE)

# 2. Add Pinterest rendering logic
# We need to add `(intel.socialMedia?.pinterest && intel.socialMedia?.pinterest !== 'Not Publicly Available')` to `hasNewSocial`
has_new_social_regex = r"const hasNewSocial = intel\?\.socialMedia && \([\s\S]*?\(intel\.socialMedia\?\.linkedin && intel\.socialMedia\?\.linkedin !== 'Not Publicly Available'\)\n\s*\);"
new_has_new_social = """const hasNewSocial = intel?.socialMedia && (
                                (intel.socialMedia?.instagram && intel.socialMedia?.instagram !== 'Not Publicly Available') || 
                                (intel.socialMedia?.facebook && intel.socialMedia?.facebook !== 'Not Publicly Available') || 
                                (intel.socialMedia?.pinterest && intel.socialMedia?.pinterest !== 'Not Publicly Available') ||
                                (intel.socialMedia?.linkedin && intel.socialMedia?.linkedin !== 'Not Publicly Available')
                              );"""
content = re.sub(has_new_social_regex, new_has_new_social, content)

# 3. Add the Pinterest rendering block
pinterest_svg = """<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.568-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>"""

facebook_block_regex = r"(\{intel\.socialMedia\?\.facebook && intel\.socialMedia\?\.facebook !== 'Not Publicly Available' && \([\s\S]*?\)\})"
new_facebook_and_pinterest = f"""\\1
                                    {{intel.socialMedia?.pinterest && intel.socialMedia?.pinterest !== 'Not Publicly Available' && (
                                      <a href={{intel.socialMedia?.pinterest}} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#F16775] transition-colors" onClick={{(e) => e.stopPropagation()}}>
                                        {pinterest_svg}
                                        {{intel.socialMedia?.pinterest.replace('https://pinterest.com/', '').replace('https://www.pinterest.com/', '').replace('/', '')}}
                                      </a>
                                    )}}"""
content = re.sub(facebook_block_regex, new_facebook_and_pinterest, content, count=1)

with open(file_path, 'w') as f:
    f.write(content)

print("Fixed line numbers and added Pinterest.")
