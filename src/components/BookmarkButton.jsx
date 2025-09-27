import React, { useState } from "react";
import { addBookmark, removeBookmark } from "../api/bookmarks";
import { useAuth } from "../AuthContext";

function BookmarkButton({ collegeId, bookmarked: initialBookmarked, bookmarkId: initialBookmarkId, onChange }) {
  const { token } = useAuth();
  const [bookmarked, setBookmarked] = useState(initialBookmarked || false);
  const [bookmarkId, setBookmarkId] = useState(initialBookmarkId || null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (!bookmarked) {
        const res = await addBookmark(token, collegeId);
        setBookmarkId(res.id);
        setBookmarked(true);
        onChange && onChange(true, res.id);
      } else {
        await removeBookmark(token, bookmarkId);
        setBookmarked(false);
        setBookmarkId(null);
        onChange && onChange(false, null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title="Bookmark"
      style={{
        background: "none",
        border: "none",
        fontSize: "1.4rem",
        color: bookmarked ? "#ffd700" : "#b3b3b3",
        cursor: "pointer"
      }}
    >
      <i className={`fa${bookmarked ? "s" : "r"} fa-star`} />
    </button>
  );
}

export default BookmarkButton;
