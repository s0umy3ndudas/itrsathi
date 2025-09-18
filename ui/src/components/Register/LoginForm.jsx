// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // ✅ object destructuring (NOT array)
  const { requestOtp, verifyOtp, isRequestingOtp, isVerifyingOtp, user } = useAuth();
  const navigate = useNavigate();

  // ✅ useState returns an array; always call useState(...)
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // <-- not generic, just a string in JS

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      await requestOtp(email);
      setStep("otp");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp({ email, otp });
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.error || "Invalid OTP");
    }
  };

  if (user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-green-500 text-xl">✅ Logged in as {user.email}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {step === "email" ? (
        <form onSubmit={handleRequestOtp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
          <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Login with Email</h1>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-3 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isRequestingOtp}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isRequestingOtp ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96">
          <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Enter OTP</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full mb-3 p-2 border rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isVerifyingOtp}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            type="button"
            className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            onClick={() => setStep("email")}
          >
            Back
          </button>
        </form>
      )}
    </div>
  );
}