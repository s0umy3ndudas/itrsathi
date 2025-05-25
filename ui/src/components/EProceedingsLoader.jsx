import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 border rounded-lg shadow max-w-full">
      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          {['Open', 'Close', 'All'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusFilterChange(status)}
              className={`px-3 py-1 border rounded ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border-gray-400'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage">Show:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border px-2 py-1 rounded"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <label>A.Y:</label>
          <select
            value={ayYearFilter}
            onChange={(e) => handleAYFilterChange(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option>All</option>
            {[...new Set(data.proceedings.map((p) => p.ay))].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            onClick={handleAYSort}
            className="px-2 py-1 border rounded bg-gray-200"
          >
            Sort A.Y
          </button>

          <button
            onClick={toggleAllRows}
            className="ml-4 px-3 py-1 rounded border bg-green-500 text-white hover:bg-green-600"
          >
            {expandAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-[500px] scrollbar-none">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="border px-2 py-1">A.Y.</th>
              {[
                'U/s',
                'Proceedings (Open)',
                'Notice No',
                'Notice Date',
                'Due Date',
                'Status',
                'Response Status',
                'Response Date',
                'Notice PDF',
                'Response PDF',
                'Acknowledgment',
                'Link',
              ].map((header) => (
                <th key={header} className="border px-2 py-1">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedProceedings.map((proceeding) => {
              const proceedingStatus = getProceedingStatus(proceeding.type);
              const proceedingTypeCode = proceeding.type === 'C' ? 'C' : 'O';

              return (
                <React.Fragment key={proceeding._id}>
                  <tr
                    onClick={() => toggleRow(proceeding._id)}
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 font-semibold"
                  >
                    <td className="border px-2 py-1">
                      {getAYRange(proceeding.ay)}
                    </td>
                    <td className="border px-2 py-1" colSpan={12}></td>
                  </tr>

                  {expandedRows.includes(proceeding._id) &&
                    proceeding.notices.map((notice) => {
                      const responseStatusText = getResponseStatusText(
                        notice.responseStatus,
                        proceedingTypeCode
                      );
                      const formattedResponseDate = toIndianDate(
                        notice.responseDate
                      );
                      const rowSeen =
                        notice.noticeDocs?.some((id) => seenDocs[id]) ||
                        notice.resDocs?.some((id) => seenDocs[id]);

                      return (
                        <tr
                          key={notice._id}
                          className={`bg-white ${rowSeen ? 'bg-gray-200' : ''}`}
                        >
                          <td className="border px-2 py-1"></td>
                          <td className="border px-2 py-1">{notice.us || ''}</td>
                          <td className="border px-2 py-1">{notice.type}</td>
                          <td className="border px-2 py-1">{notice.noticeNumber}</td>
                          <td className="border px-2 py-1">
                            {toIndianDate(notice.noticeDate)}
                          </td>
                          <td className="border px-2 py-1">
                            {toIndianDate(notice.dueDate)}
                          </td>
                          <td className="border px-2 py-1">{proceedingStatus}</td>
                          <td className="border px-2 py-1">{responseStatusText}</td>
                          <td className="border px-2 py-1">{formattedResponseDate}</td>

                          <td className="border px-2 py-1">
                            {notice.noticeDocs?.length > 0
                              ? notice.noticeDocs.map((docId) => (
                                  <div key={docId} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={!!seenDocs[docId]}
                                      onChange={() => handleCheckboxChange(docId)}
                                    />
                                    <a
                                      href={`${import.meta.env.VITE_API_BASE_URL}/naman/eproceedings/${data.assessee.pan}/${docId}.pdf`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      Open
                                    </a>
                                  </div>
                                ))
                              : '—'}
                          </td>
                          <td className="border px-2 py-1">
                            {notice.resDocs?.length > 0
                              ? notice.resDocs.map((docId) => (
                                  <div key={docId} className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={!!seenDocs[docId]}
                                      onChange={() => handleCheckboxChange(docId)}
                                    />
                                    <a
                                      href={`${import.meta.env.VITE_API_BASE_URL}/naman/eproceedings/${data.assessee.pan}/${docId}.pdf`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      Open
                                    </a>
                                  </div>
                                ))
                              : '—'}
                          </td>
                          <td className="border px-2 py-1">—</td>
                          <td className="border px-2 py-1">—</td>
                        </tr>
                      );
                    })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white border-gray-400'
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
