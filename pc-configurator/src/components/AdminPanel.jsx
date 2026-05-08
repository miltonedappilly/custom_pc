import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { parseExcel } from '../utils/excelParser';
import { downloadTemplate } from '../utils/templateGenerator';

export default function AdminPanel({ onPartsLoaded, currentParts }) {
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function processFile(file) {
    if (!file) return;
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setStatus({ type: 'error', message: 'Please upload a valid Excel file (.xlsx or .xls).' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parts = parseExcel(e.target.result);
        onPartsLoaded(parts);
        setStatus({
          type: 'success',
          message: `Successfully loaded ${parts.length} products from "${file.name}".`,
        });
      } catch (err) {
        setStatus({ type: 'error', message: err.message });
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function handleFileChange(e) {
    processFile(e.target.files[0]);
    e.target.value = '';
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  }

  function handleClear() {
    onPartsLoaded(null);
    setStatus(null);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileSpreadsheet className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Parts List Management</h2>
            <p className="text-sm text-slate-500">Upload your Excel parts list to populate the configurator</p>
          </div>
        </div>

        {/* Current status */}
        {currentParts && (
          <div className="mb-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span><strong>{currentParts.length}</strong> products loaded and active</span>
            </div>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        )}

        {/* Drop zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-blue-400 bg-blue-50'
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}
        >
          <Upload className="w-10 h-10 mx-auto mb-3 text-slate-400" />
          <p className="font-medium text-slate-700">
            {isDragging ? 'Drop the file here' : 'Click to upload or drag & drop'}
          </p>
          <p className="text-sm text-slate-500 mt-1">Supports .xlsx and .xls files</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Status message */}
        {status && (
          <div className={`mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
            status.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {status.type === 'success'
              ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
              : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            }
            {status.message}
          </div>
        )}

        {/* Download template */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-3">
            Need the template? Download the Excel template with sample data and required column structure.
          </p>
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Excel Template
          </button>
        </div>
      </div>

      {/* Column reference */}
      <div className="mt-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Required Excel Column Structure</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ['Category', 'CPU, Motherboard, RAM, GPU…', true],
            ['Brand', 'Intel, AMD, ASUS…', false],
            ['Model', 'Product name', true],
            ['Specifications', 'Short description', false],
            ['Cost Price', 'Your purchase price (₹)', false],
            ['Selling Price', 'Customer price (₹)', true],
            ['Stock', 'Available / Out of Stock', false],
            ['Tag', 'Socket type for compatibility', false],
          ].map(([col, desc, required]) => (
            <div key={col} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50">
              <div className="mt-0.5">
                <span className={`inline-block w-2 h-2 rounded-full ${required ? 'bg-blue-500' : 'bg-slate-300'}`} />
              </div>
              <div>
                <p className="font-medium text-slate-700">{col} {required && <span className="text-blue-500 text-xs">*</span>}</p>
                <p className="text-slate-400 text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-3">* Required columns</p>
      </div>
    </div>
  );
}
