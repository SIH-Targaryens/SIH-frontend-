export async function fetchRecommendations(token, params = {}) {
  let url = "/api/recommendations";
  const qs = new URLSearchParams(params).toString();
  if (qs) url += "?" + qs;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}

export async function bookmarkCollege(token, collegeId) {
  const res = await fetch("/api/college_bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ college_id: collegeId })
  });
  if (!res.ok) throw new Error("Failed to bookmark college");
  return res.json();
}

export async function unbookmarkCollege(token, bookmarkId) {
  const res = await fetch(`/api/college_bookmarks/${bookmarkId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to unbookmark college");
  return res.json();
}
