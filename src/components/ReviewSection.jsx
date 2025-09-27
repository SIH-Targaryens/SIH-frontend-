import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

function ReviewSection({ collegeId }) {
  const { token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/colleges/${collegeId}/reviews`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setReviews)
      .finally(() => setLoading(false));
  }, [collegeId, token]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(`/api/colleges/${collegeId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text })
    });
    if (res.ok) {
      const review = await res.json();
      setReviews([review, ...reviews]);
      setText("");
    }
  };

  return (
    <div>
      <h3>Reviews</h3>
      <form onSubmit={submitReview} style={{ marginBottom: "1em" }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a review..."
          rows={3}
          style={{ width: "100%", borderRadius: 8, border: "1px solid #bbb", padding: "0.6em" }}
        />
        <button
          type="submit"
          style={{ background: "#3cb371", color: "#fff", border: "none", borderRadius: 8, padding: "0.5em 1.7em", fontWeight: 500, marginTop: 8 }}
        >
          Submit
        </button>
      </form>
      {loading ? (
        <div>Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div>No reviews yet.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reviews.map(r => (
            <li key={r.id} style={{ background: "#f7f9fb", borderRadius: 8, marginBottom: 8, padding: "0.7em 1em" }}>
              <strong>{r.author}</strong>: {r.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReviewSection;
