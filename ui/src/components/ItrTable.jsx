'use client';
import React, { useEffect, useState, useRef } from 'react';
import { File, ExternalLink } from "lucide-react";

export default function ITRTable({ pan }) {
  const [itrs, setItrs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Column widths state for resizing - optimized for mobile
  const [columnWidths, setColumnWidths] = useState({
    ay: 35,
    itrForm: 35,
    filingDate: 45,
    currentStatus: 45,
    returnStatus: 50,
    itrAck: 40,
    itrFormPdf: 35,
    intimation: 40,
    ais: 30,
    form26as: 30,
    link: 30,
    ackNo: 60,
    filingSection: 50
  });
  
  const [isResizing, setIsResizing] = useState(null);
  const tableRef = useRef(null);
const s3ToHttp = (s3Url) => {
  if (!s3Url) return "";
  return s3Url.replace(
    /^s3:\/\/playwright-docs/,
    "https://playwright-docs.s3.amazonaws.com"
  );
};

function mergeItrs(itrs) {
  const byYear = {};

  for (const itr of itrs) {
    const year = itr.assessmentYear;
    if (year == null) continue;

    if (!byYear[year]) byYear[year] = { full: [], partial: [] };

    const isFull =
      itr.filingDate || itr.ackNumber || itr.itrForm || itr.itrAckPdfUrl;

    // store clones so we don't mutate the originals
    const clone = { ...itr };
    if (isFull) byYear[year].full.push(clone);
    else byYear[year].partial.push(clone);
  }

  const merged = [];

  for (const [year, { full, partial }] of Object.entries(byYear)) {
    // Collect any URLs found in partials (could be many)
    const url26as = partial.map(p => p.form26asPdfUrl).filter(Boolean);
    const urlais  = partial.map(p => p.aisPdfUrl).filter(Boolean);

    if (full.length > 0) {
      // Attach from partial(s) to every full ITR (only if missing)
      for (const itr of full) {
        if (!itr.form26asPdfUrl && url26as.length) itr.form26asPdfUrl = url26as[0];
        if (!itr.aisPdfUrl && urlais.length) itr.aisPdfUrl = urlais[0];
        merged.push(itr);
      }
    } else {
      // Only partials exist -> merge all partials into ONE consolidated entry
      // Pick a base partial: latest by createdAt; fallback to the first
      const pickTime = p => Date.parse(p.createdAt || "") || 0;
      const base = partial.slice().sort((a, b) => pickTime(b) - pickTime(a))[0] || { assessmentYear: year };

      const consolidated = { ...base };

      // Ensure both URLs are present if available in any partial
      if (!consolidated.form26asPdfUrl && url26as.length) consolidated.form26asPdfUrl = url26as[0];
      if (!consolidated.aisPdfUrl && urlais.length) consolidated.aisPdfUrl = urlais[0];

      // Optionally, fill any other missing simple fields from other partials
      for (const p of partial) {
        for (const k of Object.keys(p)) {
          if ((consolidated[k] == null || consolidated[k] === "") && p[k] != null && p[k] !== "") {
            consolidated[k] = p[k];
          }
        }
      }

      merged.push(consolidated);
    }
  }

  return merged;
}
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
      [isResizing]: Math.max(30, x) // Minimum width of 30px
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

    const fetchData = async () => {
      console.log('🔍 Fetching ITRs for PAN:', pan);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/itr/${pan}`);
        const data = await res.json();
        console.log('✅ ITRs fetched successfully:', data);
        

        const mergedItrs = mergeItrs(data.itrs);
 

        setItrs(mergedItrs|| []);
      } catch (error) {
        console.error('❌ Error fetching ITRs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pan]);

  if (!pan) return <p className="text-red-400 text-sm">❗No PAN selected.</p>;
  if (loading) return <p className="text-gray-300 text-sm">⏳ Loading ITRs...</p>;

  return (
    <div className="p-2 sm:p-4 lg:p-6 border border-gray-700 bg-gray-800 rounded-lg shadow-xl w-full">
      {/* Outer styled scrollable container */}
      <div className="relative">
        <div 
          className="overflow-auto max-h-[400px] sm:max-h-[500px] bg-gray-900 rounded-lg border border-gray-700 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#4B5563 #1F2937'
          }}
        >
          {/* Custom scrollbar styles for webkit browsers */}
          <style jsx>{`
            div::-webkit-scrollbar {
              width: 8px;
              height: 8px;
            }
            div::-webkit-scrollbar-track {
              background: #1F2937;
              border-radius: 4px;
            }
            div::-webkit-scrollbar-thumb {
              background: #4B5563;
              border-radius: 4px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #6B7280;
            }
            div::-webkit-scrollbar-corner {
              background: #1F2937;
            }
          `}</style>
          
          <table 
            ref={tableRef} 
            className="w-full border-collapse" 
            style={{ 
              tableLayout: 'fixed',
              minWidth: '100%' // Fit to container width
            }}
          >
            <thead className="bg-gray-700 sticky top-0 z-10">
              <tr>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.ay}px` }}
                >
                  <div className="leading-tight">A.Y</div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('ay', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.itrForm}px` }}
                >
                  <div className="leading-tight">
                    ITR<br/>Form
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('itrForm', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.filingDate}px` }}
                >
                  <div className="leading-tight">
                    Filing<br/>Date
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('filingDate', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.currentStatus}px` }}
                >
                  <div className="leading-tight">
                    Current<br/>Status
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('currentStatus', e)}
                  />
                </th>
                {/* <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.returnStatus}px` }}
                > */}
                  {/* <div className="leading-tight">
                    Return<br/>Process<br/>Status
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('returnStatus', e)}
                  /> */}
                {/* </th> */}
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.itrAck}px` }}
                >
                  <div className="leading-tight">
                    ITR<br/>Ack<br/>PDF
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('itrAck', e)}
                  />
                </th>
                {/* <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.itrFormPdf}px` }}
                >
                  <div className="leading-tight">
                    ITR<br/>PDF
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('itrFormPdf', e)}
                  />
                </th> */}
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.intimation}px` }}
                >
                  <div className="leading-tight">
                    Intim<br/>PDF
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('intimation', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.ais}px` }}
                >
                  <div className="leading-tight">AIS</div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('ais', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.form26as}px` }}
                >
                  <div className="leading-tight">26AS</div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('form26as', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.link}px` }}
                >
                  <div className="leading-tight">Link</div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('link', e)}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {itrs.map((itr) => (
                <tr key={itr._id} className="bg-gray-900 hover:bg-gray-800 transition-colors duration-200">
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.ay}px` }}>
                    <div 
                      className="truncate leading-tight" 
                      title={`${itr.assessmentYear}-${(parseInt(itr.assessmentYear) + 1).toString().slice(-2)}`}
                    >
                      {`${itr.assessmentYear}-${(parseInt(itr.assessmentYear) + 1).toString().slice(-2)}`}
                    </div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.itrForm}px` }}>
            
<div className="flex items-center gap-2 leading-tight">
  {/* Show text if needed */}
 
  {/* PDF icon that opens in a new tab */}
 {itr.itrForm ? (
                       <a
    href={s3ToHttp(itr.itrForm)}
    target="_blank"
    rel="noopener noreferrer"
    title="Open ITR Form PDF"
    className="text-red-500 hover:text-red-600"
  >
    <File size={18} />
  </a>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
</div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.filingDate}px` }}>
                    <div className="truncate leading-tight">
              {itr.filingDate
  ? new Date(itr.filingDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  : '—'}
                    </div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-xs overflow-hidden" style={{ width: `${columnWidths.currentStatus}px` }}>
                    <span className={`px-1 py-0.5 rounded text-xs font-medium leading-tight ${
                      itr.currentStatus === 'Filed' 
                        ? 'bg-green-900 text-green-300' 
                        : itr.currentStatus === 'Pending'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {itr.currentStatus}
                    </span>
                  </td>
                  {/* <td className="border border-gray-600 px-0.5 py-1 text-xs overflow-hidden" style={{ width: `${columnWidths.returnStatus}px` }}>
                    <span className={`px-1 py-0.5 rounded text-xs font-medium leading-tight ${
                      itr.returnProcessingStatus === 'Processed' 
                        ? 'bg-blue-900 text-blue-300' 
                        : itr.returnProcessingStatus === 'Under Processing'
                        ? 'bg-orange-900 text-orange-300'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {itr.returnProcessingStatus === 'Processed' ? 'Done' : 
                       itr.returnProcessingStatus === 'Under Processing' ? 'Proc' : 
                       itr.returnProcessingStatus}
                    </span>
                  </td> */}

                  <td className="border border-gray-600 px-0.5 py-1 overflow-hidden text-center" style={{ width: `${columnWidths.itrAck}px` }}>
                    {itr.itrAckPdfUrl ? (
                       <a
    href={s3ToHttp(itr.itrAckPdfUrl)}
    target="_blank"
    rel="noopener noreferrer"
    title="Open ITR Form PDF"
    className="text-green-500 hover:text-red-600"
  >
    <File size={18} />
  </a>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>
                  {/* <td className="border border-gray-600 px-0.5 py-1 overflow-hidden text-center" style={{ width: `${columnWidths.itrFormPdf}px` }}>
                    {itr.itrFormPdfUrl ? (
                      <a
                        href={itr.itrFormPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline text-xs inline-block leading-tight"
                      >
                        PDF
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td> */}
                  <td className="border border-gray-600 px-0.5 py-1 overflow-hidden text-center" style={{ width: `${columnWidths.intimation}px` }}>
                    {itr.intimationPdfUrl ? (
                      <a
                        href={s3ToHttp(itr.intimationPdfUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-blue-300 underline text-xs inline-block leading-tight"
                      >
                         <File size={18} />
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 overflow-hidden text-center" style={{ width: `${columnWidths.ais}px` }}>
                    {itr.aisPdfUrl ? (
                      <a
                        href={s3ToHttp(itr.aisPdfUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-300 underline text-xs inline-block leading-tight"
                      >
                                    <File size={18} />
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 overflow-hidden text-center" style={{ width: `${columnWidths.form26as}px` }}>
                    {itr.form26asPdfUrl ? (
                      <a
                        href={s3ToHttp(itr.form26asPdfUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline text-xs inline-block leading-tight"
                      >
                           <File size={18} />
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>

                  <td className="border border-gray-600 px-0.5 py-1 overflow-hidden text-center" style={{ width: `${columnWidths.link}px` }}>
              
{itr.link ? (
  <a
    href={itr.link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
  >
    <ExternalLink className="w-5 h-5" />
  </a>
) : (
  <span className="flex items-center justify-center text-gray-400">
    <ExternalLink className="w-5 h-5" />
  </span>
)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile optimization note */}
        <div className="absolute top-0 right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-bl opacity-75 pointer-events-none sm:hidden">
          No Scroll
        </div>
      </div>
      
      {itrs.length === 0 && !loading && (
        <div className="text-center py-4 sm:py-8">
          <div className="text-gray-400 text-base sm:text-lg mb-2">No ITR records found</div>
          <div className="text-gray-500 text-xs sm:text-sm">No ITR records available for this PAN</div>
        </div>
      )}
    </div>
  );
}