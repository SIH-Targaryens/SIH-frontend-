import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { bookmarkCollege, unbookmarkCollege } from "../api/colleges";
import "./CollegeCard.css";

function CollegeCard({ college }) {
  const { token } = useAuth();
  const [bookmarked, setBookmarked] = useState(college.bookmarked || false);
  const [bookmarkId, setBookmarkId] = useState(college.bookmark_id || null);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleBookmark = async () => {
    setBookmarkLoading(true);
    try {
      if (!bookmarked) {
        const res = await bookmarkCollege(token, college.id);
        setBookmarkId(res.id);
        setBookmarked(true);
      } else {
        await unbookmarkCollege(token, bookmarkId);
        setBookmarked(false);
        setBookmarkId(null);
      }
    } finally {
      setBookmarkLoading(false);
    }
  };

  return (
    <div className="college-card" style={{ borderTop: `4px solid ${college.color || "#3cb371"}` }}>
      <div className="card-header">
        <div className="match-circle" style={{ borderColor: college.color || "#3cb371" }}>
          <span className="match-percent">{college.match_score || 0}%</span>
          <div className="match-label">Match</div>
        </div>
        <button
          className="star-btn"
          title="Bookmark"
          onClick={handleBookmark}
          disabled={bookmarkLoading}
          style={{ color: bookmarked ? "#ffd700" : "#b3b3b3" }}
        >
          <i className={`fa${bookmarked ? "s" : "r"} fa-star`} />
        </button>
      </div>
      <h2 className="college-title">{college.name}</h2>
      <div className="tags">
        {(college.tags || []).map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>
      <div className="colleges-nearby">
        <i className="fa fa-university" /> {college.colleges_nearby || 0} colleges near you
      </div>
      <div className="card-actions">
        <button className="view-btn">View Career Path</button>
        <button className="compare-btn">Compare</button>
      </div>
    </div>
  );
}

export default CollegeCard;
