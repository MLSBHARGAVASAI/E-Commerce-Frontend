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

// Set API base URL depending on environment
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-backend-axvr.onrender.com" // Your deployed backend
    : "http://localhost:8000";

// Ensure trailing slash
export const getApiUrl = () => (API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`);

// ---------------- Session Check ----------------
export const checkSession = async () => {
  try {
    const response = await axios.get(`${getApiUrl()}api/session/`, {
      withCredentials: true,  // important to send session cookie
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"), // optional, if CSRF used
      },
    });
    return response.data; // returns { is_authenticated, username, is_admin }
  } catch (err) {
    console.error("Session check failed:", err);
    return null;
  }
};
