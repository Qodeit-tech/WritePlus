import React from "react";
import "./Section7.css";
import WaveDown from "../assets/wave-down.png";
import Wave from "../assets/wave.png";
import Grads from "../assets/grads.png";

const Section7 = () => {
  const paymentUrl = "https://www.paypal.com/ncp/payment/9S63R7ED69JQN";

  return (
    <div className="section7">
      <img src={WaveDown} className="wave-up" alt="" />
      <img src={Wave} className="wave" alt="" />
      <div className="section7-cont">
        <img src={Grads} alt="" />
        <h1>
          Join the 5,000+ Students <br /> Who Refused to Settle for Struggle
        </h1>
        <button
          className="button"
          onClick={() => window.open(paymentUrl, "_blank")}
        >
          <span className="button__icon-wrapper">
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="button__icon-svg"
              width="15"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              ></path>
            </svg>
            <svg
              viewBox="0 0 14 15"
              fill="none"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
              className="button__icon-svg button__icon-svg--copy"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          <p>Download WritePlus eBook Now!</p>
        </button>
        <div className="content-strip">
          <p className="p-left">Transform Your Research Life in 20 Minutes</p>
          <p className="p-right">
            Limited Early Access Pricing. Don't Miss Out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section7;
