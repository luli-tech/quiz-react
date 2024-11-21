import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../redux/store"; // Import resetQuiz action
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { questions, selectedAnswers, results } = useSelector(
    (state) => state.mainSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate the total score (correct answers)
  const totalCorrect = results.filter((result) => result === true).length;

  // Access category and numberOfQuestions from location state
  const { category, numberOfQuestions } = useSelector(
    (state) => state.mainSlice // Assuming it's in state (or pass through props)
  );

  // Handle Retake Quiz button click
  const handleRetakeQuiz = () => {
    dispatch(resetQuiz()); // Reset the quiz state in Redux
    navigate("/quizPage", { state: { category, numberOfQuestions } }); // Navigate to the quiz page
  };

  // Handle Take New Quiz button click
  const handleTakeNewQuiz = () => {
    dispatch(resetQuiz()); // Reset the quiz state in Redux
    navigate("/category"); // Navigate to category selection page
  };

  // Handle End Quiz button click
  const handleEndQuiz = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="result-container">
      <header className="result-header">
        <h1>Quiz Result</h1>
      </header>

      <main className="result-body">
        <h2>
          You scored {totalCorrect} out of {questions.length}
        </h2>

        <div className="result-details">
          {questions.map((question, index) => (
            <div key={index} className="question-result">
              <p className="question-text">
                <strong>{question.question}</strong>
              </p>
              <p className="selected-answer">
                Your answer:{" "}
                <span
                  className={
                    results[index] ? "correct-answer" : "incorrect-answer"
                  }
                >
                  {selectedAnswers[index]}
                </span>
              </p>
              <p className="correct-answer-text">
                Correct answer: <strong>{question.correctAnswer}</strong>
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="result-footer">
        <button onClick={handleTakeNewQuiz}>Take New Quiz</button>
        <button onClick={handleRetakeQuiz}>Retake This Quiz</button>
        <button onClick={handleEndQuiz}>End Quiz & Go to Home</button>
      </footer>
    </div>
  );
};

export default ResultPage;
