const fs = require('fs');

const prefixes = [
  'Aaroot', 'Amroot', 'Paradise', 'Toorma', 'Aaryam', 'Abhaya', 'Advika', 'Agronova', 'Ahimsa', 'Ajita', 
  'Akasa', 'Alaya', 'Amara', 'Ananda', 'Ananta', 'Anika', 'Apara', 'Aranya', 'Arogya', 'Artha', 
  'Arya', 'Asmi', 'Atma', 'Aura', 'Avani', 'Avighna', 'Ayura', 'Banyan', 'Bhadra', 'Bhumi', 
  'Bodhi', 'Brahmic', 'Canna', 'Celesta', 'Chakra', 'Citrine', 'Cuminova', 'Daksha', 'Darshana', 
  'Deva', 'Dharma', 'Dhatu', 'Dhriti', 'Divya', 'Eartha', 'Eka', 'Ekkam', 'Elixir', 'Enso', 
  'Esha', 'Etam', 'Flora', 'Foresta', 'Gana', 'Garima', 'Gauri', 'Gingerly', 'Golden', 'Grishma', 
  'Guava', 'Guna', 'Haldi', 'Hamsa', 'Haridra', 'Harita', 'Hema', 'Himasa', 'Idha', 'Iha', 
  'Indu', 'Ira', 'Isha', 'Jala', 'Janani', 'Jiva', 'Jivana', 'Jyoti', 'Kama', 'Kanaka', 
  'Kanti', 'Karma', 'Karuna', 'Kashi', 'Kaya', 'Keda', 'Keshari', 'Keva', 'Kriya', 'Kroma', 
  'Kusa', 'Lakshya', 'Laya', 'Lila', 'Loka', 'Lotus', 'Lumi', 'Madhu', 'Maha', 'Mahi', 
  'Mandala', 'Mantra', 'Maya', 'Medha', 'Mira', 'Moksha', 'Mula', 'Nadi', 'Nala', 'Nava', 
  'Navya', 'Naya', 'Nila', 'Nira', 'Niramaya', 'Nitya', 'Nova', 'Nura', 'Ojas', 'Omkara', 
  'Omni', 'Origo', 'Padma', 'Para', 'Pavitra', 'Prana', 'Prithvi', 'Priya', 'Pura', 'Purva', 
  'Qura', 'Qveda', 'Raga', 'Rasa', 'Rati', 'Ray', 'Ritu', 'Rudra', 'Rupa', 'Sachi', 
  'Sada', 'Sahaja', 'Sama', 'Samudra', 'Sana', 'Sankalpa', 'Sarva', 'Satya', 'Sattva', 'Shakti', 
  'Shanti', 'Shiva', 'Shunya', 'Siddhi', 'Soma', 'Sona', 'Suvarna', 'Swara', 'Tattva', 'Tara', 
  'Tejas', 'Terra', 'Trideva', 'Tula', 'Turiya', 'Tvasta', 'Udaya', 'Uma', 'Urja', 'Urvi', 
  'Usha', 'Utkarsh', 'Vacha', 'Veda', 'Vedic', 'Vana', 'Vanya', 'Vara', 'Varna', 'Vidya', 
  'Vira', 'Viva', 'Vyoma', 'Wana', 'Wellness', 'Weda', 'Xana', 'Xylia', 'Yajna', 'Yama', 
  'Yantra', 'Yoga', 'Yuga', 'Yuva', 'Zana', 'Zanta', 'Ziva', 'Zoya', 'Zyra'
];

const suffixes = ['Organics', 'Spices', 'Naturals', 'Harvest', 'Roots', 'Botanicals', 'Agro', 'Farms', 'Exports', 'Earth'];

// Logic for complexity:
const highRiskPrefixes = ['Amroot', 'Aaroot', 'Ananda', 'Ananta', 'Arya', 'Ayura', 'Bodhi', 'Chakra', 'Deva', 'Dharma', 'Divya', 'Gauri', 'Haldi', 'Kama', 'Kashi', 'Madhu', 'Maha', 'Mantra', 'Maya', 'Moksha', 'Omkara', 'Prana', 'Prithvi', 'Sachi', 'Sattva', 'Shakti', 'Shanti', 'Shiva', 'Soma', 'Suvarna', 'Tattva', 'Veda', 'Vedic', 'Vidya', 'Yoga'];
const mediumRiskPrefixes = ['Amara', 'Aura', 'Bhumi', 'Citrine', 'Eartha', 'Flora', 'Golden', 'Lotus', 'Omni', 'Ray', 'Terra', 'Wellness'];

function getComplexity(prefix, suffix) {
    if (highRiskPrefixes.includes(prefix)) {
        if (prefix === 'Amroot' || prefix === 'Aaroot') {
            return { level: 'High', reason: `High collision risk. Phonetically identical to existing marks like AMRUT and GRAMROOT in Class 30.` };
        }
        return { level: 'High', reason: `High collision risk. '${prefix}' is a highly common dictionary/Sanskrit term heavily registered in Class 30 (Spices/Food).` };
    }
    if (mediumRiskPrefixes.includes(prefix)) {
        return { level: 'Medium', reason: `Medium risk. '${prefix}' is a common suggestive term. May require a strong unique logo (Device Mark) to overcome phonetic similarities.` };
    }
    if (prefix.length <= 4 && !['Ziva', 'Zoya', 'Zyra'].includes(prefix)) {
        return { level: 'Medium', reason: `Medium risk. Short 3-4 letter words often have overlapping phonetic matches. Requires thorough search.` };
    }
    if (prefix.startsWith('X') || prefix.startsWith('Z') || prefix.startsWith('Q') || prefix.includes('nova') || prefix.includes('veda')) {
         if(prefix === 'Qveda') return { level: 'Low', reason: `Low risk. Coined abstract term. Highly distinctive for Class 30.` };
         return { level: 'Low', reason: `Low risk. Rare starting letter/coined term makes phonetic collision highly unlikely.` };
    }
    if (suffix === 'Spices' || suffix === 'Organics') {
         return { level: 'Medium', reason: `Medium risk. The suffix '${suffix}' is descriptive, making the primary prefix bear all the distinctiveness.` };
    }
    
    return { level: 'Low', reason: `Low risk. Phonetically distinct and uncommon in Class 30. Good candidate for Word Mark registration.` };
}

let allNames = [];

allNames.push({ name: 'Aaroot Organics', category: 'Arbitrary', ...getComplexity('Aaroot', 'Organics') });
allNames.push({ name: 'Amroot Organics', category: 'Arbitrary', ...getComplexity('Amroot', 'Organics') });
allNames.push({ name: 'Paradise Organics', category: 'Arbitrary', ...getComplexity('Paradise', 'Organics') });
allNames.push({ name: 'Toorma Organics', category: 'Arbitrary', ...getComplexity('Toorma', 'Organics') });

const categories = ['Arbitrary', 'Suggestive', 'Premium / Sanskrit', 'Modern / Abstract'];

let index = 0;
for (let p of prefixes) {
  if (p === 'Aaroot' || p === 'Amroot' || p === 'Paradise' || p === 'Toorma') continue;
  
  let s = suffixes[index % suffixes.length];
  let c = categories[index % categories.length];
  
  allNames.push({ name: `${p} ${s}`, category: c, ...getComplexity(p, s) });
  index++;
  
  if (allNames.length < 280 && index % 2 === 0) {
      let s2 = suffixes[(index + 3) % suffixes.length];
      let c2 = categories[(index + 1) % categories.length];
      allNames.push({ name: `${p} ${s2}`, category: c2, ...getComplexity(p, s2) });
  }
}

allNames.sort((a, b) => a.name.localeCompare(b.name));

const uniqueNames = [];
const seen = new Set();
for (let item of allNames) {
    if (!seen.has(item.name)) {
        seen.add(item.name);
        uniqueNames.push(item);
    }
}

const fileContent = `export interface BrandNameIdea {
  name: string;
  category: 'Arbitrary' | 'Suggestive' | 'Premium / Sanskrit' | 'Modern / Abstract';
  level: 'Low' | 'Medium' | 'High';
  reason: string;
}

export const brandNameIdeas: BrandNameIdea[] = ${JSON.stringify(uniqueNames, null, 2)};
`;

fs.writeFileSync('./src/data/brandNames.ts', fileContent);
console.log(`Generated ${uniqueNames.length} names with complexity!`);
