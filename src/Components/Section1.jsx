import React from "react";
import "./Section1.css";
import Cover from "../assets/ebook.png";
import Wave from "../assets/wave.png";
const Section1 = () => {
  return (
    <>
      <div className="section1">
        <div className="section1-cont">
          <div className="left">
            <h1>Master in Days What Others Struggle with for Years</h1>
            <h2> The Underground Research Method Trusted by 5,000+ Scholars</h2>
            <p>
              A hands-on eBook that unleashes the AI-powered workflows top PhD
              students use to dominate their academic careers — without burnout,
              outsourcing, or overwhelm.
            </p>
            <button href="#" className="button">
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
              Get Instant Access to WritePlus eBook Now
            </button>
          </div>
          <div className="right">
            <img src={Cover} alt="" />
          </div>
        </div>
        <img src={Wave} alt="" />
      </div>
    </>
  );
};

export default Section1;
