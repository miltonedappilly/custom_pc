import { ShoppingCart, TrendingUp, Printer, Trash2, ChevronRight, X } from 'lucide-react';

const CURRENCY = '₹';
function fmt(n) { return n.toLocaleString('en-IN'); }

const CATEGORY_ICONS = {
  CPU: '🖥️', Motherboard: '🔌', RAM: '💾', GPU: '🎮', Storage: '💿',
  PSU: '⚡', Cabinet: '🗃️', Cooling: '❄️', Monitor: '🖥', Keyboard: '⌨️',
  Mouse: '🖱️', Peripherals: '🎧',
};

export default function BuildSummary({ selected, categories, activeCategory, onCategoryClick, onRemove, onClear }) {
  const entries = categories.map((cat) => ({ cat, part: selected[cat] || null }));
  const filled = entries.filter((e) => e.part);

  const totalSelling = filled.reduce((s, { part }) => s + part.sellingPrice, 0);
  const totalCost = filled.reduce((s, { part }) => s + part.costPrice, 0);
  const margin = totalSelling - totalCost;
  const marginPct = totalCost > 0 ? ((margin / totalCost) * 100).toFixed(1) : null;

  return (
    <aside className="w-72 shrink-0 bg-white border-l border-slate-200 flex flex-col">
      <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-slate-600" />
          <p className="text-sm font-semibold text-slate-800">Your Build</p>
          {filled.length > 0 && (
            <span className="text-xs bg-blue-600 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {filled.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => window.print()} title="Print" className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <Printer className="w-4 h-4" />
          </button>
          {filled.length > 0 && (
            <button onClick={onClear} title="Clear all" className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {entries.map(({ cat, part }) => (
          <button
            key={cat}
            onClick={() => onCategoryClick(cat)}
            className={`w-full flex items-center gap-3 px-4 py-3 border-b border-slate-50 text-left transition-colors group ${
              cat === activeCategory ? 'bg-blue-50' : 'hover:bg-slate-50'
            }`}
          >
            <span className="text-base shrink-0">{CATEGORY_ICONS[cat] || '🔧'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-400">{cat}</p>
              {part ? (
                <p className="text-sm font-medium text-slate-700 truncate">{part.brand ? `${part.brand} ` : ''}{part.model}</p>
              ) : (
                <p className="text-sm text-slate-300 italic">Not selected</p>
              )}
            </div>
            <div className="shrink-0 flex items-center gap-1">
              {part ? (
                <>
                  <div className="text-right mr-1">
                    <p className="text-sm font-semibold text-slate-700">{CURRENCY}{fmt(part.sellingPrice)}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemove(cat); }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-2">
        {filled.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-1">Select components to see pricing</p>
        ) : (
          <>
            {totalCost > 0 && (
              <div className="flex justify-between text-sm text-slate-500">
                <span>Total Cost</span>
                <span className="font-medium text-slate-700">{CURRENCY}{fmt(totalCost)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Selling Price</span>
              <span className="font-bold text-blue-600">{CURRENCY}{fmt(totalSelling)}</span>
            </div>
            {totalCost > 0 && margin > 0 && (
              <div className="mt-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-green-700">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">Margin</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-700">{CURRENCY}{fmt(margin)}</p>
                  {marginPct && <p className="text-xs text-green-500">{marginPct}% on cost</p>}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
