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

// ---------------- Axios default ----------------
axios.defaults.withCredentials = true; // send cookies

// ---------------- CSRF Helper ----------------
export const getCsrfToken = () => {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (let cookie of cookies) {
    if (cookie.startsWith("csrftoken=")) {
      return decodeURIComponent(cookie.substring("csrftoken=".length));
    }
  }
  return null;
};

// ---------------- Session Check ----------------
export const checkSession = async () => {
  try {
    const res = await axios.get(`${API_BASE}session/`, {
      headers: { "X-CSRFToken": getCsrfToken() },
    });
    return res.data; // { is_authenticated, username, is_admin }
  } catch (err) {
    console.error("Session check failed:", err);
    return null;
  }
};

// ---------------- Login ----------------
export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(`${API_BASE}login/`, loginData, {
      headers: { "X-CSRFToken": getCsrfToken() },
    });
    return res.data; // { success: true/false, message/error }
  } catch (err) {
    return { success: false, error: err.response?.data?.error || "Login failed" };
  }
};

// ---------------- Register ----------------
export const registerUser = async (registerData) => {
  try {
    const res = await axios.post(`${API_BASE}register/`, registerData, {
      headers: { "X-CSRFToken": getCsrfToken() },
    });
    return res.data;
  } catch (err) {
    return { success: false, error: err.response?.data?.error || "Registration failed" };
  }
};
