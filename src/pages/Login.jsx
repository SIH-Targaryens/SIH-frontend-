import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(username, password);
      saveToken(res.token);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ maxWidth: 370, margin: "4rem auto", background: "#fff", borderRadius: 18, boxShadow: "0 2px 8px #0001", padding: "2.2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.7rem" }}>Login to PathFinder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "0.7em", marginBottom: "1em", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "0.7em", marginBottom: "1.2em", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{ background: "#3cb371", color: "#fff", border: "none", borderRadius: 8, padding: "0.7em 2em", fontWeight: 500, width: "100%" }}
        >
          Login
        </button>
        {error && <div style={{ color: "red", marginTop: "1em", textAlign: "center" }}>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
