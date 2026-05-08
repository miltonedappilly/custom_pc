// Basic compatibility rules: warn if socket tags don't match between paired categories.
const PAIRED = [
  ['CPU', 'Motherboard'],
];

export function checkCompatibility(selected) {
  const warnings = [];

  for (const [catA, catB] of PAIRED) {
    const partA = selected[catA];
    const partB = selected[catB];
    if (!partA || !partB) continue;
    if (!partA.tag || !partB.tag) continue;
    if (partA.tag.toLowerCase() !== partB.tag.toLowerCase()) {
      warnings.push(
        `Compatibility warning: ${catA} "${partA.model}" (${partA.tag}) may not be compatible with Motherboard "${partB.model}" (${partB.tag}).`
      );
    }
  }

  return warnings;
}
