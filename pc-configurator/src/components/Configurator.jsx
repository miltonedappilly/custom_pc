import { useState, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { groupByCategory } from '../utils/excelParser';
import { checkCompatibility } from '../utils/compatibility';
import CategoryNav from './CategoryNav';
import PartsPanel from './PartsPanel';
import BuildSummary from './BuildSummary';

export default function Configurator({ parts }) {
  const grouped = useMemo(() => groupByCategory(parts), [parts]);
  const categories = useMemo(() => Object.keys(grouped), [grouped]);

  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [selected, setSelected] = useState({});

  const warnings = useMemo(() => checkCompatibility(selected), [selected]);
  const partCounts = useMemo(() => {
    const counts = {};
    for (const cat of categories) counts[cat] = grouped[cat]?.length || 0;
    return counts;
  }, [grouped, categories]);

  function handleSelect(part) {
    setSelected((prev) => {
      if (prev[activeCategory]?.id === part.id) {
        const next = { ...prev };
        delete next[activeCategory];
        return next;
      }
      return { ...prev, [activeCategory]: part };
    });
  }

  function handleRemove(cat) {
    setSelected((prev) => {
      const next = { ...prev };
      delete next[cat];
      return next;
    });
  }

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden">
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        selected={selected}
        onSelect={setActiveCategory}
        partCounts={partCounts}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {warnings.length > 0 && (
          <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              {warnings.map((w, i) => (
                <p key={i} className="text-xs text-amber-700">{w}</p>
              ))}
            </div>
          </div>
        )}
        {activeCategory && grouped[activeCategory] ? (
          <PartsPanel
            category={activeCategory}
            parts={grouped[activeCategory]}
            selectedPart={selected[activeCategory] || null}
            onSelect={handleSelect}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Select a category from the left
          </div>
        )}
      </div>

      <BuildSummary
        selected={selected}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={setActiveCategory}
        onRemove={handleRemove}
        onClear={() => setSelected({})}
      />
    </div>
  );
}
