import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SmoothScroll from "./SmoothScroll";

const App = () => {
  return (
    <SmoothScroll>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </SmoothScroll>
  );
};

export default App;
