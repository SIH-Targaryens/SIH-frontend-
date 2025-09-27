

export async function getBookmarks(token) {
  const res = await fetch("/api/college_bookmarks", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch bookmarks");
  return res.json();
}

export async function addBookmark(token, collegeId) {
  const res = await fetch("/api/college_bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ college_id: collegeId })
  });
  if (!res.ok) throw new Error("Failed to add bookmark");
  return res.json();
}

export async function removeBookmark(token, bookmarkId) {
  const res = await fetch(`/api/college_bookmarks/${bookmarkId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to remove bookmark");
  return res.json();
}
