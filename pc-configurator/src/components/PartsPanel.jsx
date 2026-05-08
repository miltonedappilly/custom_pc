import { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Plus, Check, X, AlertCircle } from 'lucide-react';

const CURRENCY = '₹';
function fmt(n) { return n.toLocaleString('en-IN'); }

function PartRow({ part, selected, onSelect }) {
  const outOfStock = part.stock?.toLowerCase().includes('out');
  const isSelected = selected?.id === part.id;
  const margin = part.sellingPrice - part.costPrice;

  return (
    <div className={`group flex items-center gap-4 px-5 py-4 border-b border-slate-100 transition-colors ${
      isSelected ? 'bg-blue-50' : outOfStock ? 'opacity-50' : 'hover:bg-slate-50'
    }`}>
      <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-2xl font-bold border ${
        isSelected ? 'border-blue-200 bg-blue-100 text-blue-600' : 'border-slate-200 bg-slate-100 text-slate-400'
      }`}>
        {part.brand ? part.brand[0] : '#'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {part.brand && (
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{part.brand}</span>
          )}
          {part.tag && (
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">{part.tag}</span>
          )}
          {outOfStock && (
            <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Out of Stock
            </span>
          )}
        </div>
        <p className={`font-semibold mt-0.5 truncate ${isSelected ? 'text-blue-800' : 'text-slate-800'}`}>{part.model}</p>
        {part.specs && (
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{part.specs}</p>
        )}
      </div>

      <div className="text-right shrink-0 mr-2">
        <p className={`text-lg font-bold ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
          {CURRENCY}{fmt(part.sellingPrice)}
        </p>
        {part.costPrice > 0 && (
          <p className="text-xs text-slate-400">Cost: {CURRENCY}{fmt(part.costPrice)}</p>
        )}
        {part.costPrice > 0 && margin > 0 && (
          <p className="text-xs text-green-600 font-medium">+{CURRENCY}{fmt(margin)} margin</p>
        )}
      </div>

      <button
        disabled={outOfStock}
        onClick={() => !outOfStock && onSelect(part)}
        className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all font-medium ${
          isSelected
            ? 'bg-blue-600 text-white hover:bg-red-500'
            : outOfStock
            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
            : 'bg-slate-100 text-slate-500 hover:bg-blue-600 hover:text-white'
        }`}
        title={isSelected ? 'Remove' : 'Add'}
      >
        {isSelected ? <Check className="w-4 h-4 group-hover:hidden" /> : <Plus className="w-4 h-4" />}
        {isSelected && <X className="w-4 h-4 hidden group-hover:block" />}
      </button>
    </div>
  );
}

export default function PartsPanel({ category, parts, selectedPart, onSelect }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = parts.filter((p) => {
      const q = search.toLowerCase();
      return (
        !q ||
        p.model.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.toLowerCase().includes(q)
      );
    });
    if (sortBy === 'price_asc') list = [...list].sort((a, b) => a.sellingPrice - b.sellingPrice);
    if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.sellingPrice - a.sellingPrice);
    if (sortBy === 'name') list = [...list].sort((a, b) => a.model.localeCompare(b.model));
    return list;
  }, [parts, search, sortBy]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white">
      <div className="px-5 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{category}</h2>
            <p className="text-sm text-slate-400">{parts.length} option{parts.length !== 1 ? 's' : ''}</p>
          </div>
          {selectedPart && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-sm text-blue-700 font-medium truncate max-w-48">{selectedPart.model}</span>
              <button
                onClick={() => onSelect(selectedPart)}
                className="text-blue-400 hover:text-blue-700 ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${category}...`}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer text-slate-600"
            >
              <option value="default">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Search className="w-8 h-8 mb-2" />
            <p className="text-sm">No parts match your search</p>
          </div>
        ) : (
          filtered.map((part) => (
            <PartRow
              key={part.id}
              part={part}
              selected={selectedPart}
              onSelect={(p) => onSelect(p)}
            />
          ))
        )}
      </div>
    </div>
  );
}
