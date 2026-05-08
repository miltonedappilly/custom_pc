import { CheckCircle2, XCircle } from 'lucide-react';

const CURRENCY = '₹';

function fmt(n) {
  return n.toLocaleString('en-IN');
}

export default function PartCard({ part, selected, onSelect }) {
  const outOfStock = part.stock?.toLowerCase().includes('out');

  return (
    <div
      onClick={() => !outOfStock && onSelect(part)}
      className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all select-none ${
        outOfStock
          ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50'
          : selected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
      }`}
    >
      {selected && (
        <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-blue-500" />
      )}
      {outOfStock && (
        <span className="absolute top-3 right-3 text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
          Out of Stock
        </span>
      )}

      <div className="pr-8">
        {part.brand && (
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{part.brand}</p>
        )}
        <p className="font-semibold text-slate-800 leading-snug">{part.model}</p>
        {part.specs && (
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{part.specs}</p>
        )}
        {part.tag && (
          <span className="inline-block mt-2 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            {part.tag}
          </span>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-end justify-between">
        <div>
          <p className="text-lg font-bold text-slate-800">
            {CURRENCY}{fmt(part.sellingPrice)}
          </p>
          {part.costPrice > 0 && (
            <p className="text-xs text-slate-400">
              Cost: {CURRENCY}{fmt(part.costPrice)}
              {part.sellingPrice > part.costPrice && (
                <span className="ml-1 text-green-600 font-medium">
                  (+{CURRENCY}{fmt(part.sellingPrice - part.costPrice)})
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
