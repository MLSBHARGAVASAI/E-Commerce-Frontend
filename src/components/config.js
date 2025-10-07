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
axios.defaults.withCredentials = true; // include session cookies

// ---------------- CSRF Helper ----------------
export const getCsrfToken = () => {
  const cookie = Cookies.get("csrftoken");
  return cookie || null;
};

// ---------------- Session Check ----------------
export const checkSession = async () => {
  try {
    const res = await axios.get(`${API_BASE}session/`, {
      headers: {
        "X-CSRFToken": getCsrfToken(),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data; // { is_authenticated, username, is_admin }
  } catch (err) {
    console.error("Session check failed:", err);
    return { is_authenticated: false, is_admin: false, username: null };
  }
};

// ---------------- Login ----------------
export const loginUser = async (loginData) => {
  try {
    const res = await axios.post(`${API_BASE}login/`, loginData, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
      withCredentials: true,
    });
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
    const res = await axios.post(`${API_BASE}register/`, registerData, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCsrfToken(),
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Registration error:", err.response || err);
    return {
      success: false,
      error: err.response?.data?.error || "Registration failed",
    };
  }
};
