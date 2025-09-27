import React from "react";
import "./GreetingBanner.css";

function GreetingBanner() {
  return (
    <div className="greeting-banner">
      <div>
        <h1>Hello, Studenr!</h1>
        <p>
          Based on your interests , here are your top matches:
        </p>
      </div>
      <div className="greeting-icons">
        <button className="icon-btn" title="Lightbulb">
          <i className="fa fa-lightbulb-o" />
        </button>
        <button className="icon-btn" title="Camera">
          <i className="fa fa-camera" />
        </button>
      </div>
    </div>
  );
}

export default GreetingBanner;
