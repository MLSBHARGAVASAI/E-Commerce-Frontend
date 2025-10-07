// // src/config.js (or wherever you store API URLs)

// export const API_BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://e-commerce-backend-axvr.onrender.com" // your deployed backend on Render
//     : "http://localhost:8000"; // local backend for development

// // Ensure URL has trailing slash
// export const getApiUrl = () => {
//   return API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`;
// };

import axios from "axios";
import Cookies from "js-cookie";

// ---------------- API Base ----------------
export const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-backend-axvr.onrender.com/api/"
    : "http://localhost:8000/api/";

// ---------------- Axios instance ----------------
// Use a dedicated axios instance configured to always talk to the backend origin
export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Make sure axios uses Django's CSRF cookie/header names
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";

// ---------------- CSRF Helper ----------------
export const getCsrfToken = () => {
  const cookie = Cookies.get("csrftoken");
  return cookie || null;
};

// Attach CSRF header for unsafe methods when cookie is present
api.interceptors.request.use((config) => {
  const token = getCsrfToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers["X-CSRFToken"] = token;
  }
  return config;
});

// ---------------- Session Check ----------------
export const checkSession = async () => {
  try {
    const res = await api.get("session/");
    return res.data; // { is_authenticated, username, is_admin }
  } catch (err) {
    console.error("Session check failed:", err);
    return { is_authenticated: false, is_admin: false, username: null };
  }
};

// ---------------- Login ----------------
export const loginUser = async (loginData) => {
  try {
    const res = await api.post("login/", loginData);
    return res.data;
  } catch (err) {
    console.error("Login error:", err.response || err);
    return {
      success: false,
      error: err.response?.data?.error || "Login failed",
    };
  }
};

// ---------------- Register ----------------
export const registerUser = async (registerData) => {
  try {
    const res = await api.post("register/", registerData);
    return res.data;
  } catch (err) {
    console.error("Registration error:", err.response || err);
    return {
      success: false,
      error: err.response?.data?.error || "Registration failed",
    };
  }
};
