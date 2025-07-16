import React, { useState, useEffect } from "react";
import "./Section6.css";
import Student from "../assets/section6-boy.webp";
import Unlock from "../assets/unlocking.webp";
import Career from "../assets/career.webp";
import Pressure from "../assets/pressure.webp";
import Know from "../assets/know.webp";
import { useNavigate } from "react-router-dom";

const Section6 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isPayPalVisible, setIsPayPalVisible] = useState(false);
  const [paypalRendered, setPaypalRendered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showPopup) return;

    setTimeLeft(30 * 60); // Reset countdown
    setIsPayPalVisible(false); // Hide PayPal on popup reopen
    setPaypalRendered(false); // Allow PayPal button re-render

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
      setPaypalRendered(false);
    }
  };

  useEffect(() => {
    if (!isPayPalVisible || paypalRendered) return;

    const containerId = "js-sdk-container-XB23HAYHKCDBG";

    const renderButton = () => {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error("PayPal container not found:", containerId);
        return;
      }

      container.innerHTML = ""; // Cleanup before rendering

      if (window.paypal) {
        window.paypal
          .HostedButtons({
            hostedButtonId: "XB23HAYHKCDBG",
            onApprove: async (data, actions) => {
              try {
                const order = await actions.order.capture();
                console.log("Transaction completed:", order);
                localStorage.setItem("ebook_paid", "true");
                navigate("/payment-success");
              } catch (err) {
                console.error("Payment error:", err);
                alert(
                  "Something went wrong after payment. Please contact support."
                );
              }
            },
          })
          .render(`#${containerId}`);
        setPaypalRendered(true);
      } else {
        console.error("PayPal SDK not available.");
      }
    };

    const existingScript = document.getElementById("paypal-sdk");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAABgtWBIGjoZSIC9TQAa0gsEMaVjI4_K3ZVrJYAmyHkNa0iqnW-Zt8-X5V7CgOr-6GOJ4qS7AvqGNW9Dc&components=hosted-buttons&disable-funding=venmo&currency=USD";
      script.id = "paypal-sdk";
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      renderButton();
    }
  }, [isPayPalVisible, paypalRendered, navigate]);

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
                {!isPayPalVisible && (
                  <button
                    className="payment-button"
                    onClick={() => setIsPayPalVisible(true)}
                  >
                    Get Instant Access Now
                  </button>
                )}
                {isPayPalVisible && (
                  <div className="paypal-hosted-button">
                    <div id="js-sdk-container-XB23HAYHKCDBG"></div>
                  </div>
                )}
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

export default Section6;
