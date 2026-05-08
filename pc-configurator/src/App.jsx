import { useState, useEffect } from 'react';
import { Settings, Cpu, Monitor } from 'lucide-react';
import AdminPanel from './components/AdminPanel';
import Configurator from './components/Configurator';

const STORAGE_KEY = 'pc_parts_list';

export default function App() {
  const [parts, setParts] = useState(null);
  const [view, setView] = useState('configurator');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setParts(JSON.parse(saved));
    } catch {
      // ignore corrupt data
    }
  }, []);

  function handlePartsLoaded(newParts) {
    setParts(newParts);
    if (newParts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newParts));
      setView('configurator');
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      <header className="bg-white border-b border-slate-200 shadow-sm print:hidden shrink-0">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-none">PC Configurator</h1>
              <p className="text-xs text-slate-500">Internal pricing tool</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            <button
              onClick={() => setView('configurator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'configurator'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Monitor className="w-4 h-4" />
              Configure
            </button>
            <button
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              Admin
              {parts && (
                <span className="w-2 h-2 rounded-full bg-green-400" title="Parts list loaded" />
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {view === 'admin' ? (
          <div className="h-full overflow-y-auto">
            <AdminPanel onPartsLoaded={handlePartsLoaded} currentParts={parts} />
          </div>
        ) : parts ? (
          <Configurator parts={parts} />
        ) : (
          <EmptyState onGoAdmin={() => setView('admin')} />
        )}
      </main>

      <style>{`
        @media print {
          body { background: white; }
          header { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function EmptyState({ onGoAdmin }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
        <Cpu className="w-12 h-12 text-slate-300 mx-auto" />
      </div>
      <h2 className="text-2xl font-bold text-slate-700 mb-2">No Parts List Loaded</h2>
      <p className="text-slate-500 mb-6 max-w-sm">
        Upload your Excel parts list from the Admin panel to start building PC configurations.
      </p>
      <button
        onClick={onGoAdmin}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
      >
        <Settings className="w-4 h-4" />
        Go to Admin Panel
      </button>
    </div>
  );
}
