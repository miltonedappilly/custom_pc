import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PartCard from './PartCard';

const CATEGORY_ICONS = {
  CPU: '🖥️',
  Motherboard: '🔌',
  RAM: '💾',
  GPU: '🎮',
  Storage: '💿',
  PSU: '⚡',
  Cabinet: '🗃️',
  Cooling: '❄️',
  Monitor: '🖥',
  Keyboard: '⌨️',
  Mouse: '🖱️',
  Peripherals: '🎧',
};

export default function CategorySection({ category, parts, selectedPart, onSelect }) {
  const [expanded, setExpanded] = useState(true);
  const icon = CATEGORY_ICONS[category] || '🔧';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <div className="text-left">
            <h3 className="font-semibold text-slate-800">{category}</h3>
            <p className="text-xs text-slate-500">{parts.length} option{parts.length !== 1 ? 's' : ''}{selectedPart ? ` · 1 selected` : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedPart && (
            <span className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full max-w-32 truncate">
              {selectedPart.model}
            </span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {parts.map((part) => (
            <PartCard
              key={part.id}
              part={part}
              selected={selectedPart?.id === part.id}
              onSelect={(p) => onSelect(category, p)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
