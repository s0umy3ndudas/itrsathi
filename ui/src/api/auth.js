import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- LocalStorage helpers ---
const AUTH_KEY = "auth"; // stores { user, accessToken }

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
  } catch {
    return null;
  }
}

export function setAuth(auth) {
  if (!auth) {
    localStorage.removeItem(AUTH_KEY);
  } else {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }
}

export function getToken() {
  const auth = getAuth();
  return auth?.accessToken || null;
}

// --- Axios instance with Authorization header ---
export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth API calls ---

// Passwordless login: step 1 → send OTP
export async function requestOtp(email) {
  const res = await api.post("/request-otp", { email });
  return res.data; // { message: "OTP sent..." }
}

// Passwordless login: step 2 → verify OTP
export async function verifyOtp({ email, otp }) {
  const res = await api.post("/verify-otp", { email, otp });
  const { user, accessToken } = res.data || {};
  if (user && accessToken) setAuth({ user, accessToken });
  return res.data;
}

// Hybrid register/login (if you keep password flow)
export async function registerOrLogin({ email, password }) {
  const res = await api.post("/register", { email, password });
  const { user, accessToken } = res.data || {};
  if (user && accessToken) setAuth({ user, accessToken });
  return res.data;
}

// Fetch current user profile (protected route)
export async function fetchMe() {
  const res = await api.get("/me"); // backend should implement this
  return res.data;
}

// Logout (client-side clear)
export function logout() {
  setAuth(null);
}