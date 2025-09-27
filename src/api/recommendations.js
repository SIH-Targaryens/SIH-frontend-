export async function getRecommendations(token, params = {}) {
  let url = "/api/recommendations";
  const qs = new URLSearchParams(params).toString();
  if (qs) url += "?" + qs;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}
