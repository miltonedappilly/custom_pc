import { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Check, Plus, X, AlertCircle, LayoutGrid, List } from 'lucide-react';

const CURRENCY = 'AED';
function fmt(n) { return n.toLocaleString('en-AE'); }

const BRAND_COLORS = {
  intel:    { bg: 'bg-blue-100',   text: 'text-blue-700'   },
  amd:      { bg: 'bg-red-100',    text: 'text-red-700'    },
  nvidia:   { bg: 'bg-green-100',  text: 'text-green-700'  },
  asus:     { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  msi:      { bg: 'bg-red-100',    text: 'text-red-700'    },
  corsair:  { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  samsung:  { bg: 'bg-blue-100',   text: 'text-blue-700'   },
  lg:       { bg: 'bg-purple-100', text: 'text-purple-700' },
  nzxt:     { bg: 'bg-pink-100',   text: 'text-pink-700'   },
  lian:     { bg: 'bg-sky-100',    text: 'text-sky-700'    },
  keychron: { bg: 'bg-orange-100', text: 'text-orange-700' },
  logitech: { bg: 'bg-teal-100',   text: 'text-teal-700'   },
};

function brandColor(brand) {
  const key = (brand || '').toLowerCase().split(' ')[0];
  return BRAND_COLORS[key] || { bg: 'bg-slate-100', text: 'text-slate-600' };
}

function PartTile({ part, selected, onSelect }) {
  const outOfStock = part.stock?.toLowerCase().includes('out');
  const isSelected = selected?.id === part.id;
  const margin = part.sellingPrice - part.costPrice;
  const colors = brandColor(part.brand);

  return (
    <div
      onClick={() => !outOfStock && onSelect(part)}
      className={`relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-150 select-none group ${
        outOfStock
          ? 'opacity-50 cursor-not-allowed border-slate-200 bg-white'
          : isSelected
          ? 'border-blue-500 shadow-lg shadow-blue-100 cursor-pointer'
          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
      }`}
    >
      <div className={`px-4 pt-4 pb-3 flex items-start justify-between gap-2 ${isSelected ? 'bg-blue-50' : 'bg-white'}`}>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black shrink-0 ${colors.bg} ${colors.text}`}>
          {part.brand ? part.brand[0].toUpperCase() : '#'}
        </div>
        <div className="flex-1 min-w-0 text-right">
          {part.brand && (
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider truncate">{part.brand}</p>
          )}
          {part.tag && (
            <span className="inline-block mt-0.5 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
              {part.tag}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pb-3 flex-1">
        <p className={`font-bold text-sm leading-snug ${isSelected ? 'text-blue-800' : 'text-slate-800'}`}>
          {part.model}
        </p>
        {part.specs && (
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{part.specs}</p>
        )}
        {outOfStock && (
          <span className="inline-flex items-center gap-1 mt-2 text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full border border-red-200">
            <AlertCircle className="w-3 h-3" /> Out of Stock
          </span>
        )}
      </div>

      <div className={`px-4 py-3 border-t ${isSelected ? 'border-blue-200 bg-blue-50' : 'border-slate-100 bg-slate-50'}`}>
        <p className={`text-base font-black ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
          {CURRENCY} {fmt(part.sellingPrice)}
        </p>
        <div className="flex items-center justify-between mt-0.5">
          {part.costPrice > 0
            ? <p className="text-xs text-slate-400">Cost: {CURRENCY} {fmt(part.costPrice)}</p>
            : <span />
          }
          {part.costPrice > 0 && margin > 0 && (
            <p className="text-xs font-semibold text-green-600">+{fmt(margin)}</p>
          )}
        </div>
      </div>

      <button
        disabled={outOfStock}
        onClick={(e) => { e.stopPropagation(); !outOfStock && onSelect(part); }}
        className={`w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
          isSelected
            ? 'bg-blue-600 text-white hover:bg-red-500'
            : outOfStock
            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
            : 'bg-white text-slate-600 hover:bg-blue-600 hover:text-white border-t border-slate-100'
        }`}
      >
        {isSelected ? (
          <>
            <Check className="w-4 h-4 group-hover:hidden" />
            <X className="w-4 h-4 hidden group-hover:block" />
            <span className="group-hover:hidden">Selected</span>
            <span className="hidden group-hover:inline">Remove</span>
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add to Build
          </>
        )}
      </button>
    </div>
  );
}

function PartRow({ part, selected, onSelect }) {
  const outOfStock = part.stock?.toLowerCase().includes('out');
  const isSelected = selected?.id === part.id;
  const margin = part.sellingPrice - part.costPrice;
  const colors = brandColor(part.brand);

  return (
    <div
      onClick={() => !outOfStock && onSelect(part)}
      className={`group flex items-center gap-4 px-5 py-3.5 border-b border-slate-100 transition-colors ${
        isSelected ? 'bg-blue-50 cursor-pointer' : outOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
      }`}
    >
      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-base font-black ${colors.bg} ${colors.text}`}>
        {part.brand ? part.brand[0].toUpperCase() : '#'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {part.brand && <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{part.brand}</span>}
          {part.tag && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">{part.tag}</span>}
          {outOfStock && (
            <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Out of Stock
            </span>
          )}
        </div>
        <p className={`font-semibold text-sm truncate mt-0.5 ${isSelected ? 'text-blue-800' : 'text-slate-800'}`}>{part.model}</p>
        {part.specs && <p className="text-xs text-slate-400 truncate">{part.specs}</p>}
      </div>
      <div className="text-right shrink-0">
        <p className={`font-bold ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>{CURRENCY} {fmt(part.sellingPrice)}</p>
        {part.costPrice > 0 && <p className="text-xs text-slate-400">Cost: {fmt(part.costPrice)}</p>}
        {part.costPrice > 0 && margin > 0 && <p className="text-xs text-green-600 font-medium">+{fmt(margin)}</p>}
      </div>
      <button
        disabled={outOfStock}
        onClick={(e) => { e.stopPropagation(); !outOfStock && onSelect(part); }}
        className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
          isSelected ? 'bg-blue-600 text-white hover:bg-red-500'
          : outOfStock ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
          : 'bg-slate-100 text-slate-500 hover:bg-blue-600 hover:text-white'
        }`}
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
  const [viewMode, setViewMode] = useState('grid');

  const filtered = useMemo(() => {
    let list = parts.filter((p) => {
      const q = search.toLowerCase();
      return !q || p.model.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.specs.toLowerCase().includes(q);
    });
    if (sortBy === 'price_asc')  list = [...list].sort((a, b) => a.sellingPrice - b.sellingPrice);
    if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.sellingPrice - a.sellingPrice);
    if (sortBy === 'name')       list = [...list].sort((a, b) => a.model.localeCompare(b.model));
    return list;
  }, [parts, search, sortBy]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
      <div className="px-5 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{category}</h2>
            <p className="text-sm text-slate-400">{parts.length} option{parts.length !== 1 ? 's' : ''}</p>
          </div>
          {selectedPart && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="text-sm text-blue-700 font-medium truncate max-w-48">{selectedPart.model}</span>
              <button onClick={() => onSelect(selectedPart)} className="text-blue-400 hover:text-blue-700 ml-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${category}...`}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
          <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-600'}`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Search className="w-8 h-8 mb-2" />
            <p className="text-sm">No parts match your search</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="p-5 grid grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((part) => (
              <PartTile key={part.id} part={part} selected={selectedPart} onSelect={onSelect} />
            ))}
          </div>
        ) : (
          <div className="bg-white">
            {filtered.map((part) => (
              <PartRow key={part.id} part={part} selected={selectedPart} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
