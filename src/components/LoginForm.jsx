import React, { useState } from "react";

function LoginForm({ onLogin, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onLogin(username, password);
    } catch (err) {
      setError("Invalid credentials, please try again.");
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
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red", marginTop: "1em", textAlign: "center" }}>{error}</div>}
    </form>
  );
}

export default LoginForm;
