'use client';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import SearchableAssesseeDropdown from '../components/SearchDropdown';
import ProceedingsTable from "../components/ProceedingTable"; // Updated to use dark mode version
import DemandsTable from "../components/DemandsTable";
import ITRTable from '../components/ItrTable';
import AuditTable from '../components/AuditTable';
import { Maximize2, Minimize2, LoaderCircle ,RefreshCw} from 'lucide-react';

const AssesseeSelector = () => {
const [assessees, setAssessees] = useState([]);
const [filtered, setFiltered] = useState([]);
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

 
  const [lastSyncedOn, setLastSyncedOn] = useState(
    // mock random last sync date within past 7 days
    new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
  );

  const syncNow = async () => {
    setLoading(true);
    try {
      // fake API delay
      await new Promise((res) => setTimeout(res, 2000));
      setLastSyncedOn(new Date());
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const token = auth?.accessToken;

  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/assessees/getAllUserAssessees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const list = Array.isArray(res.data) ? res.data : [];
      setAssessees(list);
      setFiltered(list);

      // 👇 select the first assessee if exists
      if (list.length > 0) {
        setSelectedAssessee(list[0]);
      }
    })
    .catch((err) => console.error("Error fetching assessees:", err));
}, []); 


  const toggleFullscreen = (key) => {
    setFullscreen(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
 
  const fullscreenStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#111827',
    zIndex: 9999,
    padding: '2rem',
    overflow: 'auto',
  };

  const cardClass = "col-span-1 bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-xl relative max-w-full max-h-[600px] overflow-auto custom-scrollbar";

  return (
 
  <div className="p-6 min-h-screen bg-gray-900">
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
              <h2 className="text-2xl font-bold text-white">{title}</h2>  
              <button
                onClick={() => toggleFullscreen(key)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
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
        <label className="block mb-2 font-semibold text-lg text-white">Select Assessee</label> 

      {/* Last synced info + Sync button aligned right */}
<div className="flex items-center justify-end gap-3 text-sm text-gray-400">
  <span>
    Last synced on:{" "}
    <span className="font-semibold text-gray-200">
      {lastSyncedOn.toLocaleString()}
    </span>
  </span>

  <button
    onClick={syncNow}
    disabled={loading}
    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-50 transition-colors duration-200"
  >
    {loading ? (
      <LoaderCircle className="w-5 h-5 animate-spin" />
    ) : (
      <RefreshCw className="w-5 h-5" />
    )}
  </button>
</div>
 
        <SearchableAssesseeDropdown onSelect={setSelectedAssessee} selectedAssessee={selectedAssessee} />

        {selectedAssessee && (
          <>
            <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-xl space-y-2">
              <div className="text-gray-300"><strong className="text-white">Assessee Name:</strong> {selectedAssessee.name}</div>
              <div className="text-gray-300"><strong className="text-white">PAN:</strong> {selectedAssessee.pan}</div>
        

              {showProgress && (
                <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              {status && <p className="text-sm mt-1 text-gray-300">{status}</p>}
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
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                    <button
                      onClick={() => toggleFullscreen(key)}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
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