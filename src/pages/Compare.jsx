import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { compareColleges } from "../api/comparison";
import { useAuth } from "../AuthContext";

function Compare() {
  const { token } = useAuth();
  const [collegeIds, setCollegeIds] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    setLoading(true);
    try {
      const ids = collegeIds.split(',').map(e => e.trim()).filter(Boolean);
      const res = await compareColleges(token, ids);
      setResult(res);
    } catch (e) {
      setResult({ error: "Comparison failed." });
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "2rem auto", background: "#fff", borderRadius: 18, boxShadow: "0 2px 8px #0001", padding: "2rem" }}>
        <h2>Compare Colleges</h2>
        <input
          type="text"
          value={collegeIds}
          onChange={e => setCollegeIds(e.target.value)}
          placeholder="Enter College ID separated by commas"
          style={{ width: "100%", padding: "0.7em", marginBottom: "1em", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button
          onClick={handleCompare}
          style={{ background: "#3cb371", color: "#fff", border: "none", borderRadius: 8, padding: "0.7em 2em", fontWeight: 500, cursor: "pointer" }}
          disabled={loading}
        >
          {loading ? "Comparing..." : "Compare"}
        </button>
        {result && (
          <div style={{ marginTop: "2em" }}>
            {result.error ? (
              <div style={{ color: "red" }}>{result.error}</div>
            ) : (
              <pre style={{ background: "#f3f5f8", padding: "1em", borderRadius: 8, overflowX: "auto" }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
