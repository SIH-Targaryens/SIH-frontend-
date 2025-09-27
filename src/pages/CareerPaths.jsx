import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthContext";

function CareerPaths() {
  const { token } = useAuth();
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/career_path", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setPaths)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <Navbar />
      <h2 style={{ margin: "2rem auto 1.4rem auto", maxWidth: 1200 }}>Explore Career Paths</h2>
      {loading ? (
        <div style={{ textAlign: "center", margin: "2rem" }}>Loading...</div>
      ) : paths.length === 0 ? (
        <div style={{ textAlign: "center", margin: "2rem" }}>No career paths found.</div>
      ) : (
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          {paths.map((cp) => (
            <div key={cp.id} style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 8px #0001", padding: "1.5rem" }}>
              <h3 style={{ margin: 0 }}>{cp.title || cp.name}</h3>
              <p style={{ color: "#444" }}>{cp.description}</p>
              {cp.related_jobs && (
                <div style={{ fontSize: "0.98rem", marginTop: "0.7em" }}>
                  <strong>Related Jobs:</strong> {cp.related_jobs.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CareerPaths;
