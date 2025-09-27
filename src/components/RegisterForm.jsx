import React, { useState } from "react";

function RegisterForm({ onRegister, loading }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await onRegister(username, email, password);
      setSuccess(true);
    } catch {
      setError("Registration failed. Try a different username/email.");
    }
  };

  return (
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
        disabled={loading}
        style={{ background: "#3cb371", color: "#fff", border: "none", borderRadius: 8, padding: "0.7em 2em", fontWeight: 500, width: "100%" }}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <div style={{ color: "red", marginTop: "1em", textAlign: "center" }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: "1em", textAlign: "center" }}>Registration successful!</div>}
    </form>
  );
}

export default RegisterForm;
