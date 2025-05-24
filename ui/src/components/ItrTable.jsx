'use client';
import React, { useEffect, useState } from 'react';

export default function ITRTable({ pan }) {
  const [itrs, setItrs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pan) return;

    const fetchData = async () => {
      console.log('🔍 Fetching ITRs for PAN:', pan);
      try {
        const res = await fetch(`http://localhost:5000/itr/${pan}`);
        const data = await res.json();
        console.log('✅ ITRs fetched successfully:', data);
        setItrs(data.itrs || []);
      } catch (error) {
        console.error('❌ Error fetching ITRs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pan]);

  if (!pan) return <p className="text-red-500">❗No PAN selected.</p>;
  if (loading) return <p>⏳ Loading ITRs...</p>;

  return (
    <div className="p-4 border-2 border-gray-400 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">ITR</h2>

      <div className="overflow-y-auto max-h-[500px] hide-scrollbar">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {[
                'A.Y', 'ITR FORM', 'FILING DATE', 'Current Status',
                'Return Processing Status', 'itr ack pdf', 'ITR form pdf',
                'Initmation pdf', 'AIS PDF', '26AS PDF', 'link', 'Ack No.', 'Filing Section'
              ].map(header => (
                <th key={header} className="border px-2 py-1">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {itrs.map((itr) => (
              <tr key={itr._id} className="bg-white hover:bg-gray-100">
                <td className="border px-2 py-1">{itr.assessmentYear}</td>
                <td className="border px-2 py-1">{itr.itrForm}</td>
                <td className="border px-2 py-1">{new Date(itr.filingDate).toLocaleDateString()}</td>
                <td className="border px-2 py-1">{itr.currentStatus}</td>
                <td className="border px-2 py-1">{itr.returnProcessingStatus}</td>

                <td className="border px-2 py-1">
                  {itr.itrAckPdfUrl ? (
                    <a
                      href={itr.itrAckPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open
                    </a>
                  ) : '—'}
                </td>
                <td className="border px-2 py-1">
                  {itr.itrFormPdfUrl ? (
                    <a
                      href={itr.itrFormPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open
                    </a>
                  ) : '—'}
                </td>
                <td className="border px-2 py-1">
                  {itr.intimationPdfUrl ? (
                    <a
                      href={itr.intimationPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open
                    </a>
                  ) : '—'}
                </td>
                <td className="border px-2 py-1">
                  {itr.aisPdfUrl ? (
                    <a
                      href={itr.aisPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open
                    </a>
                  ) : '—'}
                </td>
                <td className="border px-2 py-1">
                  {itr.form26asPdfUrl ? (
                    <a
                      href={itr.form26asPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open
                    </a>
                  ) : '—'}
                </td>

                <td className="border px-2 py-1">
                  {itr.link ? (
                    <a
                      href={itr.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  ) : '—'}
                </td>

                <td className="border px-2 py-1">{itr.ackNumber}</td>
                <td className="border px-2 py-1">{itr.filingSection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
