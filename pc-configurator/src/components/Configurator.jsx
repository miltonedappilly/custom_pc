import { useState, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { groupByCategory } from '../utils/excelParser';
import { checkCompatibility } from '../utils/compatibility';
import CategorySection from './CategorySection';
import SummaryPanel from './SummaryPanel';

export default function Configurator({ parts }) {
  const [selected, setSelected] = useState({});

  const grouped = useMemo(() => groupByCategory(parts), [parts]);
  const categories = Object.keys(grouped);
  const warnings = useMemo(() => checkCompatibility(selected), [selected]);

  function handleSelect(category, part) {
    setSelected((prev) => {
      if (prev[category]?.id === part.id) {
        const next = { ...prev };
        delete next[category];
        return next;
      }
      return { ...prev, [category]: part };
    });
  }

  function handleClear() {
    setSelected({});
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Left: category sections */}
      <div className="flex-1 min-w-0 space-y-4">
        {categories.map((cat) => (
          <CategorySection
            key={cat}
            category={cat}
            parts={grouped[cat]}
            selectedPart={selected[cat] || null}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Right: sticky summary */}
      <div className="xl:w-80 shrink-0 space-y-4">
        <div className="xl:sticky xl:top-6">
          {warnings.length > 0 && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4" />
                Compatibility Warnings
              </div>
              {warnings.map((w, i) => (
                <p key={i} className="text-xs text-amber-700 leading-relaxed">{w}</p>
              ))}
            </div>
          )}
          <SummaryPanel
            selected={selected}
            onClear={handleClear}
            onPrint={handlePrint}
          />
        </div>
      </div>
    </div>
  );
}
