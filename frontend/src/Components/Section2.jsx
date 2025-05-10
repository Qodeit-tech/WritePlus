import React from "react";
import "./Section2.css";
import Speed from "../assets/performance.png";
import Trust from "../assets/trust.png";
import Scientific from "../assets/scientific.png";
import WaveDown from "../assets/wave-down.png";
import Img from "../assets/section2.png"

const Section2 = () => {
  return (
    <div className="section2">
      <div className="left">
        <img src={Img} alt="" />
      </div>
      <div className="right">
        <h1>What If 3 Years of Academic Work Could Be Done in Just 3 Weeks?</h1>
        <h3>
          Transform your research game with a proven system used by 5,000+
          scholars worldwide.
        </h3>
        <p>
          Welcome to WritePlus, the ultimate research execution tool for
          ambitious Master's and PhD students. Forget endless hours of trial and
          error—WritePlus is your shortcut to smarter, faster, and more
          impactful research.
        </p>
        <div className="right-points">
          <div className="point-box">
            <img src={Speed} alt="" />
            <h4>Engineered for Speed</h4>
            <p>
              WritePlus shrinks years of academic work into just weeks by
              streamlining every step of the process.
            </p>
          </div>
          <div className="point-box">
            <img src={Trust} alt="" />
            <h4>Globally Trusted</h4>
            <p>
              Used by scholars in 32 countries, this tool is tailored to help
              you tackle research like never before.
            </p>
          </div>
          <div className="point-box">
            <img src={Scientific} alt="" />
            <h4>Scientifically Backed</h4>
            <p>
              With cutting-edge systems and time-tested workflows, WritePlus
              brings top-tier research strategies to your fingertips.
            </p>
          </div>
        </div>
      </div>
      <img src={WaveDown} alt="" />
    </div>
  );
};

export default Section2;
