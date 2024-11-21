import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./welcomePage.css";

const WelcomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`welcome-container ${isVisible ? "fade-in" : ""}`}>
      <h1>Welcome to the LULI Qurious</h1>
      <p>Test your knowledge with fun quizzes!</p>
      <NavLink to="/category">
        <button>Start Quiz</button>
      </NavLink>
    </div>
  );
};

export default WelcomePage;
