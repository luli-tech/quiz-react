import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategorySelection = () => {
  const [category, setCategory] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumberOfQuestions(e.target.value);
  };

  const handleStartQuiz = () => {
    if (category && numberOfQuestions > 0) {
      navigate("/quizPage", { state: { category, numberOfQuestions } });
    } else {
      alert("Please select a category and enter a valid number of questions.");
    }
  };

  return (
    <div>
      <h1>Select Category and Number of Questions</h1>
      <div>
        <label>Category: </label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Entertainment">Entertainment</option>
          {/* Add more categories here */}
        </select>
      </div>
      <div>
        <label>Number of Questions: </label>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={handleNumberChange}
        />
      </div>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default CategorySelection;
