import React, { useState } from "react";
import "./PaymentSuccess.css";
import Wave1 from "./assets/wave.png";
import Wave2 from "./assets/wave-down.png";
import Check from "./assets/check.png";

const PaymentSuccess = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:5005/api/send-ebook", { email });
      setStatus("Ebook sent successfully! Check your inbox.");
    } catch (error) {
      setStatus("Failed to send ebook. Please try again.");
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className="button--submit" value="Subscribe" type="submit" />
          </div>
        </form>
        <p>{status}</p>
      </div>
    </section>
  );
};

export default PaymentSuccess;
