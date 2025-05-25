'use client';
import React, { useState } from 'react';
import axios from 'axios';
import SearchableAssesseeDropdown from '../components/SearchDropdown';
import ProceedingsTable from "../components/EProceedingsLoader";
import DemandsTable from "../components/DemandsTable";
import ITRTable from '../components/ItrTable';
import AuditTable from '../components/AuditTable';
import { Maximize2, Minimize2, LoaderCircle } from 'lucide-react';

const AssesseeSelector = () => {
  const [selectedAssessee, setSelectedAssessee] = useState(null);
  const [fullscreen, setFullscreen] = useState({
    proceedings: false,
    demands: false,
    itr: false,
    audit: false,
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [showProgress, setShowProgress] = useState(false);

  const toggleFullscreen = (key) => {
    setFullscreen(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const syncNow = async () => {
    if (!selectedAssessee?.pan || !selectedAssessee.password) return;
    setLoading(true);
    setProgress(0);
    setStatus('⏳ Syncing...');
    setShowProgress(true);

    const { pan, password } = selectedAssessee;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/automation/run`, { pan, password });
      const message = res.data.message || '';

      if (message === 'FINALLY GOT THE COOKIE') {
        let percent = 0;
        const interval = setInterval(() => {
          percent += 10;
          setProgress(percent);
          if (percent >= 100) {
            clearInterval(interval);
            setLoading(false);
            setStatus('✅ Done');
            setShowProgress(false);
          }
        }, 200);
      } else {
        setLoading(false);
        setShowProgress(false);
        setStatus('❌ Try again');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setShowProgress(false);
      setStatus('❌ Failed: ' + err.message);
    }
  };

  const fullscreenStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    zIndex: 9999,
    padding: '2rem',
    overflow: 'auto',
  };

  const cardClass = "col-span-1 bg-white p-4 rounded shadow relative max-w-full max-h-[600px] overflow-auto custom-scrollbar border border-gray-300";

  return (
 
  <div className="p-6">
    {/* Fullscreen mode: render only the active card */}
    {Object.values(fullscreen).some(val => val) ? (
      Object.entries(fullscreen).map(([key, isFullscreen]) => {
        if (!isFullscreen) return null;

        const ComponentInfo = {
          proceedings: { title: 'Proceedings', Component: ProceedingsTable },
          demands: { title: 'Demands', Component: DemandsTable },
          itr: { title: 'ITR', Component: ITRTable },
          audit: { title: 'Audits', Component: AuditTable },
        }[key];

        const { title, Component } = ComponentInfo;

        return (
          <div key={key} style={fullscreenStyle} className="custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{title}</h2>
              <button
                onClick={() => toggleFullscreen(key)}
                className="text-gray-600 hover:text-gray-800"
              >
                <Minimize2 size={24} />
              </button>
            </div>
            <Component pan={selectedAssessee?.pan} />
          </div>
        );
      })
    ) : (
      // Normal mode layout
      <>
        <label className="block mb-2 font-semibold text-lg">Select Assessee</label>
        <SearchableAssesseeDropdown onSelect={setSelectedAssessee} />

        {selectedAssessee && (
          <>
            <div className="mt-4 p-4 bg-gray-100 rounded shadow space-y-2">
              <div><strong>Assessee Name:</strong> {selectedAssessee.name}</div>
              <div><strong>PAN:</strong> {selectedAssessee.pan}</div>
              {selectedAssessee.lastSyncedOn && (
                <div className="text-sm text-red-500">
                  Last synced on:{' '}
                  <span className="font-semibold">
                    {new Date(selectedAssessee.lastSyncedOn).toLocaleString()}
                  </span>
                </div>
              )}
              <button
                onClick={syncNow}
                disabled={loading}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" size={18} />
                    Syncing...
                  </>
                ) : (
                  'Sync Now'
                )}
              </button>

              {showProgress && (
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              {status && <p className="text-sm mt-1">{status}</p>}
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2 mt-6">
              {[
                { key: 'proceedings', title: 'Proceedings', Component: ProceedingsTable },
                { key: 'demands', title: 'Demands', Component: DemandsTable },
                { key: 'itr', title: 'ITR', Component: ITRTable },
                { key: 'audit', title: 'Audits', Component: AuditTable },
              ].map(({ key, title, Component }) => (
                <div
                  key={key}
                  className={cardClass}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                      onClick={() => toggleFullscreen(key)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Maximize2 size={20} />
                    </button>
                  </div>
                  <Component pan={selectedAssessee.pan} />
                </div>
              ))}
            </div>
          </>
        )}
      </>
    )}
  </div>
);

   
};

export default AssesseeSelector;
