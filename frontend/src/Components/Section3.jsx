import React from "react";
import "./Section3.css";
import Wave from "../assets/wave.webp";
import WaveDown from "../assets/wave-down.webp";
import Img from "../assets/section3-2.webp";

const Section3 = () => {
  return (
    <div className="section3">
      <img src={Wave} className="wave-up" alt="" />
      <img src={WaveDown} className="wave-down" alt="" />
      <h1>They’ll Wonder How You Got So Fast, So Smart, So Suddenly!</h1>
      <div className="section3-cont">
        <div className="left">
          <h2>Inside this short, high-impact guide, you’ll learn</h2>
          <div className="list-cont">
            <div className="list list-1">
              <span>1</span>
              <p>
                How to write chapters and full dissertations in days using
                AI-first thinking
              </p>
            </div>
            <div className="list list-2">
              <span>2</span>
              <p>
                How to discover unique research gaps in minutes (instead of
                weeks)
              </p>
            </div>
            <div className="list list-3">
              <span>3</span>
              <p>
                Instant literature reviews with next-gen tools nobody teaches in
                academia
              </p>
            </div>
            <div className="list list-4">
              <span>4</span>
              <p>
                Automated referencing and research organization using secret
                software stacks
              </p>
            </div>
            <div className="list list-5">
              <span>5</span>
              <p>
                The real reason 90% of students burn out — and how to avoid it
                forever
              </p>
            </div>
            <div className="list list-6">
              <span>6</span>
              <p>
                How to ethically take control of your academic future without
                outsourcing your soul
              </p>
            </div>
          </div>
          <p>
            This isn’t theory. It’s
            <span> applied, repeatable, ethical, and proven.</span>
          </p>
        </div>
        <div className="right">
          <img src={Img} />
        </div>
      </div>
    </div>
  );
};

export default Section3;
