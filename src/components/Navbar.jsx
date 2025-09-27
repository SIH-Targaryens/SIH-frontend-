import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="hat">🎓</span> Guid-Ed
      </div>
      <ul className="navbar-links">
        <li>Home</li>
        <li>Quiz</li>
        <li className="active">Colleges</li>
        <li>Timeline</li>
        <li>Resources</li>
      </ul>
      <div className="navbar-user">
        <span className="navbar-notification-badge">3</span>
        <div className="navbar-avatar">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#789" />
            <text x="16" y="21" fill="#fff" fontSize="15" textAnchor="middle">U</text>
          </svg>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
