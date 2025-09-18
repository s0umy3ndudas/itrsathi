import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ExternalLink, File,Minimize } from "lucide-react";

// SVG Icons Components
const ChevronRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SortAscIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
  </svg>
);

const SortDescIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
  </svg>
);

const ExpandIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

 

const ProceedingsTable = ({ pan }) => {
  const [data, setData] = useState(null);
 
  const [expandedRows, setExpandedRows] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandAll, setExpandAll] = useState(false);
  const [seenDocs, setSeenDocs] = useState({});
  const [aySortOrder, setAySortOrder] = useState(null);
  const [ayYearFilter, setAyYearFilter] = useState('All');
    const [clicked, setClicked] = useState(false);

const totalNotices = data?.proceedings?.reduce(
  (count, p) => count + (p.notices?.length || 0),
  0
) || 0;

  // Column widths state for resizing
  const [columnWidths, setColumnWidths] = useState({
    ay: 80,
    expandedContent: 100 // Width for the expanded content area
  });
  
  const [isResizing, setIsResizing] = useState(null);
  const tableRef = useRef(null);

  // Mouse events for column resizing
  const handleMouseDown = (columnKey, e) => {
    setIsResizing(columnKey);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    
    const rect = tableRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    setColumnWidths(prev => ({
      ...prev,
      [isResizing]: Math.max(60, x) // Minimum width of 60px
    }));
  };

  const handleMouseUp = () => {
    setIsResizing(null);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  useEffect(() => {
    if (!pan) return;
    setData(null);
    setExpandedRows([]);
    setExpandAll(false);
    
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/assessee/${pan}/details`)
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [pan]);
   
  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (!data) return;
    if (expandAll) {
      setExpandedRows([]);
    } else {
      setExpandedRows(data.proceedings.map((p) => p._id));
    }
    setExpandAll(!expandAll);
  };

  const toIndianDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const getAYRange = (ay) => `${ay}-${(ay + 1).toString().slice(-2)}`;
  const getProceedingStatus = (type) => (type === 'C' ? 'Close' : 'Open');
  const getResponseStatusText = (responseStatus, proceedingType) =>
    responseStatus === 'S' ? (proceedingType === 'O' ? 'Partial' : 'Full') : '';

  const handleStatusFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleCheckboxChange = (docId) => {
    setSeenDocs((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const handleAYSort = () => {
    setAySortOrder((prev) =>
      prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
    );
  };

  const handleAYFilterChange = (year) => {
    setAyYearFilter(year);
    setCurrentPage(1);
  };

  let filteredProceedings =
    data?.proceedings.filter((p) =>
      filterStatus === 'All'
        ? true
        : filterStatus === 'Open'
        ? p.type !== 'C'
        : p.type === 'C'
    ) || [];

  if (ayYearFilter !== 'All') {
    filteredProceedings = filteredProceedings.filter((p) => p.ay === parseInt(ayYearFilter));
  }

  if (aySortOrder) {
    filteredProceedings = [...filteredProceedings].sort((a, b) =>
      aySortOrder === 'asc' ? a.ay - b.ay : b.ay - a.ay
    );
  }

  const paginatedProceedings = filteredProceedings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProceedings.length / itemsPerPage);

  if (!data) return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center gap-3">
        <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-300 text-lg">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="p-6 border border-gray-700 bg-gray-800 rounded-lg shadow-xl w-full">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: #374151;
        }
        
        .nested-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .nested-scrollbar::-webkit-scrollbar-track {
          background: #4b5563;
          border-radius: 3px;
        }
        
        .nested-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }
        
        .nested-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        .nested-scrollbar::-webkit-scrollbar-corner {
          background: #4b5563;
        }
      `}</style>
      
      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {['Open', 'Close', 'All'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilterChange(status)}
              className={`px-3 py-2 border rounded-lg transition-colors duration-200 ${
                filterStatus === status
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-gray-300">Show:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-gray-700 border border-gray-600 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-300">A.Y:</label>
            <select
              value={ayYearFilter}
              onChange={(e) => handleAYFilterChange(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              {[...new Set(data.proceedings.map((p) => p.ay))].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAYSort}
            className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors duration-200"
          >
            Sort A.Y
            {aySortOrder === 'asc' && <SortAscIcon className="w-4 h-4" />}
            {aySortOrder === 'desc' && <SortDescIcon className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleAllRows}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-green-600 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
          >
          <button
  onClick={() => setExpandAll(!expandAll)}
  className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
>
  {expandAll ? (
    <>
      <Minimize className="w-4 h-4" />
      <span>Collapse All</span>
    </>
  ) : (
    <>
      <ExpandIcon className="w-4 h-4" />
      <span>Expand All</span>
    </>
  )}
</button>
          </button>


        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto overflow-y-auto max-h-[600px] bg-gray-900 rounded-lg border border-gray-700 custom-scrollbar">
        <table ref={tableRef} className="border-collapse text-xs min-w-full">
          <thead className="bg-gray-700 sticky top-0 z-10">
            <tr>
              <th 
                className="border border-gray-600 px-3 py-3 text-white text-left relative min-w-[100px]" 
                style={{ width: `${columnWidths.ay}px` }}
              >
                Assessment Year
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('ay', e)}
                />
              </th>
              <th className="border border-gray-600 px-3 py-3 text-white text-left">
                Proceedings Details
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedProceedings.map((proceeding) => {
              const isExpanded = expandedRows.includes(proceeding._id);

              return (
                <React.Fragment key={proceeding._id}>
                  <tr
                    onClick={() => toggleRow(proceeding._id)}
                    className="cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-200 border-b border-gray-600"
                  >
                    <td 
                      className="border-r border-gray-600 px-3 py-4 text-white font-semibold" 
                      style={{ width: `${columnWidths.ay}px` }}
                    >
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDownIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="text-sm">{getAYRange(proceeding.ay)}</span>
                      </div>
                    </td>
                    <td className="border-gray-600 px-3 py-4 text-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {proceeding.notices.length} notice{proceeding.notices.length !== 1 ? 's' : ''} 
                          ({getProceedingStatus(proceeding.type)})
                        </span>
                        <span className="text-xs text-gray-400">
                          Click to {isExpanded ? 'collapse' : 'expand'}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan={2} className="p-0 bg-gray-850">
                        <div className="overflow-x-auto nested-scrollbar">
                          <table className="w-full border-collapse text-xs">
                            <thead className="bg-gray-750">
                              <tr>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">U/s</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Proc.</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Notice No</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Notice Date</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Due Date</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Status</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Res. Status</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Res. Date</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Notice PDF</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Response PDF</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Ack.</th>
                                <th className="border border-gray-600 px-2 py-2 text-gray-200 text-left text-xs font-medium">Link</th>
                              </tr>
                            </thead>
                            <tbody>
                              {proceeding.notices.map((notice, index) => {
                                const proceedingStatus = getProceedingStatus(proceeding.type);
                                const proceedingTypeCode = proceeding.type === 'C' ? 'C' : 'O';
                                const responseStatusText = getResponseStatusText(
                                  notice.responseStatus,
                                  proceedingTypeCode
                                );
                                const formattedResponseDate = toIndianDate(notice.responseDate);
                                const rowSeen =
                                  notice.noticeDocs?.some((id) => seenDocs[id]) ||
                                  notice.resDocs?.some((id) => seenDocs[id]);

                                return (
                                  <tr
                                    key={notice._id}
                                    className={`transition-colors duration-200 ${
                                      index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-825'
                                    } ${rowSeen ? 'bg-opacity-60' : 'hover:bg-gray-750'}`}
                                  >
                                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-xs">
                                      {notice.us || '—'}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-xs">
                                      {notice.type}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-xs">
                                      {notice.noticeNumber}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-xs">
                                      {toIndianDate(notice.noticeDate)}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-xs">
                                      { notice.dueDate?  toIndianDate(notice.dueDate) :'—'}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        proceedingStatus === 'Open' 
                                          ? 'bg-green-900 text-green-300 border border-green-700' 
                                          : 'bg-red-900 text-red-300 border border-red-700'
                                      }`}>
                                        {proceedingStatus}
                                      </span>
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-xs">
                                      {responseStatusText || '—'}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2 text-gray-300 text-xs">
                                      {formattedResponseDate || '—'}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2">
                                      {notice.noticeDocs?.length > 0 ? (
                                        <div className="flex flex-col gap-1">
                                          {notice.noticeDocs.map((docId) => (
                                            <div key={docId} className="flex items-center gap-2">
                                          
 {!docId ?
   <span className="text-gray-400">—</span> :
    <button
      onClick={() => {
        setClicked(true);
        window.open(
          `https://playwright-docs.s3.ap-south-1.amazonaws.com/${pan}/${docId}.pdf`,
          "_blank",
          "noopener,noreferrer"
        );
      }}
      className={`flex items-center gap-1 ${
        clicked ? "text-gray-400" : "text-blue-500 hover:text-blue-400"
      }`}
    >
      <File className="w-4 h-4" />
    
    </button>
 
}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-gray-500 text-xs">—</span>
                                      )}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2">
                                      {notice.resDocs?.length > 0 ? (
                                        <div className="flex flex-col gap-1">
                                          {notice.resDocs.map((docId) => (
                                            <div key={docId} className="flex items-center gap-2">
                                              <input
                                                type="checkbox"
                                                checked={!!seenDocs[docId]}
                                                onChange={() => handleCheckboxChange(docId)}
                                                className="accent-blue-500 w-3 h-3"
                                              />
                                              <a
                                                href={`https://playwright-docs.s3.ap-south-1.amazonaws.com/${data.assessee.pan}/${docId}.pdf`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:text-blue-300 underline text-xs"
                                              >
                                            
      <File className="w-4 h-4" />
                                              </a>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (   <File className="w-4 h-4 text-yellow-500 hover:text-yellow-400" /> 
                                        // <span className="text-gray-500 text-xs">—</span>
                                      )}
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2 text-gray-500 text-xs">
                                      {/* — */}
                                        <File className="w-4 h-4 text-green-500 hover:text-green-400" /> 
                                    </td>
                                    <td className="border border-gray-600 px-2 py-2 text-gray-500 text-xs">
                                      {/* — */}
                                    
                                      <ExternalLink className="w-5 h-5" />
                                      
                                      </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
              page === currentPage
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProceedingsTable;