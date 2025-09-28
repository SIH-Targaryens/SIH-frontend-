import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { sendChatMessage } from "../api/chatbot";
import "./ChatBot.css";

function ChatBot() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{from:"bot",text:"Hello! How can I help you today?"}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await sendChatMessage(token, input);
      setMessages((msgs) => [...msgs, { from: "bot", text: res.reply || "..." }]);
    } catch {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Sorry, something went wrong." }]);
    }
    setLoading(false);
  }

  return (
    <div>
      <button className="chatbot-btn" onClick={() => setOpen(o => !o)}>
        <i className="fa fa-robot" />
      </button>
      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Guid-Ed Bot</span>
            <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.from === "bot" ? "left" : "right",
                  margin: "0.5em 0"
                }}
              >
                <span
                  style={{
                    background: msg.from === "bot" ? "#f3f5f8" : "#3cb371",
                    color: msg.from === "bot" ? "#222" : "#fff",
                    padding: "0.45em 0.8em",
                    borderRadius: "12px",
                    display: "inline-block"
                  }}
                >{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              <i className="fa fa-paper-plane" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
