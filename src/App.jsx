import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Quiz from "./Components/QuizComponent";
import SmoothScroll from "./SmoothScroll";

const App = () => {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </SmoothScroll>
  );
};

export default App;
