import { useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const [pan, setPan] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRun = async () => {
    setStatus('');
    setProgress(0);
    setLoading(true);
    setShowProgress(true); // Show progress bar immediately

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/automation/run`, {
        pan,
        password,
      });

      const message = res.data.message || '';

      if (message === 'FINALLY GOT THE COOKIE') {
        let percent = 0;
        const interval = setInterval(() => {
          percent += 10;
          setProgress(percent);
          if (percent >= 100) {
            clearInterval(interval);
            setLoading(false);
            setStatus('done');
            setShowProgress(false);
          }
        }, 200); // Simulated 2s progress
      } else {
        setLoading(false);
        setShowProgress(false);
        setStatus('❌ Try again');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setShowProgress(false);
      setStatus('❌ Failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Add new Assessee</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={pan}
          onChange={(e) => setPan(e.target.value.toUpperCase())}
          placeholder="ABCDE1234F"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
      </div>

      <button
        onClick={handleRun}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'ADD'}
      </button>

      {showProgress && (
        <div className="w-full bg-gray-300 h-2 rounded mt-4 overflow-hidden">
          <div
            className="bg-green-500 h-2"
            style={{
              width: `${progress}%`,
              transition: 'width 0.2s ease-in-out',
            }}
          />
        </div>
      )}

      {!showProgress && status && (
        <p className="mt-4 text-sm font-medium text-gray-800">
          {status === 'done' ? '✅ Done. Add another assessee?' : status}
        </p>
      )}
    </div>
  );
}
