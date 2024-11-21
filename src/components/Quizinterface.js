import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, next, previous, selectAnswer } from "../redux/store";
import { useNavigate, useLocation } from "react-router-dom";

const QuizInterface = () => {
  const { questions, status, currentQuestionIndex, selectedAnswers, results } =
    useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  const { category, numberOfQuestions } = location.state || {}; // Access category and numberOfQuestions

  // Fetch data based on the selected category
  useEffect(() => {
    if (status === "idle") {
      if (category && numberOfQuestions) {
        dispatch(fetchData({ category, numberOfQuestions })); // Pass category and numberOfQuestions
      }
    }
  }, [status, category, numberOfQuestions, dispatch]);

  // Handle next button action
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(next());
    } else {
      navigate("/result");
    }
  };

  // Handle previous button action
  const handlePrevious = () => {
    dispatch(previous());
  };

  // Handle answer selection
  const handleAnswerSelection = (answer) => {
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading quiz data</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userSelectedAnswer = selectedAnswers[currentQuestionIndex];
  const isAnswerCorrect = results[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Quiz App - {category}</h1> {/* Display the category */}
      </header>

      <main className="quiz-body">
        <div className="question-section">
          <h2 className="question-index">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="question-text">{currentQuestion?.question}</p>
        </div>

        <div className="options-section">
          {currentQuestion?.answers?.map((option, index) => (
            <button
              key={index}
              className={`option ${
                userSelectedAnswer === option
                  ? isAnswerCorrect
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleAnswerSelection(option)}
              disabled={userSelectedAnswer !== undefined}
            >
              {option}
            </button>
          ))}
        </div>

        {userSelectedAnswer && (
          <div className="answer-result">
            {isAnswerCorrect ? (
              <span className="correct-answer">Correct!</span>
            ) : (
              <span className="incorrect-answer">
                Incorrect! The correct answer is:{" "}
                {currentQuestion.correctAnswer}
              </span>
            )}
          </div>
        )}
      </main>

      <footer className="quiz-footer">
        <button
          className="prev-btn"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={userSelectedAnswer === undefined}
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default QuizInterface;
