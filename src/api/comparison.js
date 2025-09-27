

export async function compareColleges(token, collegeIds = []) {
  const res = await fetch("/api/college_comparison", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ college_ids: collegeIds })
  });
  if (!res.ok) throw new Error("Failed to compare colleges");
  return res.json();
}
