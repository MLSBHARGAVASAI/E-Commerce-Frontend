// import React, { useState } from 'react'

// export default function Login({ setAuth }){
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   function handleSubmit(e){
//     e.preventDefault()
//     if(email === 'demo@shop.com' && password === 'demo123'){
//       setAuth(true)
//     } else {
//       alert('Invalid credentials. Use demo@shop.com / demo123')
//     }
//   }

//   return (
//     <div className="d-flex align-items-center justify-content-center vh-100 hero-gradient">
//       <div className="card p-4 shadow" style={{width: 360, borderRadius: 12}}>
//         <h3 className="text-center mb-3">Sai Shoppings — Login</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Email</label>
//             <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="demo@shop.com" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} placeholder="demo123" required />
//           </div>
//           <button className="btn btn-primary w-100" type="submit">Login</button>
//           <small className="d-block text-center mt-2 text-white-50">Demo: demo@shop.com / demo123</small>
//         </form>
//       </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from "react";
import axios from "axios";

// ---------------- API BASE ----------------
const API_BASE =
  import.meta.env.MODE === "production"
    ? "https://e-commerce-backend-axvr.onrender.com/api/"
    : "/api/";

// ---------------- CSRF Helper ----------------
const getCookie = (name) => {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (let cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
};

// Attach CSRF token to all Axios requests
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = getCookie("csrftoken");
  if (token) config.headers["X-CSRFToken"] = token;
  return config;
});

export default function Login({ setAuth }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // ---------------- Persist login on refresh ----------------
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(API_BASE + "session/");
        if (res.data.is_authenticated) setAuth(true);
      } catch {
        console.log("No active session");
      }
    };
    checkSession();
  }, [setAuth]);

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(API_BASE + "login/", loginData);
      if (res.data.success) {
        setAuth(true);
        setLoginData({ email: "", password: "" });
        // refresh session status immediately
        try { await axios.get(API_BASE + "session/"); } catch {}
      } else {
        setError(res.data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4 shadow mx-3" style={{ width: '100%', maxWidth: 400, borderRadius: 12 }}>
        <form onSubmit={handleLogin}>
          <h3 className="mb-3 text-center">Login</h3>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          {error && <div className="text-danger mb-2">{error}</div>}
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
