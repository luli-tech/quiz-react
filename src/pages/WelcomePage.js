import React, { useEffect, useState } from "react";
import "./welcomePage.css";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`welcome-container ${isVisible ? "fade-in" : ""}`}>
      <div className="welcome-content">
        <h1 className="welcome-heading">Welcome to the Quiz App!</h1>
        <p className="welcome-message">Test your knowledge with fun quizzes!</p>
        <button className="start-button">
          <NavLink to="/category">Start Your Quiz</NavLink>
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
