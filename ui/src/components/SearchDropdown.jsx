import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom"; // if already imported, skip
import { Users, Trash2 } from "lucide-react";

const SearchableAssesseeDropdown = ({ onSelect   , selectedAssessee }) => {
  const [assessees, setAssessees] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
const location = useLocation();
const showAllOption =
  location?.pathname?.includes("/calendar") ||
  location?.pathname?.includes("/notices");

// control whether fixed dropdown is visible (dismissible)
const [showFixedDropdown, setShowFixedDropdown] = useState(true);

 useEffect(() => {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const token = auth?.accessToken;

  axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/assessees/getAllUserAssessees`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      setAssessees(res.data);
      setFiltered(res.data);
    })
    .catch(err => console.error("Error fetching assessees:", err));
}, []);

  useEffect(() => {
    if (!query) {
      // Sort assessees to show selected one at top
      const sortedAssessees = [...assessees].sort((a, b) => {
        if (selectedAssessee && a.pan === selectedAssessee.pan) return -1;
        if (selectedAssessee && b.pan === selectedAssessee.pan) return 1;
        return 0;
      });
      setFiltered(sortedAssessees);
    } else {
      const lower = query.toLowerCase();
      const matchingAssessees = assessees.filter(a =>
        (a.name?.toLowerCase().includes(lower) ||
         a.pan?.toLowerCase().includes(lower))
      );
      
      // Sort filtered results to show selected one at top
      const sortedFiltered = matchingAssessees.sort((a, b) => {
        if (selectedAssessee && a.pan === selectedAssessee.pan) return -1;
        if (selectedAssessee && b.pan === selectedAssessee.pan) return 1;
        return 0;
      });
      
      setFiltered(sortedFiltered);
    }
  }, [query, assessees, selectedAssessee]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSelect = (assessee) => {
    setQuery('');
    setIsOpen(false);
    onSelect(assessee);
  };

  const handleDelete = async (e, pan) => {
    e.stopPropagation(); // Prevent triggering the select handler
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/delAssessee/${pan}`);
      
      // Update local state to remove the deleted assessee
      const updatedAssessees = assessees.filter(a => a.pan !== pan);
      setAssessees(updatedAssessees);
      
      // Re-filter with updated assessees and maintain selected assessee at top
      const matchingAssessees = updatedAssessees.filter(a =>
        !query || 
        (a.name?.toLowerCase().includes(query.toLowerCase()) ||
         a.pan?.toLowerCase().includes(query.toLowerCase()))
      );
      
      const sortedFiltered = matchingAssessees.sort((a, b) => {
        if (selectedAssessee && a.pan === selectedAssessee.pan) return -1;
        if (selectedAssessee && b.pan === selectedAssessee.pan) return 1;
        return 0;
      });
      
      setFiltered(sortedFiltered);
      
      console.log(`Assessee with PAN ${pan} deleted successfully`);
    } catch (err) {
      console.error('Error deleting assessee:', err);
      // You might want to show a toast notification or alert here
      alert('Failed to delete assessee. Please try again.');
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search by name or PAN..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute z-20 w-full mt-2 shadow-xl">
          {/* Custom scrollbar styles for webkit browsers */}
          <style jsx>{`
            .styled-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .styled-scrollbar::-webkit-scrollbar-track {
              background: #1F2937;
              border-radius: 4px;
            }
            .styled-scrollbar::-webkit-scrollbar-thumb {
              background: #4B5563;
              border-radius: 4px;
            }
            .styled-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #6B7280;
            }
          `}</style>
          

          {/* "All" option only for calendar/notices */}


          <ul 
            className="styled-scrollbar max-h-60 overflow-auto bg-gray-800 border border-gray-600 rounded-lg scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4B5563 #1F2937'
            }}
          >
{showAllOption && (
  <li
    key="all-option"
    onClick={() => handleSelect({ pan: "ALL", name: "All Assessees" })}
    className={`cursor-pointer px-4 py-3 hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 border-b border-gray-700 ${
      selectedAssessee?.pan === "ALL"
        ? "bg-blue-900/30 border-blue-500/50"
        : ""
    }`}
  >
    <Users size={16} className="text-gray-400" />
    <span
      className={
        selectedAssessee?.pan === "ALL"
          ? "text-blue-300 font-medium"
          : "text-white"
      }
    >
      All
    </span>
  </li>
)}
          
            {filtered.map(a => (
              <li
                key={a._id}
                onClick={() => handleSelect(a)}
                className={`cursor-pointer px-4 py-3 hover:bg-gray-700 transition-colors duration-150 flex justify-between items-center group border-b border-gray-700 last:border-b-0 ${
                  selectedAssessee && a.pan === selectedAssessee.pan 
                    ? 'bg-blue-900/30 border-blue-500/50' 
                    : ''
                }`}
              >
                <div className="flex-1">
                  <div className={`font-medium flex items-center gap-2 ${
                    selectedAssessee && a.pan === selectedAssessee.pan 
                      ? 'text-blue-300' 
                      : 'text-white'
                  }`}>
                    
                    {a.name} ({a.pan})
                  </div>
                  {a.lastSyncedOn && (
                    <div className="text-xs text-gray-400 mt-1">
                      Last synced: {new Date(a.lastSyncedOn).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={(e) => handleDelete(e, a.pan)}
                  className="ml-3 p-2 rounded-md hover:bg-red-900/30 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                  title="Delete assessee"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 hover:text-red-400 transition-colors duration-150"
                  >
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && filtered.length === 0 && (
  <li
    key="all-option"
    onClick={() => handleSelect({ pan: "ALL", name: "All Assessees" })}
    className={`cursor-pointer px-4 py-3 hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 border-b border-gray-700 ${
      selectedAssessee?.pan === "ALL"
        ? "bg-blue-900/30 border-blue-500/50"
        : ""
    }`}
  >
    <Users size={16} className="text-gray-400" />
    <span
      className={
        selectedAssessee?.pan === "ALL"
          ? "text-blue-300 font-medium"
          : "text-white"
      }
    >
      All
    </span>
  </li>
) }
    </div>
  );
};

export default SearchableAssesseeDropdown;