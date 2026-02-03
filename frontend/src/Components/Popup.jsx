import { useState, useEffect } from "react";
import "./Popup.css";
import { useNavigate } from "react-router-dom";

const Popup = ({ onClose, initialTime = 30 * 60 }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPayPalVisible, setIsPayPalVisible] = useState(false);
  const [paypalRendered, setPaypalRendered] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClosePopup = () => setShowConfirm(true);

  const confirmClose = (shouldClose) => {
    setShowConfirm(false);
    if (shouldClose) {
      onClose();
      setPaypalRendered(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveFormDataToBackend = async () => {
    try {
      setIsSubmitting(true);

      // Send form data to your backend API
      const response = await fetch("https://www.writeplus.in/api/save-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save data");
      }

      console.log("✅ Form data saved successfully:", data);
      return data;
    } catch (error) {
      console.error("❌ Error saving form data:", error);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.whatsapp.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    await saveFormDataToBackend();

    setStep(3);
    setIsPayPalVisible(true);
  };

  useEffect(() => {
    if (!isPayPalVisible || paypalRendered) return;

    const renderButton = () => {
      const container = document.getElementById(
        "js-sdk-container-XB23HAYHKCDBG",
      );
      if (!container || !window.paypal) return;

      container.innerHTML = "";

      window.paypal
        .HostedButtons({
          hostedButtonId: "XB23HAYHKCDBG",
          onApprove: async (data, actions) => {
            await actions.order.capture();
            localStorage.setItem("ebook_paid", "true");
            navigate("/payment-success");
          },
        })
        .render(`#js-sdk-container-XB23HAYHKCDBG`);

      setPaypalRendered(true);
    };

    const existingScript = document.getElementById("paypal-sdk");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAABgtWBIGjoZSIC9TQAa0gsEMaVjI4_K3ZVrJYAmyHkNa0iqnW-Zt8-X5V7CgOr-6GOJ4qS7AvqGNW9Dc&components=hosted-buttons&currency=USD";
      script.id = "paypal-sdk";
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      renderButton();
    }
  }, [isPayPalVisible, paypalRendered, navigate]);

  return (
    <div className="popup-overlay">
      <div className={`popup-container ${step === 3 ? "step-3-active" : ""}`}>
        <button className="popup-close" onClick={handleClosePopup}>
          ×
        </button>

        <div className="progress-steps">
          <div className={`step-indicator ${step >= 1 ? "active" : ""}`}>
            <div className="step-number">1</div>
            <div className="step-label">Offer</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step-indicator ${step >= 2 ? "active" : ""}`}>
            <div className="step-number">2</div>
            <div className="step-label">Details</div>
          </div>
          <div className="step-connector"></div>
          <div className={`step-indicator ${step >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <div className="step-label">Payment</div>
          </div>
        </div>

        {!showConfirm ? (
          <div className={`popup-body ${step === 3 ? "scrollable" : ""}`}>
            {step === 1 && (
              <>
                <div className="popup-header">
                  <div className="urgency-badge">🔥 LIMITED TIME OFFER</div>
                  <h2>Get WritePlus at 50% OFF!</h2>
                  <p className="popup-subtitle">
                    Master academic writing in half the time
                  </p>
                </div>

                <div className="price-animation">
                  <div className="original-price">$99.99</div>
                  <div className="discounted-price">$49.99</div>
                </div>

                <div className="timer-container">
                  <p className="time-left">
                    ⏳ Offer expires in: <span>{formatTime(timeLeft)}</span>
                  </p>
                  <div className="discount-text">50% OFF - Today Only!</div>
                </div>

                <div className="trust-section">
                  <div className="trust-row">
                    <span className="trust-item">🔒 Secure Payment</span>
                    <span className="trust-item">⭐ 4.9/5 Rating</span>
                    <span className="trust-item">⚡ Instant Access</span>
                  </div>
                </div>

                <div className="popup-cta-section">
                  <button className="payment-button" onClick={() => setStep(2)}>
                    Get Instant Access Now
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="popup-header">
                  <h2>Complete Your Order</h2>
                  <p className="popup-subtitle">
                    Please provide your details to continue
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="user-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>WhatsApp Number *</label>
                    <input
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      placeholder="+1 234 567 8900"
                    />
                    <small className="form-note">
                      For order updates and support
                    </small>
                  </div>

                  <div className="form-buttons">
                    <button
                      type="button"
                      className="back-button"
                      onClick={() => setStep(1)}
                      disabled={isSubmitting}
                    >
                      Back to Offer
                    </button>
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Continue to Payment"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <div className="popup-header">
                  <h2>Secure Payment</h2>
                  <p className="popup-subtitle">
                    Complete your purchase with PayPal
                  </p>
                </div>

                <div className="order-summary">
                  <div className="summary-header">Order Summary</div>
                  <div className="summary-row">
                    <span>WritePlus eBook</span>
                    <span>$49.99</span>
                  </div>
                  <div className="summary-row discount">
                    <span>50% Discount</span>
                    <span>-$50.00</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>$49.99</span>
                  </div>
                </div>

                <div className="paypal-section">
                  <div id="js-sdk-container-XB23HAYHKCDBG"></div>
                </div>

                <div className="payment-security">
                  <span className="security-icon">🔒</span>
                  <span>256-bit SSL encryption • No credit card required</span>
                </div>
                <button
                  className="skip-button back-to-form"
                  onClick={() => setStep(2)}
                >
                  ← Back to edit details
                </button>
              </>
            )}
          </div>
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
  );
};

export default Popup;
