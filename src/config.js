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

export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-backend-axvr.onrender.com"
    : "http://localhost:8000";

export const getApiUrl = () =>
  API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`;

// Login request
export const login = async (data) => {
  try {
    const response = await axios.post(`${getApiUrl()}api/login/`, data, {
      withCredentials: true, // include session cookie
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err);
    return null;
  }
};

// Session check
export const checkSession = async () => {
  try {
    const response = await axios.get(`${getApiUrl()}api/session/`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Session check failed:", err.response?.data || err);
    return null;
  }
};
