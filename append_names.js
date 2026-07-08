const fs = require('fs');

// Read existing
let content = fs.readFileSync('./src/data/brandNames.ts', 'utf-8');

// Extract the JSON array
const match = content.match(/export const brandNameIdeas: BrandNameIdea\[\] = (\[.*\]);/s);
if (!match) {
    console.error("Could not parse existing names.");
    process.exit(1);
}

let existingNames = JSON.parse(match[1]);

const newNamesList = [
  'Eden', 'Genesis', 'Heritage', 'Oasis', 'Pinnacle', 'Zenith', 'Harvest', 'Origin', 'Earthly', 'Valley',
  'Divine', 'Purest', 'Pristine', 'Majestic', 'Supreme', 'Crown', 'Royal', 'Imperial', 'Summit', 'Crest',
  'Prime', 'Apex', 'Vertex', 'Haven', 'Bliss', 'Harmony', 'Serenity', 'Utopia', 'Nirvana', 'Radiant',
  'Luminous', 'Solstice', 'Equinox', 'Meridian', 'Horizon', 'Discovery', 'Pioneer', 'Frontier', 'Legacy',
  'Evergreen', 'Bounty', 'Nature', 'Essence', 'Native', 'Verdant', 'Lush', 'Golden', 'Sacred', 'Timeless'
];

const newEntries = newNamesList.map(name => {
    let suffix = 'Organics';
    let fullName = `${name} ${suffix}`;
    return {
        name: fullName,
        category: 'Suggestive',
        level: 'High',
        reason: `High risk. '${name}' is a highly common dictionary/English word. Common dictionary nouns paired with 'Organics' are notoriously saturated in Class 30 and very difficult to trademark exclusively without a distinct visual logo.`
    };
});

// merge and deduplicate
const allNames = [...existingNames, ...newEntries];
const uniqueNames = [];
const seen = new Set();

for (let item of allNames) {
    if (!seen.has(item.name)) {
        seen.add(item.name);
        uniqueNames.push(item);
    }
}

uniqueNames.sort((a, b) => a.name.localeCompare(b.name));

const fileContent = `export interface BrandNameIdea {
  name: string;
  category: 'Arbitrary' | 'Suggestive' | 'Premium / Sanskrit' | 'Modern / Abstract';
  level: 'Low' | 'Medium' | 'High';
  reason: string;
}

export const brandNameIdeas: BrandNameIdea[] = ${JSON.stringify(uniqueNames, null, 2)};
`;

fs.writeFileSync('./src/data/brandNames.ts', fileContent);
console.log(`Added ${newEntries.length} new names. Total is now ${uniqueNames.length}.`);
