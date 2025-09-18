'use client';
import {ExternalLink, File } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

export default function AuditTable({ pan }) {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  


  const s3ToHttp = (s3Url) => {
  if (!s3Url) return "";
  return s3Url.replace(
    /^s3:\/\/playwright-docs/,
    "https://playwright-docs.s3.amazonaws.com"
  );
};

  // Column widths state for resizing - optimized for mobile
  const [columnWidths, setColumnWidths] = useState({
    ay: 35,
    returnForm: 40,
    auditSection: 45,
    auditStatus: 45,
    filingDate: 45,
    auditForm: 40,
    acknowledgment: 50,
    link: 30
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

    const fetchAudits = async () => {
      console.log('🔍 Fetching audits for PAN:', pan);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/audit/${pan}`);
        const data = await res.json();
        console.log('✅ Audits fetched:', data);
        setAudits(data || []);
      } catch (error) {
        console.error('❌ Error fetching audits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudits();
  }, [pan]);

  if (!pan) return <p className="text-red-400 text-sm">❗No PAN selected.</p>;
  if (loading) return <p className="text-gray-300 text-sm">⏳ Loading audits...</p>;

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
                  style={{ width: `${columnWidths.returnForm}px` }}
                >
                  <div className="leading-tight">
                    Return<br/>Form
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('returnForm', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.auditSection}px` }}
                >
                  <div className="leading-tight">
                    Audit<br/>Section
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('auditSection', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.auditStatus}px` }}
                >
                  <div className="leading-tight">
                    Audit<br/>Status
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('auditStatus', e)}
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
                  style={{ width: `${columnWidths.auditForm}px` }}
                >
                  <div className="leading-tight">
                    Audit<br/>Form
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('auditForm', e)}
                  />
                </th>
                <th 
                  className="border border-gray-600 px-0.5 py-1 text-white text-left relative text-xs font-medium" 
                  style={{ width: `${columnWidths.acknowledgment}px` }}
                >
                  <div className="leading-tight">
                    Acknowledgement <br/>Form
                  </div>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500 opacity-70 hover:opacity-100"
                    onMouseDown={(e) => handleMouseDown('acknowledgment', e)}
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
              {audits.map((audit) => (
                <tr key={audit._id} className="bg-gray-900 hover:bg-gray-800 transition-colors duration-200">
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.ay}px` }}>
                    <div 
                      className="truncate leading-tight" 
                      title={`${audit.assessmentYear}-${(parseInt(audit.assessmentYear) + 1).toString().slice(-2)}`}
                    >
                      {`${audit.assessmentYear}-${(parseInt(audit.assessmentYear) + 1).toString().slice(-2)}`}
                    </div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.returnForm}px` }}>
                    <div className="truncate leading-tight" title={audit.returnForm}>{audit.returnForm}</div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.auditSection}px` }}>
                    <div className="truncate leading-tight" title={audit.auditSection}>{audit.auditSection}</div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-xs overflow-hidden" style={{ width: `${columnWidths.auditStatus}px` }}>
                    <span className={`px-1 py-0.5 rounded text-xs font-medium leading-tight ${
                      audit.auditStatus === 'Filed' 
                        ? 'bg-green-900 text-green-300' 
                        : audit.auditStatus === 'Completed'
                        ? 'bg-blue-900 text-blue-300'
                        : audit.auditStatus === 'Pending'
                        ? 'bg-yellow-900 text-yellow-300'
                        : audit.auditStatus === 'In Progress'
                        ? 'bg-orange-900 text-orange-300'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {audit.auditStatus === 'In Progress' ? 'Progress' : 
                       audit.auditStatus === 'Completed' ? 'Done' :
                       audit.auditStatus}
                    </span>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.filingDate}px` }}>
                    <div className="truncate leading-tight">
                      {audit.filingDate 
                        ? new Date(audit.filingDate).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit'
                          })
                        : '—'}
                    </div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.auditForm}px` }}>
                    <div className="truncate leading-tight" title={audit.auditForm}>   {audit.auditForm ? (
                      <a
                        href={s3ToHttp(audit.auditForm)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline text-xs inline-block leading-tight"
                      >
                           < File size={18} />
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}</div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.acknowledgment}px` }}>
                    <div className="truncate font-mono leading-tight" title={audit.acknowledgment}> {audit.acknowledgment ? (
                      <a
                        href={s3ToHttp(audit.acknowledgment)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300 underline text-xs inline-block leading-tight"
                      >
                           <File size={18} />
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}</div>
                  </td>
                  <td className="border border-gray-600 px-0.5 py-1 overflow-hidden text-center" style={{ width: `${columnWidths.link}px` }}>
                    {audit.link ? (
                      <a 
                        href={audit.link} 
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
      
      {audits.length === 0 && !loading && (
        <div className="text-center py-4 sm:py-8">
          <div className="text-gray-400 text-base sm:text-lg mb-2">No audit records found</div>
          <div className="text-gray-500 text-xs sm:text-sm">No audit records available for this PAN</div>
        </div>
      )}
    </div>
  );
}