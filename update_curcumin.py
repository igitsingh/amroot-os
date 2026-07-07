import re

file_path = "/Users/isachinsingh/Desktop/PARADISE-OS/src/app/competitors/CompetitorsView.tsx"
with open(file_path, 'r') as f:
    content = f.read()

old_getCurcuminVal = """  const getCurcuminVal = (comp: any, intel: any) => {
    if (intel && intel.curcuminDisplay) {
      const match = intel.curcuminDisplay.match(/(\d+(\.\d+)?)/);
      if (match) return parseFloat(match[1]);
    }
    // Fallback for known edge cases if parse fails
    const isTwoBrothers = comp.name === 'Two Brothers Organic Farms';
    const isMaatru = comp.name === 'Maatru Rasah';
    const isNiraam = comp.name === 'Niraam Superfoods';
    const isPahadi = comp.name === 'My Pahadi Dukan';
    const isDiaspora = comp.id === 'brand-diaspora';
    return isTwoBrothers ? 10.43 : isMaatru ? 9.5 : isNiraam ? 7.0 : (isPahadi ? 8.0 : (isDiaspora ? 4.7 : 0));
  };"""

new_getCurcuminRange = """  const getCurcuminRange = (comp: any, intel: any) => {
    let min = 0, max = 0;
    if (intel && intel.curcuminDisplay) {
      const matches = [...intel.curcuminDisplay.matchAll(/(\d+(\.\d+)?)/g)];
      if (matches.length > 0) {
         const nums = matches.map(m => parseFloat(m[1]));
         min = min(nums);
         max = max(nums);
         return { min, max };
      }
    }
    const isTwoBrothers = comp.name === 'Two Brothers Organic Farms';
    const isMaatru = comp.name === 'Maatru Rasah';
    const isNiraam = comp.name === 'Niraam Superfoods' || comp.id === 'brand-niraam';
    const isPahadi = comp.name === 'My Pahadi Dukan';
    const isDiaspora = comp.id === 'brand-diaspora';
    const isAmyra = comp.id === 'brand-amyra-farms';
    const isNiraKitchen = comp.id === 'brand-nira-kitchen';
    
    if (isAmyra) return { min: 7, max: 12 };
    if (isTwoBrothers) return { min: 10.43, max: 10.43 };
    if (isMaatru) return { min: 9.5, max: 9.5 };
    if (isNiraam || isNiraKitchen) return { min: 7.5, max: 7.5 };
    if (isPahadi) return { min: 8.0, max: 8.0 };
    if (isDiaspora) return { min: 4.7, max: 4.7 };
    return { min: 0, max: 0 };
  };"""

# Wait, `min(nums)` in JS is `Math.min(...nums)`. In Python I am writing JS code, so I must make sure it says `Math.min(...nums)`!
new_getCurcuminRange = new_getCurcuminRange.replace("min(nums)", "Math.min(...nums)").replace("max(nums)", "Math.max(...nums)")

content = content.replace(old_getCurcuminVal, new_getCurcuminRange)

old_filter = """    // Curcumin Checkbox Filters
    if (selectedCurcuminFilters.length > 0) {
      const val = getCurcuminVal(comp, intel);
      const matches = selectedCurcuminFilters.some(filterLabel => {
        if (filterLabel === 'Less than 1%') return val < 1;
        const num = parseInt(filterLabel);
        return val >= num && val < num + 1;
      });
      if (!matches) return false;
    }"""

new_filter = """    // Curcumin Checkbox Filters
    if (selectedCurcuminFilters.length > 0) {
      const { min, max } = getCurcuminRange(comp, intel);
      const matches = selectedCurcuminFilters.some(filterLabel => {
        if (filterLabel === 'Less than 1%') return min < 1;
        const num = parseInt(filterLabel);
        return max >= num && min < num + 1;
      });
      if (!matches) return false;
    }"""

content = content.replace(old_filter, new_filter)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated curcumin filtering.")
