import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle, Calendar, X } from 'lucide-react';
import SearchableAssesseeDropdown from '@/components/SearchDropdown';

const NoticesDashboard = () => {
  const [notices, setNotices] = useState({ openNotices: [], closedNotices: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('open');
  const [selectedAssessee, setSelectedAssessee] = useState(null);
  useEffect(() => {
    fetchNotices();
  }, [selectedAssessee]);

const fetchNotices = async () => {
  try {
    setLoading(true);
    setError(null);

    // 🔑 get token
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    const token = auth?.accessToken;
    if (!token) throw new Error("No access token found");

    // 🔑 decide endpoint based on selection
    let url;
    if (selectedAssessee === "ALL") {
      url = `${import.meta.env.VITE_API_BASE_URL}/api/users/notices/pan/ALL`;
    } else if (selectedAssessee && selectedAssessee.pan) {
      url = `${import.meta.env.VITE_API_BASE_URL}/api/users/notices/pan/${encodeURIComponent(selectedAssessee.pan)}`;
    } else {
      // fallback → all notices
      url = `${import.meta.env.VITE_API_BASE_URL}/api/users/notices/pan/ALL`;
    }

    console.log("fetching notices:", url);

    // 🔑 make request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 🔑 parse & save
    const data = await response.json();
    setNotices(data);
  } catch (err) {
    setError(err.message);
    console.error("fetchNotices failed:", err);
  } finally {
    setLoading(false);
  }
};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (isOpen) => {
    return isOpen ? (
      <AlertCircle className="w-5 h-5 text-orange-500" />
    ) : (
      <CheckCircle className="w-5 h-5 text-green-500" />
    );
  };

  const NoticeCard = ({ notice, isOpen }) => (
    <div className="bg-white rounded-lg shadow-md border-l-4 p-6 mb-4 transition-all hover:shadow-lg">
      <div 
        className="border-l-4 absolute left-0 top-0 h-full rounded-l-lg"
        style={{ backgroundColor: notice.color }}
      ></div>
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon(isOpen)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isOpen 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {isOpen ? 'Active' : 'Resolved'}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(notice.start)}
        </div>
      </div>
      
      <h3 className="font-semibold text-lg text-gray-800 mb-2">
        {notice.title}
      </h3>
      
      {notice.message && (
        <p className="text-gray-600 mb-3">
          {notice.message}
        </p>
      )}
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          Started: {formatDate(notice.start)}
        </div>
        
        {notice.end && (
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Resolved: {formatDate(notice.end)}
          </div>
        )}
      </div>
    </div>
  );
 

  return (
    <div className="max-w-6xl mx-auto p-6   min-h-screen">
      <div className="mb-8">
      
       <label className="block mb-2 font-semibold text-lg text-white">Select Assessee</label>
        <SearchableAssesseeDropdown onSelect={setSelectedAssessee} selectedAssessee={selectedAssessee} />

      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <X className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">Error loading notices: {error}</span>
       
          </div>
        </div>
      )}
 
      <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('open')}
          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'open'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Open Notices ({notices.openNotices.length})
        </button>
        
        <button
          onClick={() => setActiveTab('closed')}
          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'closed'
              ? 'bg-green-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Closed Notices ({notices.closedNotices.length})
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'open' && (
          <>
            {notices.openNotices.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Open Notices</h3>
                <p className="text-gray-600">All systems are running smoothly!</p>
              </div>
            ) : (
              notices.openNotices.map((notice, index) => (
                <NoticeCard key={notice.id || index} notice={notice} isOpen={true} />
              ))
            )}
          </>
        )}

        {activeTab === 'closed' && (
          <>
            {notices.closedNotices.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Closed Notices</h3>
                <p className="text-gray-600">No resolved notices to display.</p>
              </div>
            ) : (
              notices.closedNotices.map((notice, index) => (
                <NoticeCard key={notice.id || index} notice={notice} isOpen={false} />
              ))
            )}
          </>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={fetchNotices}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh Notices'}
        </button>
      </div>
    </div>
  );
};

export default NoticesDashboard;