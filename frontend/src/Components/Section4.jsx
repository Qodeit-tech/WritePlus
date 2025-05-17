import React from "react";
import "./Section4.css";

import Check2 from "../assets/check2.webp";

const Section4 = () => {
  return (
    <div className="section4">
      <h1>
        It’s Not Just About Finishing Your Thesis — It’s About Taking Back Your
        Life
      </h1>
      <h3>
        The old academic model is broken: long hours, mental exhaustion, and
        zero innovation.
      </h3>
      <p>WritePlus gives you the freedom formula: </p>
      <div className="points-cont">
        <div className="point-box">
          <img src={Check2} alt="" />
          <p>Hit deadlines with time to spare</p>
        </div>
        <div className="point-box">
          <img src={Check2} alt="" />
          <p>Impress supervisors and panels with polished, powerful work</p>
        </div>
        <div className="point-box">
          <img src={Check2} alt="" />
          <p>Get your weekends — and your peace — back</p>
        </div>
        <div className="point-box">
          <img src={Check2} alt="" />
          <p>Outperform peers who are still stuck doing it the hard way</p>
        </div>
        <div className="point-box">
          <img src={Check2} alt="" />
          <p>Start building your publishing profile the smart way</p>
        </div>
      </div>
      <p>
        Once you see what’s possible, you’ll never go back. <br />
        <span>This is your academic turning point.</span>
      </p>
    </div>
  );
};

export default Section4;
