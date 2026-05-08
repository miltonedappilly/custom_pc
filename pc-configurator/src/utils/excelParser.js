import * as XLSX from 'xlsx';

export const CATEGORIES = [
  'CPU',
  'Motherboard',
  'RAM',
  'GPU',
  'Storage',
  'PSU',
  'Cabinet',
  'Cooling',
  'Monitor',
  'Keyboard',
  'Mouse',
  'Peripherals',
];

// Columns expected in the Excel template (case-insensitive match)
const COL_MAP = {
  category: ['category', 'cat'],
  brand: ['brand'],
  model: ['model', 'product', 'name', 'product name'],
  specs: ['specs', 'specifications', 'description', 'spec'],
  costPrice: ['cost price', 'cost', 'purchase price', 'buy price'],
  sellingPrice: ['selling price', 'sell price', 'mrp', 'price'],
  stock: ['stock', 'availability', 'status', 'available'],
  tag: ['tag', 'socket', 'compatibility tag', 'compat tag'],
};

function findColumn(headers, aliases) {
  const lower = headers.map((h) => (h || '').toString().trim().toLowerCase());
  for (const alias of aliases) {
    const idx = lower.indexOf(alias);
    if (idx !== -1) return idx;
  }
  return -1;
}

export function parseExcel(arrayBuffer) {
  const wb = XLSX.read(arrayBuffer, { type: 'array' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  if (rows.length < 2) throw new Error('Excel file is empty or missing headers.');

  const headers = rows[0].map((h) => (h || '').toString());
  const cols = {};
  for (const [key, aliases] of Object.entries(COL_MAP)) {
    cols[key] = findColumn(headers, aliases);
  }

  if (cols.category === -1) throw new Error('Missing required column: Category');
  if (cols.model === -1) throw new Error('Missing required column: Model / Product Name');
  if (cols.sellingPrice === -1) throw new Error('Missing required column: Selling Price');

  const parts = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const category = (row[cols.category] || '').toString().trim();
    const model = (row[cols.model] || '').toString().trim();
    if (!category || !model) continue;

    const sellingPrice = parseFloat(row[cols.sellingPrice]) || 0;
    const costPrice = cols.costPrice !== -1 ? parseFloat(row[cols.costPrice]) || 0 : 0;

    parts.push({
      id: `${i}-${category}-${model}`,
      category,
      brand: cols.brand !== -1 ? (row[cols.brand] || '').toString().trim() : '',
      model,
      specs: cols.specs !== -1 ? (row[cols.specs] || '').toString().trim() : '',
      costPrice,
      sellingPrice,
      stock: cols.stock !== -1 ? (row[cols.stock] || 'Available').toString().trim() : 'Available',
      tag: cols.tag !== -1 ? (row[cols.tag] || '').toString().trim() : '',
    });
  }

  if (parts.length === 0) throw new Error('No valid product rows found in the Excel file.');
  return parts;
}

export function groupByCategory(parts) {
  const grouped = {};
  for (const part of parts) {
    if (!grouped[part.category]) grouped[part.category] = [];
    grouped[part.category].push(part);
  }
  return grouped;
}
