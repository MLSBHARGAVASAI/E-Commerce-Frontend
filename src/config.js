// src/config.js (or wherever you store API URLs)

export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-backend-axvr.onrender.com" // your deployed backend on Render
    : "http://localhost:8000"; // local backend for development

// Ensure URL has trailing slash
export const getApiUrl = () => {
  return API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`;
};
