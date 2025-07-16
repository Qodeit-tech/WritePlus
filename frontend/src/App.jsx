import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Quiz from "./Components/QuizComponent";
import Success from "./PaymentSuccess";
import SmoothScroll from "./SmoothScroll";
import Contact from "./Components/Contact";

const App = () => {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payment-success" element={<Success />} />
      </Routes>
    </SmoothScroll>
  );
};

export default App;
