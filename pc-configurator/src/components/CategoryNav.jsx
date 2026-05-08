const CATEGORY_ICONS = {
  CPU: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>
    </svg>
  ),
  Motherboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <rect x="6" y="6" width="5" height="5" rx="1"/>
      <rect x="13" y="6" width="5" height="5" rx="1"/>
      <rect x="6" y="13" width="5" height="5" rx="1"/>
      <path d="M13 15.5h5M15.5 13v5"/>
    </svg>
  ),
  RAM: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="10" rx="1"/>
      <path d="M6 7V5M9 7V5M12 7V5M15 7V5M18 7V5M6 17v2M9 17v2M12 17v2M15 17v2M18 17v2"/>
    </svg>
  ),
  GPU: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="8" cy="12" r="2"/>
      <circle cx="14" cy="12" r="2"/>
      <path d="M18 9v6"/>
    </svg>
  ),
  Storage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 10h20"/>
      <circle cx="17" cy="7" r="1"/>
      <circle cx="17" cy="14" r="1"/>
    </svg>
  ),
  PSU: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  Cabinet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <path d="M9 6h6M9 10h6M9 14h2"/>
      <circle cx="12" cy="18" r="1"/>
    </svg>
  ),
  Cooling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  ),
  Monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  Keyboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/>
    </svg>
  ),
  Mouse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 017 7v6a7 7 0 01-14 0V9a7 7 0 017-7z"/>
      <path d="M12 2v7M5 9h14"/>
    </svg>
  ),
  Peripherals: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  ),
};

export default function CategoryNav({ categories, activeCategory, selected, onSelect, partCounts }) {
  return (
    <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="px-4 py-4 border-b border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Components</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          const isDone = !!selected[cat];
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all group ${
                isActive
                  ? 'bg-blue-50 border-r-2 border-blue-600'
                  : 'hover:bg-slate-50 border-r-2 border-transparent'
              }`}
            >
              <span className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : isDone ? 'text-slate-500' : 'text-slate-300'}`}>
                {CATEGORY_ICONS[cat] || (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                  </svg>
                )}
              </span>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isActive ? 'text-blue-700' : isDone ? 'text-slate-700' : 'text-slate-500'}`}>
                  {cat}
                </p>
                {isDone && (
                  <p className="text-xs text-slate-400 truncate leading-tight">{selected[cat].model}</p>
                )}
              </div>

              {isDone ? (
                <span className="w-4 h-4 shrink-0 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6l3 3 5-5"/>
                  </svg>
                </span>
              ) : (
                <span className={`text-xs tabular-nums ${isActive ? 'text-blue-400' : 'text-slate-300'}`}>
                  {partCounts[cat] || 0}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t border-slate-100">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Build progress</span>
          <span>{Object.values(selected).filter(Boolean).length} / {categories.length}</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(Object.values(selected).filter(Boolean).length / categories.length) * 100}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
