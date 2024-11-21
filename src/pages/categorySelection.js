import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./categorySelection.css";

const CategorySelection = () => {
  const [category, setCategory] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  return (
    <div className="container">
      <h1>Select Quiz</h1>
      <label>Category:</label>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">Select a Category</option>
        <option value="general_knowledge">General Knowledge</option>
        <option value="music">Music</option>
        <option value="history">History</option>
        <option value="sport">sport</option>
        <option value="education">education</option>
        <option value="nature">nature</option>
        <option value="government">government</option>
        <option value="politics">politics</option>
        <option value="science">science</option>
        <option value="technology">technology</option>
        <option value="medicine">medicine</option>
        <option value="economics">economics</option>
        <option value="legal">law</option>
        {/* Add more categories */}
      </select>
      <label>Number of Questions:</label>
      <input
        type="number"
        value={numberOfQuestions}
        onChange={(e) => setNumberOfQuestions(e.target.value)}
      />
      {category && numberOfQuestions > 0 ? (
        <NavLink
          to={`/quizPage?category=${category}&numberOfQuestions=${numberOfQuestions}`}
        >
          <button>Start Quiz</button>
        </NavLink>
      ) : (
        <p>Please select a category and number of questions.</p>
      )}
    </div>
  );
};

export default CategorySelection;
