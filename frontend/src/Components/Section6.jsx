import { useState, useEffect } from "react";
import "./Section6.css";
import Student from "../assets/section6-boy.webp";
import Unlock from "../assets/unlocking.webp";
import Career from "../assets/career.webp";
import Pressure from "../assets/pressure.webp";
import Popup from "./Popup";
import Know from "../assets/know.webp";

const Section6 = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="section6">
      <h1>If You Ignore This, You’ll Regret It. Probably Forever!</h1>
      <div className="section6-cont">
        <div className="cont-box1">
          <div className="box1-left">
            <div className="left-list">
              <img src={Unlock} alt="" />
              <p>
                Every single day, your competitors are unlocking these
                workflows.
              </p>
            </div>
            <div className="left-list">
              <img src={Career} alt="" />
              <p>
                They’re finishing faster. Publishing more. Impressing advisors.
                Winning funding.
              </p>
            </div>
            <div className="left-list">
              <img src={Pressure} alt="" />
              <p>
                And you’re still stuck in outdated, stressful academic cycles.
              </p>
            </div>
          </div>
          <div className="box1-right">
            <img src={Student} alt="" />
          </div>
        </div>
        <div className="cont-box2">
          <div className="fact-box">
            <img src={Know} alt="" />
            <p>
              91% of graduate students who ignore modern research tools report
              high anxiety, late submissions, and poor academic outcomes.
            </p>
          </div>
        </div>
        <div className="cont-box3">
          <div className="box3-left">
            <p className="p-up">What happens if you wait?</p>
            <p className="p-down">
              You fall behind. You burn out. You give up.
            </p>
          </div>
          <div className="box3-right">
            <button className="button" onClick={() => setShowPopup(true)}>
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
              Get It Now!
            </button>
            <p>Your future depends on this one shift. Don’t miss it.</p>
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} initialTime={30 * 60} />
      )}
    </div>
  );
};

export default Section6;
