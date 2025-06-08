import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const SearchableAssesseeDropdown = ({ onSelect }) => {
  const [assessees, setAssessees] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/assessees`)
      .then(res => {
        setAssessees(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error('Error fetching assessees:', err));
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered(assessees);
    } else {
      const lower = query.toLowerCase();
      setFiltered(
        assessees.filter(a =>
          (a.name?.toLowerCase().includes(lower) ||
           a.pan?.toLowerCase().includes(lower))
        )
      );
    }
  }, [query, assessees]);

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
      setFiltered(updatedAssessees.filter(a =>
        !query || 
        (a.name?.toLowerCase().includes(query.toLowerCase()) ||
         a.pan?.toLowerCase().includes(query.toLowerCase()))
      ));
      
      console.log(`Assessee with PAN ${pan} deleted successfully`);
    } catch (err) {
      console.error('Error deleting assessee:', err);
      // You might want to show a toast notification or alert here
      alert('Failed to delete assessee. Please try again.');
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <input
        type="text"
        placeholder="Search by name or PAN..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full p-2 border rounded"
      />

      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-20 w-full max-h-60 overflow-auto bg-white border rounded mt-1 shadow-lg">
          {filtered.map(a => (
            <li
              key={a._id}
              onClick={() => handleSelect(a)}
              className="cursor-pointer px-3 py-2 hover:bg-blue-600 hover:text-white flex justify-between items-center group"
            >
              <div className="flex-1">
                <div>{a.name} ({a.pan})</div>
                {a.lastSyncedOn && (
                  <div className="text-xs text-gray-500 group-hover:text-blue-200">
                    Last synced: {new Date(a.lastSyncedOn).toLocaleDateString()}
                  </div>
                )}
              </div>
              
              <button
                onClick={(e) => handleDelete(e, a.pan)}
                className="ml-2 p-1 rounded hover:bg-red-500 hover:bg-opacity-20 transition-colors"
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
                  className="text-gray-400 hover:text-red-500"
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
      )}

      {isOpen && filtered.length === 0 && (
        <div className="absolute z-20 w-full bg-white border rounded mt-1 p-2 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchableAssesseeDropdown;