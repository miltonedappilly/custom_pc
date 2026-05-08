import { ShoppingCart, TrendingUp, IndianRupee, Printer, Trash2 } from 'lucide-react';

const CURRENCY = '₹';

function fmt(n) {
  return n.toLocaleString('en-IN');
}

export default function SummaryPanel({ selected, onClear, onPrint }) {
  const entries = Object.entries(selected).filter(([, part]) => part);

  const totalSelling = entries.reduce((sum, [, p]) => sum + p.sellingPrice, 0);
  const totalCost = entries.reduce((sum, [, p]) => sum + p.costPrice, 0);
  const margin = totalSelling - totalCost;
  const marginPct = totalCost > 0 ? ((margin / totalCost) * 100).toFixed(1) : null;

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
        <ShoppingCart className="w-10 h-10 mx-auto text-slate-300 mb-2" />
        <p className="text-slate-500 text-sm">No parts selected yet</p>
        <p className="text-slate-400 text-xs mt-1">Select parts from each category to build your PC</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-800">Configuration Summary</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>
      </div>

      {/* Parts list */}
      <div className="divide-y divide-slate-50">
        {entries.map(([category, part]) => (
          <div key={category} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-xs text-slate-400 font-medium">{category}</p>
              <p className="text-sm font-medium text-slate-700 truncate">{part.brand ? `${part.brand} ` : ''}{part.model}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-slate-800">{CURRENCY}{fmt(part.sellingPrice)}</p>
              {part.costPrice > 0 && (
                <p className="text-xs text-slate-400">{CURRENCY}{fmt(part.costPrice)} cost</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 space-y-2">
        {totalCost > 0 && (
          <div className="flex justify-between text-sm text-slate-600">
            <span>Total Cost</span>
            <span className="font-medium">{CURRENCY}{fmt(totalCost)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-bold text-slate-800">
          <span>Total Selling Price</span>
          <span className="text-blue-600">{CURRENCY}{fmt(totalSelling)}</span>
        </div>
        {totalCost > 0 && margin > 0 && (
          <div className="mt-2 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-green-700">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Margin</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-700">{CURRENCY}{fmt(margin)}</p>
              {marginPct && <p className="text-xs text-green-600">{marginPct}% on cost</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
