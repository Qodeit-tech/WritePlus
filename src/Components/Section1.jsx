import React, { useState, useEffect } from "react";
import "./Section1.css";
import Cover from "../assets/ebook.png";
import Wave from "../assets/wave.png";
const Section1 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const paymentUrl = "https://www.paypal.com/ncp/payment/9S63R7ED69JQN";

  useEffect(() => {
    if (!showPopup) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showPopup]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClosePopup = () => {
    setShowConfirm(true);
  };

  const confirmClose = (shouldClose) => {
    setShowConfirm(false);
    if (shouldClose) {
      setShowPopup(false);
    }
  };

  return (
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
            Get Instant Access to WritePlus eBook Now
          </button>
        </div>
        <div className="right">
          <img src={Cover} alt="" />
        </div>
      </div>
      <img src={Wave} alt="" />
      {/* Payment Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="popup-close" onClick={handleClosePopup}>
              &times;
            </button>

            {!showConfirm ? (
              <>
                <h2>Limited Time Offer!</h2>
                <div className="price-animation">
                  <div className="original-price">$99.99</div>
                  <div className="discounted-price">$49.99</div>
                </div>
                <p className="time-left">
                  Offer expires in: <span>{formatTime(timeLeft)}</span>
                </p>
                <p className="discount-text">50% OFF - Today Only!</p>
                <button
                  className="payment-button"
                  onClick={() => window.open(paymentUrl, "_blank")}
                >
                  Get Instant Access Now
                </button>
              </>
            ) : (
              <div className="confirmation-dialog">
                <h3>Are you sure you want to leave?</h3>
                <p>This special offer won't last forever!</p>
                <div className="confirmation-buttons">
                  <button
                    className="confirm-button confirm-yes"
                    onClick={() => confirmClose(true)}
                  >
                    Yes, I'll miss out
                  </button>
                  <button
                    className="confirm-button confirm-no"
                    onClick={() => confirmClose(false)}
                  >
                    No, I want the deal!
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Section1;
