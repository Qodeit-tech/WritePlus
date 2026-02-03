import React from "react";
import "./Section5.css";
import WaveDown from "../assets/wave-down.png";
import Wave from "../assets/wave.png";
import Check1 from "../assets/check1.webp";
import Img from "../assets/section5.webp";

const Section5 = () => {
  return (
    <div className="section5">
      <img src={WaveDown} className="wave-up" alt="" />
      <img src={Wave} className="wave" alt="" />
      <div className="left">
        <img src={Img} alt="" />
      </div>
      <div className="right">
        <h1>
          While Others Pay $2,000+ for Ghostwriting, You’ll Do It Better
          Yourself!
        </h1>
        <h3>
          Thousands of students are secretly paying others to write their work
          risking integrity, plagiarism, and permanent damage to their careers.
        </h3>
        <div className="section5-list">
          <div className="list-points">
            <img src={Check1} className="check" alt="" />
            <p>WritePlus is the ethical revolution.</p>
          </div>
          <div className="list-points">
            <img src={Check1} className="check" alt="" />
            <p>
              It doesn’t just make you faster — it makes you independently
              powerful.
            </p>
          </div>
          <div className="list-points">
            <img src={Check1} className="check" alt="" />
            <p>
              It gives you all the tools to do things yourself, smarter,
              cleaner, and completely in control.
            </p>
          </div>
        </div>
        <p>No shortcuts. Just pure strategic advantage.</p>
      </div>
    </div>
  );
};

export default Section5;
