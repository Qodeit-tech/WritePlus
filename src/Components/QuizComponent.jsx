import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizData } from "../quizData";
import "./QuizComponent.css";
import Warn from "../assets/warning.png";

const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
    setSelectedOption(null);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-root-container">
        <motion.div
          className="quiz-intro"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="quiz-title">{quizData.title}</h1>
          <p className="quiz-description">{quizData.description}</p>
          <div className="intro-text-box">
            <p>{quizData.introText}</p>
          </div>
          <motion.button
            className="start-quiz-btn"
            onClick={startQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start the Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-root-container">
        <motion.div
          className="quiz-result"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={Warn} className="warning" alt="" />
          <h2 className="headline">{quizData.result.headline}</h2>
          <p className="subheadline">{quizData.result.subheadline}</p>
          <p className="solution-text">{quizData.result.solutionText}</p>
          <div className="cta-section">
            <motion.button className="cta-button">
              <span className="button__icon-wrapper">
                <svg
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="button__icon-svg"
                  width="13"
                >
                  <path
                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                    fill="currentColor"
                  ></path>
                </svg>
                <svg
                  viewBox="0 0 14 15"
                  fill="none"
                  width="13"
                  xmlns="http://www.w3.org/2000/svg"
                  className="button__icon-svg button__icon-svg--copy"
                >
                  <path
                    d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              Get WritePlus for Just $49.99 — Stop Falling Behind Today
            </motion.button>
            <p className="cta-subtext">{quizData.result.ctaSubtext}</p>
          </div>

          <motion.button className="retake-quiz-btn" onClick={resetQuiz}>
            Retake Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const isNextDisabled = selectedOption === null;

  return (
    <div className="quiz-root-container">
      <div className="quiz-container">
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / quizData.questions.length) * 100
              }%`,
            }}
          ></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            className="question-container"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h3 className="question-text">{currentQuestion.text}</h3>
            <div className="options-container">
              {currentQuestion.options.map((option) => (
                <motion.button
                  key={option.id}
                  className={`option-btn ${
                    selectedOption === option.id ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="navigation-buttons">
          {currentQuestionIndex > 0 && (
            <motion.button
              className="prev-btn"
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
                setSelectedOption(answers[currentQuestionIndex - 1] || null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
          )}

          <span className="question-counter">
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </span>

          <motion.button
            className={`next-btn ${isNextDisabled ? "disabled" : ""}`}
            onClick={handleNextQuestion}
            disabled={isNextDisabled}
            whileHover={!isNextDisabled ? { scale: 1.05 } : {}}
            whileTap={!isNextDisabled ? { scale: 0.95 } : {}}
          >
            {currentQuestionIndex === quizData.questions.length - 1
              ? "See Results"
              : "Next"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
