import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PaymentSuccess.css";
import Wave1 from "./assets/wave.webp";
import Wave2 from "./assets/wave-down.webp";
import Check from "./assets/check.webp";

const PaymentSuccess = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ message: "", isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const paidToken = localStorage.getItem("ebook_paid");
    if (paidToken !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus({ message: "Please enter a valid email", isError: true });
      return;
    }

    setIsLoading(true);
    setStatus({ message: "Sending your ebook...", isError: false });

    try {
      const response = await axios.post(
        "https://writeplus.in/api/send-ebook",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      if (response.data.success) {
        setStatus({
          message: "Ebook sent successfully! Check your inbox.",
          isError: false,
        });

        // Clear the token after successful use
        localStorage.removeItem("ebook_paid");
        setEmail("");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setStatus({
          message: response.data.error || "Failed to send ebook",
          isError: true,
        });
      }
    } catch (error) {
      console.error("Error sending ebook:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to connect to server";
      setStatus({ message: errorMessage, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="payment">
      <img src={Wave2} alt="" className="p-wave-up" />
      <img src={Wave1} alt="" className="p-wave-down" />
      <div className="payment-cont">
        <img src={Check} alt="" className="check" />
        <h1>Thank You for Your Purchase!</h1>
        <p className="p-text">Enter your email to receive your eBook:</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              className="input"
              id="Email"
              name="Email"
              placeholder="Enter Your Email"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus({ message: "", isError: false });
              }}
              required
            />
            <button
              className="button--submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Get My Ebook"}
            </button>
          </div>
        </form>
        {status.message && (
          <p className={status.isError ? "error-message" : "success-message"}>
            {status.message}
          </p>
        )}
      </div>
    </section>
  );
};

export default PaymentSuccess;
