'use client';
import React, { useEffect, useState } from 'react';

export default function DemandsTable({ pan }) {
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pan) return;

    const fetchData = async () => {
      console.log('🔍 Fetching demands for PAN:', pan);
      try {
        const res = await fetch(`http://localhost:5000/demands?pan=${pan}`);
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

  if (!pan) return <p className="text-red-500">❗No PAN selected.</p>;
  if (loading) return <p>⏳ Loading demands...</p>;

  return (
    <div className="p-4 border-2   rounded shadow mt-4">
 
      <div className="overflow-y-auto max-h-[500px] hide-scrollbar">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {[
                'A.Y.', 'U/s', 'Demand Reference No', 'Date of Demand',
                'Tax/Penalty', 'Interest Amount', 'Total', 'Response PDF', 'Link'
              ].map(header => (
                <th key={header} className="border px-2 py-1">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demands.map((demand) => (
              <tr key={demand._id} className="bg-white hover:bg-gray-100">
                <td className="border px-2 py-1">{demand.assessmentYear}</td>
                <td className="border px-2 py-1">{demand.section}</td>
                <td className="border px-2 py-1">{demand.demandRefNo}</td>
                <td className="border px-2 py-1">{new Date(demand.dateOfDemand).toLocaleDateString()}</td>
                <td className="border px-2 py-1">₹{demand.taxOrPenalty.toLocaleString()}</td>
                <td className="border px-2 py-1">₹{demand.interestAmount.toLocaleString()}</td>
                <td className="border px-2 py-1 font-semibold text-red-700">₹{demand.total.toLocaleString()}</td>
                <td className="border px-2 py-1">
                  {demand.responsePdf ? (
                    <a
                      href={`http://localhost:5000/naman/eproceedings/${demand.assessee.pan}/${demand.responsePdf}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open
                    </a>
                  ) : '—'}
                </td>
                <td className="border px-2 py-1">
                  <a
                    href={`https://incometax.gov.in/${demand.demandRefNo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
