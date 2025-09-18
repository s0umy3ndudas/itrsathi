import { useState, useEffect } from 'react';
import { 
  Upload, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  File, 
  Database, 
  RefreshCw,
  User,
  Users,
  BarChart3,
  Search,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Trash2,
  Redo, 
  Download,
  Filter,
  Calendar,
  Shield,
  Info,
  CheckSquare,
  Square,
  AlertTriangle
} from 'lucide-react';
import axios from 'axios';


import { useAuth } from '@/hooks/useAuth';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('single');
  
  // Single entry states
  const [pan, setPan] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [panCheckStatus, setPanCheckStatus] = useState(''); // 'checking', 'exists', 'new', 'error'
  const [checkingPan, setCheckingPan] = useState(false);
  const [panValidation, setPanValidation] = useState({ isValid: false, error: '' });
  const [passwordMatch, setPasswordMatch] = useState(true);
  
  // Bulk upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [processingIndex, setProcessingIndex] = useState(-1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  
  // Queue states
  const [queue, setQueue] = useState([]);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('active'); // 'active' or 'history'
  const [deletingPans, setDeletingPans] = useState(new Set()); // Track which PANs are being deleted
  
  // Existing PANs from database
  const [existingPans, setExistingPans] = useState([]);
  const [loadingPans, setLoadingPans] = useState(false);

  // PAN validation function
  const validatePAN = (panNumber) => {
    if (!panNumber) {
      return { isValid: false, error: '' };
    }
    
    // Remove spaces and convert to uppercase
    const cleanPan = panNumber.replace(/\s/g, '').toUpperCase();
    
    // Check length
    if (cleanPan.length !== 10) {
      return { isValid: false, error: 'PAN must be exactly 10 characters long' };
    }
    
    // Check pattern: AAAANNNNNA (5 letters, 4 numbers, 1 letter)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panRegex.test(cleanPan)) {
      return { isValid: false, error: 'Invalid PAN format. Should be: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)' };
    }
    
    // Additional validation for 4th character (type of holder)
    const fourthChar = cleanPan[3];
    const validFourthChars = ['A', 'B', 'C', 'F', 'G', 'H', 'L', 'J', 'P', 'T'];
    if (!validFourthChars.includes(fourthChar)) {
      return { isValid: false, error: 'Invalid PAN: 4th character must be A/B/C/F/G/H/L/J/P/T (holder type identifier)' };
    }
    
    return { isValid: true, error: '' };
  };

  // Password validation
  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true); // Don't show error if either field is empty
    }
  }, [password, confirmPassword]);

  // PAN validation effect
  useEffect(() => {
    const validation = validatePAN(pan);
    setPanValidation(validation);
  }, [pan]);

 

  // Fetch existing PANs from database
const fetchExistingPans = async () => {
  setLoadingPans(true);
  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    const token = auth?.accessToken;

    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/assessees/getAllUserAssessees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setExistingPans(response.data.pans || []);
    return response.data.pans || [];
  } catch (error) {
    console.error("Failed to fetch existing PANs:", error);
    return [];
  } finally {
    setLoadingPans(false);
  }
};

  // Fetch queue status on component mount and periodically
  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch existing PANs on component mount and every minute
  useEffect(() => {
    fetchExistingPans();
    const interval = setInterval(fetchExistingPans, 60000); // Refresh every 1 minute
    return () => clearInterval(interval);
  }, []);

  // Single PAN checking function
  const checkSinglePan = async (panNumber) => {
    if (!panNumber || panNumber.length !== 10) {
      setPanCheckStatus('');
      return;
    }

    // Don't check if PAN is invalid
    const validation = validatePAN(panNumber);
    if (!validation.isValid) {
      setPanCheckStatus('');
      return;
    }

    setCheckingPan(true);
    setPanCheckStatus('checking');

    try {

      const auth = JSON.parse(localStorage.getItem("auth") || "null");
const token = auth?.accessToken;
      // Use existing PANs from state if available, otherwise fetch fresh
      let pansToCheck = existingPans;
      if (existingPans.length === 0) {
        const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/assessees/getAllUserAssessees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );;
        pansToCheck = response.data.pans || [];
        setExistingPans(pansToCheck); // Update state
      }
      
      if (pansToCheck.includes(panNumber)) {
        setPanCheckStatus('exists');
      } else {
        setPanCheckStatus('new');
      }
    } catch (error) {
      console.error('PAN check error:', error);
      setPanCheckStatus('error');
    } finally {
      setCheckingPan(false);
    }
  };

  // Debounced PAN checking
useEffect(() => {
  const timeoutId = setTimeout(() => {
    if (pan && pan.length === 10 && panValidation.isValid) {
      checkSinglePan(pan);
    } else {
      setPanCheckStatus('');
    }
  }, 500); // run after 500ms of inactivity

  return () => clearTimeout(timeoutId);
}, [pan, panValidation.isValid]); // ✅ only re-run when pan changes

  // Auto-check CSV data against existing PANs when existingPans state changes
  useEffect(() => {
    if (csvData.length > 0) {
      // Update CSV data status based on current existingPans
      setCsvData(prev => prev.map(item => {
        if (existingPans.includes(item.pan)) {
          return { ...item, status: 'already_added', error: 'Already in system' };
        } else {
          return { ...item, status: 'ready_to_add' };
        }
      }));
    }
  }, [existingPans, csvData.length]); // Re-run when existingPans changes or csvData is loaded

const fetchQueue = async () => {
  setLoadingQueue(true);
  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    const token = auth?.accessToken;

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/queues/getQueue`, // ✅ corrected path
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setQueue(res.data.queue || []);
  } catch (err) {
    console.error("Failed to fetch queue:", err);
  } finally {
    setLoadingQueue(false);
  }
};
  //clear all queue

async function clearQueue() {
  const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/clear-queue`)

}
  
  // Function to terminate a PAN
  const reAddPan = async (panToTerminate) => {
    setDeletingPans(prev => new Set(prev).add(panToTerminate));
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/addBacktoQueue`, {
        pan: panToTerminate
      });
      
      // Refresh queue after successful termination
      await fetchQueue();
      
      // Show success message (optional)
      console.log('PAN terminated successfully:', panToTerminate);
      
    } catch (error) {
      console.error('Failed to terminate PAN:', error);
      // You could show an error message here
    } finally {
      setDeletingPans(prev => {
        const newSet = new Set(prev);
        newSet.delete(panToTerminate);
        return newSet;
      });
    }
  };
  const terminatePan = async (panToTerminate) => {
    setDeletingPans(prev => new Set(prev).add(panToTerminate));
    
    try {
       const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const token = auth?.accessToken;

  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/queues/terminatePan`,
    { pan: panToTerminate.trim().toUpperCase() },
    { headers: { Authorization: `Bearer ${token}` } }
  );
      
      // Refresh queue after successful termination
      await fetchQueue();
      
      // Show success message (optional)
      console.log('PAN terminated successfully:', panToTerminate);
      
    } catch (error) {
      console.error('Failed to terminate PAN:', error);
      // You could show an error message here
    } finally {
      setDeletingPans(prev => {
        const newSet = new Set(prev);
        newSet.delete(panToTerminate);
        return newSet;
      });
    }
  };

const handleRun = async () => {
  // basic validation (unchanged)
  if (!pan || !password || !confirmPassword) {
    setStatus("Please fill in all required fields");
    return;
  }
  if (!panValidation.isValid) {
    setStatus("Please enter a valid PAN number");
    return;
  }
  if (!passwordMatch) {
    setStatus("Passwords do not match");
    return;
  }
  if (panCheckStatus === "exists") {
    setStatus("This PAN is already in the system");
    return;
  }
  if (panCheckStatus !== "new") {
    setStatus("Please wait for PAN validation to complete");
    return;
  }

  const cleanPan = pan.trim().toUpperCase();

  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const token = auth?.accessToken;
  if (!token) {
    setStatus("You are not logged in. Please log in again.");
    return;
  }

  // start UI feedback
  setStatus("");
  setProgress(0);
  setLoading(true);
  setShowProgress(true);

  let interval = null;
  try {
    // call the correct endpoint (your env uses /api)
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/queues/addPan`,
      { pan: cleanPan, password: password.trim() },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // If we get here, server returned a 2xx — consider this queued
    // small simulated progress so user sees activity
    let percent = 0;
    interval = setInterval(() => {
      percent = Math.min(percent + 20, 100); // faster short animation
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        interval = null;

        // show final UI state: queued
        setLoading(false);
        setShowProgress(false);
        setProgress(100);
        setStatus("Queued — waiting to be processed");

        // reset the form
        setPan("");
        setPassword("");
        setConfirmPassword("");
        setPanCheckStatus("");
        setPanValidation({ isValid: false, error: "" });

        // refresh queue and PANs to reflect the new job
        fetchQueue();
        fetchExistingPans?.();
      }
    }, 150);

    // OPTIONAL: if you want to show the exact server message briefly
    if (res.data?.message) {
      console.log("Server:", res.data.message);
    }
  } catch (err) {
    console.error("addPan error:", err);

    const statusCode = err?.response?.status;
    const apiMsg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Unknown error";

    if (statusCode === 401) {
      setStatus("Unauthorized: please log in again.");
    } else if (statusCode === 403) {
      setStatus("This PAN is not linked to your account.");
    } else {
      setStatus("Failed: " + apiMsg);
    }

    // stop progress UI
    setShowProgress(false);
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    setLoading(false);
  } finally {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    // we already set loading=false on success and failure, but keep this safe
    setLoading(false);
  }
};
  const handleFileSelection = async (file) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadStatus('Please upload only CSV files');
      return;
    }

    setUploadStatus('Reading CSV file...');
    
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 1) {
        setUploadStatus('CSV file is empty');
        return;
      }

      const data = [];
      const invalidPans = [];
      let hasHeaders = false;
      
      // Check if first row looks like headers
      const firstRow = lines[0].split(',').map(h => h.trim().toLowerCase());
      const containsPanHeader = firstRow.includes('pan');
      const containsPasswordHeader = firstRow.includes('password');
      
      if (containsPanHeader && containsPasswordHeader) {
        // Has headers - parse with headers
        hasHeaders = true;
        const panIndex = firstRow.indexOf('pan');
        const passwordIndex = firstRow.indexOf('password');
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          if (values.length >= Math.max(panIndex + 1, passwordIndex + 1)) {
            const pan = values[panIndex].toUpperCase();
            const password = values[passwordIndex];
            
            if (pan && password) {
              const validation = validatePAN(pan);
              if (validation.isValid) {
                data.push({ 
                  pan, 
                  password,
                  status: 'pending',
                  index: i - 1,
                  selected: false
                });
              } else {
                invalidPans.push({ row: i, pan, error: validation.error });
              }
            }
          }
        }
      } else {
        // No headers - assume first column is PAN, second is password
        for (let i = 0; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          if (values.length >= 2) {
            const pan = values[0].toUpperCase();
            const password = values[1];
            
            if (pan && password) {
              const validation = validatePAN(pan);
              if (validation.isValid) {
                data.push({ 
                  pan, 
                  password,
                  status: 'pending',
                  index: i,
                  selected: false
                });
              } else {
                invalidPans.push({ row: i + 1, pan, error: validation.error });
              }
            }
          }
        }
      }

      if (data.length === 0 && invalidPans.length === 0) {
        setUploadStatus('No valid pan/password pairs found. Ensure format: PAN (10 chars), Password');
        return;
      }

      if (invalidPans.length > 0) {
        const invalidSummary = invalidPans.slice(0, 3).map(item => `Row ${item.row}: ${item.error}`).join('; ');
        const additionalCount = invalidPans.length > 3 ? ` and ${invalidPans.length - 3} more` : '';
        setUploadStatus(`Found ${data.length} valid entries${hasHeaders ? ' (with headers)' : ' (no headers)'}. ${invalidPans.length} invalid PANs skipped: ${invalidSummary}${additionalCount}`);
      } else {
        setUploadStatus(`Found ${data.length} valid entries${hasHeaders ? ' (with headers)' : ' (no headers - assuming PAN, Password columns)'}. Review and process below.`);
      }

      setCsvData(data);
      setSelectedFile(file);
      
      // Immediately check the CSV data against existing PANs if we have them
      if (existingPans.length > 0) {
        const updatedData = data.map(item => {
          if (existingPans.includes(item.pan)) {
            return { ...item, status: 'already_added', error: 'Already in system' };
          } else {
            return { ...item, status: 'ready_to_add' };
          }
        });
        setCsvData(updatedData);
      } else {
        // If we don't have existing PANs yet, fetch them and then update
        fetchExistingPans().then(() => {
          // The useEffect will handle updating the csvData when existingPans state changes
        });
      }
      
    } catch (error) {
      setUploadStatus('Error reading CSV file: ' + error.message);
    }
  };

const processBulkEntries = async () => {
  if (!Array.isArray(csvData) || csvData.length === 0) return;

  // 🔑 get token first (avoid Temporal Dead Zone)
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const token = auth?.accessToken;
  if (!token) {
    setUploadStatus("You are not logged in. Please log in again.");
    return;
  }
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  setUploadLoading(true);
  setUploadStatus("Checking which PANs are already added...");

  try {
    // 1) Get user's existing PANs (cache or fetch)
    let existingPansInDb = existingPans;
    if (!Array.isArray(existingPansInDb)) existingPansInDb = [];

    if (existingPansInDb.length === 0) {
      const checkResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/assessees/getAllUserAssessees`,
        authHeaders
      );

      // accept either { pans: [] } or array of assessees
      const pans =
        Array.isArray(checkResponse.data)
          ? checkResponse.data.map(a => String(a.pan || "").toUpperCase().trim())
          : (checkResponse.data?.pans || []).map(p => String(p).toUpperCase().trim());

      // de-dup + clean
      existingPansInDb = [...new Set(pans.filter(Boolean))];
      setExistingPans(existingPansInDb);
    }

    // Normalize the DB pans once for reliable comparisons
    const normalizedExisting = existingPansInDb.map(p =>
      String(p || "").toUpperCase().trim()
    );

    // 2) Normalize CSV rows (don’t compare with raw csvData)
    const normalizedCsv = csvData.map(row => ({
      ...row,
      pan: String(row.pan || "").toUpperCase().trim(),
      password: String(row.password || "").trim(),
    }));

    // 3) Split into existing vs new
    const existingPansFromCsv = [];
    const newPans = [];

    for (const row of normalizedCsv) {
      if (!row.pan) continue;
      if (normalizedExisting.includes(row.pan)) existingPansFromCsv.push(row.pan);
      else newPans.push(row.pan);
    }

    // 4) Update UI statuses using normalized PANs
    setCsvData(prev =>
      prev.map(item => {
        const panU = String(item.pan || "").toUpperCase().trim();
        if (existingPansFromCsv.includes(panU)) {
          return { ...item, status: "already_added", error: "Already in system" };
        }
        if (newPans.includes(panU)) {
          return { ...item, status: "ready_to_add" };
        }
        return item;
      })
    );

    // 5) Build payload only from new entries (from normalized list)
    const newEntries = normalizedCsv.filter(r => newPans.includes(r.pan));

    if (newEntries.length === 0) {
      setUploadStatus("All PANs are already in the system. Nothing to add.");
      setUploadLoading(false);
      return;
    }

    setUploadStatus(`Uploading ${newEntries.length} new entries to queue...`);

    const panList = newEntries.map(({ pan, password }) => ({ pan, password }));

    // Debugging: verify both PANs are present before POST
    console.log("normalizedExisting:", normalizedExisting);
    console.log("normalizedCsv:", normalizedCsv);
    console.log("newPans:", newPans);           // expect all new PANs here
    console.log("panList payload:", panList);   // should match newPans length

    // 6) POST to bulk upload (your base is http://localhost:5001)
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/queues/upload-pan-json`,
      panList,
      authHeaders
    );

    // 7) Mark new entries as success
    setCsvData(prev =>
      prev.map(item => {
        const panU = String(item.pan || "").toUpperCase().trim();
        if (newPans.includes(panU)) {
          return { ...item, status: "success" };
        }
        return item;
      })
    );

    setUploadStatus(
      `Successfully uploaded ${newEntries.length} new entries! ${existingPansFromCsv.length} were already in system.`
    );

    // 8) Refresh queue & PANs, then optionally clear CSV
    fetchQueue();
    fetchExistingPans();

    setTimeout(() => {
      clearCsvData();
    }, 2000);

    setTimeout(() => {
      fetchQueue();
      fetchExistingPans();
    }, 3000);
  } catch (error) {
    console.error("Bulk upload error:", error);

    setCsvData(prev =>
      prev.map(item =>
        item.status === "ready_to_add"
          ? {
              ...item,
              status: "failed",
              error: error.response?.data?.error || error.message,
            }
          : item
      )
    );

    setUploadStatus(
      "Failed to upload entries: " +
        (error.response?.data?.error || error.message)
    );
  } finally {
    setUploadLoading(false);
  }
};
  const clearCsvData = () => {
    setCsvData([]);
    setSelectedFile(null);
    setUploadStatus('');
    setSelectAll(false);
    setSelectedRows([]);
    const fileInput = document.getElementById('csv-file-input');
    if (fileInput) fileInput.value = '';
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      setSelectedRows(csvData.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleRowSelection = (index) => {
    setSelectedRows(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'text-green-400';
      case 'processing':
      case 'pending':
      case 'new':
      case 'ready_to_add':
        return 'text-blue-400';
      case 'terminated':
      case 'failed':
      case 'error':
        return 'text-red-400';
      case 'already_added':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'pending':
      case 'new':
      case 'ready_to_add':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'terminated':
      case 'wrong_password':
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'already_added':
        return <Database className="w-4 h-4 text-orange-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getFilteredQueue = () => {
    if (historyFilter === 'active') {
      return queue.filter(item => 
        ['in_queue', 'processing', 'retry'].includes(item.status?.toLowerCase())
      );
    } else {
      return queue.filter(item => 
        [  'success', 'wrong_password'].includes(item.status?.toLowerCase())
      );
    }
  };

  // Calculate new PANs to be added for bulk upload
  const getNewPansCount = () => {
    return csvData.filter(item => item.status === 'ready_to_add').length;
  };

  // Check if single PAN button should be disabled
  const isSinglePanButtonDisabled = () => {
    return loading || !pan || !password || !confirmPassword || 
           !panValidation.isValid || !passwordMatch || 
           panCheckStatus === 'exists' || panCheckStatus === 'checking';
  };

  // Check if bulk upload button should be disabled
  const isBulkUploadButtonDisabled = () => {
    return uploadLoading || getNewPansCount() === 0;
  };

  const tabs = [
    { id: 'single', label: 'Single Entry', icon: User },
    { id: 'bulk', label: 'Bulk Upload', icon: Users },
    { id: 'queue', label: 'Queue Status', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
       
    
          </div>
          <p className="text-gray-400"> Manage individual PANs or upload in bulk to the processing queue</p>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <nav className="flex space-x-0 p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Single Entry Form */}
        {activeTab === 'single' && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Add Single PAN</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">PAN Number *</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pan}
                      onChange={(e) => setPan(e.target.value.toUpperCase())}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        pan && !panValidation.isValid 
                          ? 'border-red-500 focus:ring-red-500' 
                          : panValidation.isValid 
                          ? 'border-green-500 focus:ring-green-500'
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      placeholder="Enter 10-digit PAN number (e.g., ABCDE1234F)"
                      maxLength={10}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {checkingPan && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
                      {panCheckStatus === 'exists' && <XCircle className="w-5 h-5 text-red-400" />}
                      {panCheckStatus === 'new' && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {pan && !panValidation.isValid && !checkingPan && <XCircle className="w-5 h-5 text-red-400" />}
                      {panValidation.isValid && !checkingPan && panCheckStatus !== 'exists' && panCheckStatus !== 'new' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    </div>
                  </div>
                  
                  {pan && !panValidation.isValid && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                      <AlertTriangle className="w-4 h-4" />
                      {panValidation.error}
                    </div>
                  )}
                  {checkingPan && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-blue-400">
                      <Search className="w-4 h-4" />
                      Validating PAN number...
                    </div>
                  )}
                  {panCheckStatus === 'exists' && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      PAN already exists in system
                    </div>
                  )}
                  {panCheckStatus === 'new' && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      PAN is available for processing
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 pr-12 ${
                        confirmPassword && !passwordMatch 
                          ? 'border-red-500 focus:ring-red-500' 
                          : confirmPassword && passwordMatch 
                          ? 'border-green-500 focus:ring-green-500'
                          : 'border-gray-600 focus:ring-blue-500'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {confirmPassword && !passwordMatch && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                      <AlertTriangle className="w-4 h-4" />
                      Passwords do not match
                    </div>
                  )}
                  {confirmPassword && passwordMatch && password && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      Passwords match
                    </div>
                  )}
                </div>

                {/* Password confirmation warning */}
                {password && confirmPassword && passwordMatch && (
                  <div className="p-4 rounded-lg bg-orange-900/20 border border-orange-700">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-orange-400 mb-1">Double-check your password</p>
                        <p className="text-xs text-orange-300">Please ensure your password is correct before submitting. This will be used for PAN authentication.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {status && (
                  <div className={`p-4 rounded-lg border ${
                    status.includes('wrong_password') || status.includes('error') || status.includes('already') || status.includes('not match') || status.includes('valid')
                      ? 'bg-red-900/20 border-red-700 text-red-400' 
                      : 'bg-green-900/20 border-green-700 text-green-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      {status.includes('Failed') || status.includes('error') || status.includes('already') || status.includes('not match') || status.includes('valid') ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                      <p className="text-sm font-medium">{status}</p>
                    </div>
                  </div>
                )}

          {showProgress && (
  <div className="space-y-2">
    <div className="flex justify-between text-sm text-gray-400">
      <span>
        {status.includes("queue")
          ? "Queuing..."
          : status.includes("processing")
          ? "Processing..."
          : status}
      </span>
      <span>{progress}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-3">
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
)}

                <button
                  onClick={handleRun}
                  disabled={isSinglePanButtonDisabled()}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSinglePanButtonDisabled()
                      ? 'bg-gray-700 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add PAN to Queue
                    </>
                  )}
                </button>
                
                {/* Form validation summary */}
                {(pan || password || confirmPassword) && (
                  <div className="text-xs text-gray-400 space-y-1">
                    <p className="font-medium">Form Status:</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {panValidation.isValid ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                        <span>Valid PAN format</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {password ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                        <span>Password entered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordMatch && confirmPassword ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                        <span>Passwords match</span>
                      </div>
                      {panValidation.isValid && (
                        <div className="flex items-center gap-2">
                          {panCheckStatus === 'new' ? (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          ) : panCheckStatus === 'exists' ? (
                            <XCircle className="w-3 h-3 text-red-400" />
                          ) : (
                            <Clock className="w-3 h-3 text-blue-400" />
                          )}
                          <span>PAN availability check</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bulk Upload */}
        {activeTab === 'bulk' && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Bulk Upload PANs</h2>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 transition-colors hover:border-gray-500">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-gray-700 rounded-full">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="csv-file-input"
                    className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <File className="w-4 h-4" />
                    Select CSV File
                  </label>
                  <input
                    id="csv-file-input"
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleFileSelection(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Upload a CSV file with PAN and password columns</p>
                  <p className="text-xs">Supported format: PAN, Password (with or without headers)</p>
                  <p className="text-xs text-orange-400">Only valid PANs (format: ABCDE1234F) will be processed</p>
                </div>
              </div>
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <div className="p-4 rounded-lg bg-gray-700 border border-gray-600">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-300">{uploadStatus}</p>
                </div>
              </div>
            )}

            {/* CSV Data Table */}
            {csvData.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-300">Uploaded Data</h3>
                    <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-400">
                      {csvData.length} entries
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleSelectAll}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {selectAll ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                      Select All
                    </button>
                    <button
                      onClick={clearCsvData}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors px-3 py-1 rounded border border-gray-600 hover:border-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-600">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-600">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-12">
                            <button
                              onClick={toggleSelectAll}
                              className="text-gray-400 hover:text-gray-300"
                            >
                              {selectAll ? (
                                <CheckSquare className="w-4 h-4" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            PAN Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-600">
                        {csvData.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-750 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => toggleRowSelection(index)}
                                className="text-gray-400 hover:text-gray-300"
                              >
                                {selectedRows.includes(index) ? (
                                  <CheckSquare className="w-4 h-4 text-blue-400" />
                                ) : (
                                  <Square className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                              {row.pan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(row.status)}
                                <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                                  {row.status === 'error' ? row.error : row.status.replace('_', ' ')}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => {
                                  const newCsvData = csvData.filter((_, i) => i !== index);
                                  setCsvData(newCsvData);
                                }}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-2">
                      <File className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Total Entries</p>
                        <p className="text-xl font-semibold text-white">{csvData.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-2">
                      <Plus className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-sm text-gray-400">New PANs</p>
                        <p className="text-xl font-semibold text-green-400">{getNewPansCount()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-orange-400" />
                      <div>
                        <p className="text-sm text-gray-400">Already Added</p>
                        <p className="text-xl font-semibold text-orange-400">
                          {csvData.filter(item => item.status === 'already_added').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-sm text-gray-400">Success</p>
                        <p className="text-xl font-semibold text-green-400">
                          {csvData.filter(item => item.status === 'success').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Process Button */}
                <button
                  onClick={processBulkEntries}
                  disabled={isBulkUploadButtonDisabled()}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    isBulkUploadButtonDisabled()
                      ? 'bg-gray-700 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {uploadLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {getNewPansCount() === 0 ? (
                        <>
                          <AlertCircle className="w-4 h-4" />
                          No new PANs to add
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Process {getNewPansCount()} new {getNewPansCount() === 1 ? 'entry' : 'entries'}
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Queue Status */}
        {activeTab === 'queue' && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Queue Status                    <button onClick={clearQueue}> <Trash2 className='w-4 h-4 text-gray-400 hover:text-red-400' /></button>
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setHistoryFilter('active')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      historyFilter === 'active'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    Active
                  </button>
                  <button
                    onClick={() => setHistoryFilter('history')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      historyFilter === 'history'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    History
                  </button>
                </div>
                <button
                  onClick={fetchQueue}
                  disabled={loadingQueue}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                  title="Refresh queue"
                >
                  <RefreshCw className={`w-5 h-5 ${loadingQueue ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Queue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-900 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Pending</p>
                    <p className="text-xl font-semibold text-blue-400">
                      {queue.filter(item => item.status === 'in_queue').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-900 rounded-lg">
                    <Loader2 className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Processing</p>
                    <p className="text-xl font-semibold text-yellow-400">
                      {queue.filter(item => item.status === 'processing').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-900 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Completed</p>
                    <p className="text-xl font-semibold text-green-400">
                      {queue.filter(item => item.status === 'success').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-900 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Failed</p>
                    <p className="text-xl font-semibold text-red-400">
                      {queue.filter(item => item.status === 'wrong_password').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Queue Table */}
            <div className="overflow-hidden rounded-lg border border-gray-600">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        PAN Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-600">
                    {getFilteredQueue().length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-gray-700 rounded-full">
                              <Database className="w-8 h-8 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-lg font-medium text-gray-400">No {historyFilter} entries found</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {historyFilter === 'active' 
                                  ? 'No PANs are currently being processed' 
                                  : 'No completed or failed entries in history'
                                }
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      getFilteredQueue().map((item, index) => (
                        <tr key={index} className="hover:bg-gray-750 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                            {item.pan}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(item.status)}
                              <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                                item.status === 'pending'
                                  ? 'bg-blue-900/50 text-blue-300 border-blue-700'
                                  : item.status === 'completed'
                                  ? 'bg-green-900/50 text-green-300 border-green-700'
                                  : item.status === 'processing'
                                  ? 'bg-yellow-900/50 text-yellow-300 border-yellow-700'
                                  : 'bg-red-900/50 text-red-300 border-red-700'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(item.timestamp).toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {(() => {
                              const now = new Date();
                              const timestamp = new Date(item.timestamp);
                              const diffMs = now - timestamp;
                              const diffMins = Math.floor(diffMs / (1000 * 60));
                              const diffHours = Math.floor(diffMins / 60);
                              const diffDays = Math.floor(diffHours / 24);
                              
                              if (diffDays > 0) return `${diffDays}d ago`;
                              if (diffHours > 0) return `${diffHours}h ago`;
                              if (diffMins > 0) return `${diffMins}m ago`;
                              return 'Just now';
                            })()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div
                            
                            >
                              {deletingPans.has(item.pan) ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (

                              
                                <div className='flex'>
                                   <button    onClick={() => reAddPan(item.pan)}
                              disabled={deletingPans.has(item.pan)}
                              className="text-gray-400transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Readd PAN to queue">

                                <div className=' hover:text-green-400 '>
                                   <Redo/>
                                {/* add back <br></br>
                              
                               to queue
                                */}
                               </div> 
                               </button>
                               <span className='p-6 text-xl font-bold'>/</span>
                               <button    onClick={() => terminatePan(item.pan)}
                              disabled={deletingPans.has(item.pan)}
                              className="text-gray-400transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Terminate PAN processing">

                               <div className=' hover:text-red-400 '>
                               <br></br>
                                <Trash2/> 
                                </div>
                                </button>
                               </div>

                              )}
                            </div>
                          </td>                                                                                                                 
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              {getFilteredQueue().length > 0 && (
                <div className="bg-gray-700 px-6 py-3 border-t border-gray-600">
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>
                      Showing {getFilteredQueue().length} {historyFilter} {getFilteredQueue().length === 1 ? 'entry' : 'entries'}
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Last updated: {new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 