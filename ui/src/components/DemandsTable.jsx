'use client';
import { ExternalLink, File } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

export default function DemandsTable({ pan }) {
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Column widths state for resizing
  const [columnWidths, setColumnWidths] = useState({
    ay: 70,
    us: 60,
    demandRef: 120,
    demandDate: 90,
    taxPenalty: 90,
    interest: 90,
    total: 90,
    responsePdf: 90,
    link: 70
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

    const fetchData = async () => {
      console.log('🔍 Fetching demands for PAN:', pan);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/demands?pan=${pan}`);
        const data = await res.json();
        console.log('✅ Data fetched successfully:', data);
        setDemands(data.demands);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pan]);

  if (!pan) return <p className="text-red-400">❗No PAN selected.</p>;
  if (loading) return <p className="text-gray-300">⏳ Loading demands...</p>;

  return (
    <div className="p-6 border border-gray-700 bg-gray-800 rounded-lg shadow-xl w-full">
      <div className="w-full overflow-x-auto max-h-[500px] bg-gray-900 rounded-lg border border-gray-700">
        <table ref={tableRef} className="border-collapse text-xs min-w-full" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-gray-700 sticky top-0 z-10">
            <tr>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.ay}px` }}
              >
                A.Y.
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('ay', e)}
                />
              </th>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.us}px` }}
              >
                U/s
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('us', e)}
                />
              </th>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.demandRef}px` }}
              >
                Demand Reference No
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('demandRef', e)}
                />
              </th>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.demandDate}px` }}
              >
                Date of Demand
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('demandDate', e)}
                />
              </th>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.taxPenalty}px` }}
              >
                Tax/Penalty
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('taxPenalty', e)}
                />
              </th>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.interest}px` }}
              >
                Interest Amount
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('interest', e)}
                />
              </th>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.total}px` }}
              >
                Total
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('total', e)}
                />
              </th>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.responsePdf}px` }}
              >
                Response PDF
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('responsePdf', e)}
                />
              </th>
              <th 
                className="border border-gray-600 px-1 py-2 text-white text-left relative" 
                style={{ width: `${columnWidths.link}px` }}
              >
                Link
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 bg-gray-500"
                  onMouseDown={(e) => handleMouseDown('link', e)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {demands.map((demand) => (
              <tr key={demand._id} className="bg-gray-900 hover:bg-gray-800 transition-colors duration-200">
                <td className="border border-gray-600 px-1 py-2 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.ay}px` }}>
                  <div className="truncate" title={demand.assessmentYear}>{demand.assessmentYear}</div>
                </td>
                <td className="border border-gray-600 px-1 py-2 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.us}px` }}>
                  <div className="truncate" title={demand.section}>{demand.section}</div>
                </td>
                <td className="border border-gray-600 px-1 py-2 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.demandRef}px` }}>
                  <div className="truncate" title={demand.demandRefNo}>{demand.demandRefNo}</div>
                </td>
                <td className="border border-gray-600 px-1 py-2 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.demandDate}px` }}>
                  <div className="truncate">{new Date(demand.dateOfDemand).toLocaleDateString()}</div>
                </td>
                <td className="border border-gray-600 px-1 py-2 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.taxPenalty}px` }}>
                  <div className="truncate text-green-400">₹{demand.taxOrPenalty.toLocaleString()}</div>
                </td>
                <td className="border border-gray-600 px-1 py-2 text-gray-300 text-xs overflow-hidden" style={{ width: `${columnWidths.interest}px` }}>
                  <div className="truncate text-yellow-400">₹{demand.interestAmount.toLocaleString()}</div>
                </td>
                <td className="border border-gray-600 px-1 py-2 text-xs font-semibold overflow-hidden" style={{ width: `${columnWidths.total}px` }}>
                  <div className="truncate text-red-400">₹{demand.total.toLocaleString()}</div>
                </td>
                <td className="border border-gray-600 px-1 py-2 overflow-hidden" style={{ width: `${columnWidths.responsePdf}px` }}>
                  {demand.responsePdf ? (
                    <a
                      href={`${import.meta.env.VITE_API_BASE_URL}/naman/eproceedings/${demand.assessee.pan}/${demand.responsePdf}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline text-xs"
                    >
                      <File size={18} />
                    </a>
                  ) : (
                    <div className="text-blue-400 hover:text-blue-300 underline text-xs"> <File size={18} /></div>
                      
                    // <span className="text-gray-500 text-xs">—</span>
                  )}
                </td>
                <td className="border border-gray-600 px-1 py-2 overflow-hidden" style={{ width: `${columnWidths.link}px` }}>
                  <a
                    href={`https://incometax.gov.in/${demand.demandRefNo}`}
                    target="_blank"
                    
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {demands.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">No demands found</div>
          <div className="text-gray-500 text-sm">No demand records available for this PAN</div>
        </div>
      )}
    </div>
  );
}