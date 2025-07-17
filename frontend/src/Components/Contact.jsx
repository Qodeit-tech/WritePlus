import React, { useRef, useState } from "react";
import "./Contact.css";
import "./Nav";
import Nav from "./Nav";
import ContactImg from "../assets/Contact-us.png";
import emailjs from "@emailjs/browser";
import Meta from "./Meta";


const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_ctau5be", // 🔁 Replace with your EmailJS Service ID
        "template_g009duj", // 🔁 Replace with your EmailJS Template ID
        form.current,
        "BMYQR8mckwfCg9DTI" // 🔁 Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setStatus("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("FAILED...", error.text);
          setStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <>
      <Meta
        title="Contact the WritePlus Team for Support & Inquiries"
        description="Have questions about WritePlus? Reach out to our team for quick support, partnership inquiries, or feedback. We're here to help PhD & Master's students succeed."
      />
      <Nav></Nav>
      <div className="contact">
        <div className="contact-left">
          <img src={ContactImg} alt="image" />
        </div>
        <div className="contact-right">
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <label>Name</label>
            <input type="text" name="user_name" required />

            <label>Email</label>
            <input type="email" name="user_email" required />

            <label>WhatsApp Number</label>
            <input type="tel" name="user_whatsapp" required />

            <label>Country</label>
            <input type="text" name="user_country" required />

            <label>Your Query</label>
            <textarea name="message" required />

            <button type="submit" className="button">
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
              Submit
            </button>
            {status && <p className="status-message">{status}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
