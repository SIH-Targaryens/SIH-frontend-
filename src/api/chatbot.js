export async function sendChatMessage(token, message) {
  const res = await fetch("/api/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  });
  if (!res.ok) throw new Error("Chatbot error");
  return res.json();
}
