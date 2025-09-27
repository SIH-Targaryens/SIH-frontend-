import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CollegeGrid from "../components/CollegeGrid";
import { getBookmarks, removeBookmark } from "../api/bookmarks";
import { useAuth } from "../AuthContext";

function Bookmarks() {
  const { token } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBookmarks(token).then(setBookmarks).finally(() => setLoading(false));
  }, [token]);

  const handleRemove = async (bookmarkId) => {
    await removeBookmark(token, bookmarkId);
    setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
  };

  return (
    <div>
      <Navbar />
      <h2 style={{ margin: "2rem auto 1rem auto", maxWidth: 1200 }}>Your Bookmarked Colleges</h2>
      {loading ? (
        <div style={{ textAlign: "center", margin: "2rem" }}>Loading...</div>
      ) : bookmarks.length === 0 ? (
        <div style={{ textAlign: "center", margin: "2rem" }}>No bookmarks yet.</div>
      ) : (
        <CollegeGrid colleges={bookmarks.map(b => ({
          ...b.college,
          bookmarked: true,
          bookmark_id: b.id,
          onRemove: () => handleRemove(b.id)
        }))} />
      )}
    </div>
  );
}

export default Bookmarks;
