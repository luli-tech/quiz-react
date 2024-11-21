import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../redux/store";
import "./resultPage.css";
import { Link } from "react-router-dom";

const ResultPage = () => {
  const { questions, selectedAnswers } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  // Calculate correct answers
  const correctAnswersCount = questions.reduce((count, question, index) => {
    return question.correctAnswer === selectedAnswers[index]
      ? count + 1
      : count;
  }, 0);

  const handleReset = () => {
    dispatch(resetQuiz());
  };

  return (
    <div className="result-container">
      <h1>Quiz Results</h1>
      <p>
        You got {correctAnswersCount} out of {questions.length} questions
        correct.
      </p>

      <div className="results-details">
        {questions.map((question, index) => (
          <div key={index} className="result-item">
            <h3>
              {index + 1}. {question.question}
            </h3>
            <p>
              <strong>Your Answer:</strong>{" "}
              {selectedAnswers[index] || "Not Answered"}
            </p>
            <p>
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </p>
          </div>
        ))}
      </div>

      <div className="result-actions">
        <Link to="/quizPage" onClick={handleReset}>
          <button>Retake Quiz</button>
        </Link>
        <a href="/category" onClick={handleReset}>
          <button>Take New Quiz</button>
        </a>
        <a href="/" onClick={handleReset}>
          <button>Go to Welcome Page</button>
        </a>
      </div>
    </div>
  );
};

export default ResultPage;
