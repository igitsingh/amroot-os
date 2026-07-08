const fs = require('fs');

let content = fs.readFileSync('./src/data/brandNames.ts', 'utf-8');
const match = content.match(/export const brandNameIdeas: BrandNameIdea\[\] = (\[.*\]);/s);
if (!match) {
    console.error("Could not parse existing names.");
    process.exit(1);
}

let existingNames = JSON.parse(match[1]);

const newEntries = [
    {
        name: 'Meghroots',
        category: 'Arbitrary',
        level: 'Low',
        reason: "Extremely Low Risk. 'Megh' (from Meghalaya) + 'Roots' is a highly distinct, coined portmanteau. Highly registrable in Class 30 as an arbitrary/invented word mark."
    },
    {
        name: 'Meghroots Organics',
        category: 'Arbitrary',
        level: 'Low',
        reason: "Low Risk. The core coined term 'Meghroots' carries all the distinctiveness, easily overcoming the descriptive 'Organics' suffix in Class 30."
    },
    {
        name: 'Meghroots Naturals',
        category: 'Arbitrary',
        level: 'Low',
        reason: "Low Risk. Highly registrable. 'Meghroots' is a strong arbitrary prefix that perfectly highlights the Meghalayan origin."
    },
    {
        name: 'Meghroots Spices',
        category: 'Arbitrary',
        level: 'Low',
        reason: "Low Risk. A brilliant coined term that conceptually links the product (roots/spices) to the pristine origin (Meghalaya) without being legally descriptive."
    }
];

const allNames = [...existingNames, ...newEntries];
const uniqueNames = [];
const seen = new Set();

for (let item of allNames) {
    if (!seen.has(item.name)) {
        seen.add(item.name);
        uniqueNames.push(item);
    }
}

uniqueNames.sort((a, b) => {
    // Put Meghroots at the very top for visibility, or just alphabetical
    if (a.name.startsWith('Meghroots') && !b.name.startsWith('Meghroots')) return -1;
    if (!a.name.startsWith('Meghroots') && b.name.startsWith('Meghroots')) return 1;
    return a.name.localeCompare(b.name);
});

const fileContent = `export interface BrandNameIdea {
  name: string;
  category: 'Arbitrary' | 'Suggestive' | 'Premium / Sanskrit' | 'Modern / Abstract';
  level: 'Low' | 'Medium' | 'High';
  reason: string;
}

export const brandNameIdeas: BrandNameIdea[] = ${JSON.stringify(uniqueNames, null, 2)};
`;

fs.writeFileSync('./src/data/brandNames.ts', fileContent);
console.log(`Added Meghroots names! Total: ${uniqueNames.length}`);
