import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email })
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Registration failed. Try a different username/email.");
    }
  };

  return (
    <div style={{ maxWidth: 370, margin: "4rem auto", background: "#fff", borderRadius: 18, boxShadow: "0 2px 8px #0001", padding: "2.2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.7rem" }}>Create your account</h2>
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          Register
        </button>
        {error && <div style={{ color: "red", marginTop: "1em", textAlign: "center" }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: "1em", textAlign: "center" }}>Registration successful! Redirecting...</div>}
      </form>
    </div>
  );
}

export default Register;
