import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import axios from "axios";
import { getApiUrl } from './config';

// Send cookies and CSRF tokens for cross-site requests
axios.defaults.withCredentials = true;

// Use absolute backend origin in production; in development the Vite proxy
// intercepts requests to /api/* so leaving baseURL empty also works, but
// setting baseURL to the API origin makes production builds work.
axios.defaults.baseURL = getApiUrl();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./styles.css";

// import Button from 'react-bootstrap/Button';
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//       <Button>Boot-Strap@-Button</Button>
//   </BrowserRouter>
// );
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./styles.css";

// import Button from 'react-bootstrap/Button';
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//       <Button>Boot-Strap@-Button</Button>
//   </BrowserRouter>
// );