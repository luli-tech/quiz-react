import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchData, next, previous, selectAnswer } from "../redux/store";
import "./QuizInterface.css";

const QuizInterface = () => {
  const { questions, currentQuestionIndex, selectedAnswers, status } =
    useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const numberOfQuestions = queryParams.get("numberOfQuestions");

  useEffect(() => {
    if (status === "idle" && category && numberOfQuestions) {
      dispatch(fetchData({ category, numberOfQuestions }));
    }
  }, [status, category, numberOfQuestions, dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading questions.</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const userSelectedAnswer = selectedAnswers[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(next());
    } else {
      navigate("/result");
    }
  };

  const handleAnswerSelection = (answer) => {
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="container">
      {/* Question number display */}
      <div className="question-progress">
        Question {currentQuestionIndex + 1} out of {questions.length}
      </div>

      <h1>{currentQuestion?.question}</h1>
      <div className="answers-container">
        {currentQuestion?.answers.map((answer, index) => {
          let buttonClass = "";
          if (userSelectedAnswer) {
            if (answer === currentQuestion.correctAnswer) {
              buttonClass = "correct"; // Correct answer
            } else if (answer === userSelectedAnswer) {
              buttonClass = "incorrect"; // User-selected incorrect answer
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelection(answer)}
              className={buttonClass}
              disabled={userSelectedAnswer !== undefined}
            >
              <span className="option-label">{optionLabels[index]}</span>
              <span className="option-text">{answer}</span>
            </button>
          );
        })}
      </div>
      <div className="quiz-navigation">
        <button
          onClick={() => dispatch(previous())}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button onClick={handleNext}>
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizInterface;
