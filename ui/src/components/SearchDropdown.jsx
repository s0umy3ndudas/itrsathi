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
    onSelect(assessee); // ✅ Pass full object to include lastSyncedOn
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
              className="cursor-pointer px-3 py-2 hover:bg-blue-600 hover:text-white"
            >
              <div>{a.name} ({a.pan})</div>
              {a.lastSyncedOn && (
                <div className="text-xs text-gray-500">
                  Last synced: {new Date(a.lastSyncedOn).toLocaleDateString()}
                </div>
              )}
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
