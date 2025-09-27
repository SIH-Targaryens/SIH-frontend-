import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";

function CollegeDetail() {
  const { collegeId } = useParams();
  const { token } = useAuth();
  const [college, setCollege] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      const res = await fetch(`/api/colleges/${collegeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCollege(data);

      const rev = await fetch(`/api/colleges/${collegeId}/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(await rev.json());
      setLoading(false);
    }
    fetchDetail();
  }, [collegeId, token]);

  if (loading) return <div>Loading college details...</div>;
  if (!college) return <div>College not found.</div>;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", background: "#fff", borderRadius: 16, boxShadow: "0 2px 8px #0001", padding: "2rem" }}>
      <h2>{college.name}</h2>
      <p><strong>Location:</strong> {college.location}</p>
      <p><strong>Streams:</strong> {(college.streams || []).join(", ")}</p>
      <p><strong>Description:</strong> {college.description}</p>
      <h3 style={{ marginTop: "2rem" }}>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((r) => (
            <li key={r.id}><strong>{r.author}:</strong> {r.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CollegeDetail;
