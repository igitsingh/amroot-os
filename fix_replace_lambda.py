import os

src_dir = "/Users/isachinsingh/Desktop/AMROOT-OS/src"
for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()

            if "l => l.toUpperCase()" in content:
                content = content.replace("l => l.toUpperCase()", "(l: string) => l.toUpperCase()")
                with open(filepath, 'w') as f:
                    f.write(content)

