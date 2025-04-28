import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./QuizPrompt.css";
import { useNavigate } from "react-router-dom";

const QuizPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);
  const countdownRef = useRef(null);
  const navigate = useNavigate();

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      startCountdown();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const startCountdown = () => {
    setProgress(100);
    const duration = 30000;
    const interval = 100;
    const steps = duration / interval;
    const decrement = 100 / steps;

    countdownRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(countdownRef.current);
          return 0;
        }
        return newProgress;
      });
    }, interval);
  };

  const handleClose = () => {
    setIsClosing(true);
    clearInterval(countdownRef.current);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleTakeQuiz = () => {
    clearInterval(countdownRef.current);
    navigate("/quiz");
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="quiz-prompt-container"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: isClosing ? 0 : 1, y: isClosing ? 100 : 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>

          <div className="prompt-header">
            <div className="sparkle-icon">✨</div>
            <h3>Quick Question For You...</h3>
          </div>

          <p>
            Are you getting the most from your research? Take our 60-second quiz
            to find out!
          </p>

          <div className="benefits-list">
            <div className="benefit">
              <span>✓</span> Discover hidden weaknesses
            </div>
            <div className="benefit">
              <span>✓</span> Get personalized tips
            </div>
            <div className="benefit">
              <span>✓</span> Join 5,000+ students
            </div>
          </div>

          <button className="quiz-button" onClick={handleTakeQuiz}>
            Take Quiz Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizPrompt;
