// QuizSetupPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizSetupPage = () => {
  const navigate = useNavigate();
  const [numQuestions, setNumQuestions] = useState(5);
  const [category, setCategory] = useState("");

  const handleStartQuiz = () => {
    if (numQuestions && category) {
      // Save settings to localStorage or state (optional)
      navigate("/quiz", { state: { numQuestions, category } }); // Pass data to quiz page
    } else {
      alert("Please select both number of questions and category.");
    }
  };

  return (
    <div className="quiz-setup-container">
      <h1>Select Quiz Settings</h1>
      <div>
        <label htmlFor="num-questions">Number of Questions: </label>
        <select
          id="num-questions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div>
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Science">Science</option>
          <option value="Math">Math</option>
          <option value="History">History</option>
          {/* Add more categories */}
        </select>
      </div>

      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizSetupPage;
