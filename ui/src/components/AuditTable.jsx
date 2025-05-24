'use client';
import React, { useEffect, useState } from 'react';

export default function AuditTable({ pan }) {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pan) return;

    const fetchAudits = async () => {
      console.log('🔍 Fetching audits for PAN:', pan);
      try {
        const res = await fetch(`http://localhost:5000/audit/${pan}`);
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

  if (!pan) return <p className="text-red-500">❗No PAN selected.</p>;
  if (loading) return <p>⏳ Loading audits...</p>;

  return (
    <div className="p-4 border-2   rounded shadow mt-4">
       <div className="overflow-x-auto max-h-[600px] hide-scrollbar">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              {[
                'A.Y', 'Return Form', 'Audit Section', 'Audit Status', 'Filing Date',
                'Audit Form', 'Acknowledgment', 'Link'
              ].map((header) => (
                <th key={header} className="border px-3 py-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {audits.map((audit) => (
              <tr key={audit._id} className="bg-white hover:bg-gray-100">
                <td className="border px-3 py-2">{audit.assessmentYear}</td>
                <td className="border px-3 py-2">{audit.returnForm}</td>
                <td className="border px-3 py-2">{audit.auditSection}</td>
                <td className="border px-3 py-2">{audit.auditStatus}</td>
                <td className="border px-3 py-2">
                  {audit.filingDate ? new Date(audit.filingDate).toLocaleDateString() : '—'}
                </td>
                <td className="border px-3 py-2">{audit.auditForm}</td>
                <td className="border px-3 py-2">{audit.acknowledgment}</td>
                <td className="border px-3 py-2">
                  {audit.link ? (
                    <a href={audit.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View
                    </a>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
