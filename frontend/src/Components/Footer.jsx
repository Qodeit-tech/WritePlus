import React from "react";
import "./Footer.css";
import Logo from "../assets/logo.webp";
import Facebook from "../assets/facebook.webp";
import Linkedin from "../assets/linkedin.webp";

const Footer = () => {
  return (
    <footer>
      <div className="left">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <p>
          <b>WritePlus:</b> The AI-powered eBook that transforms research for
          Master's and PhD students. Trusted by 5,000+ scholars worldwide, it’s
          your shortcut to faster, smarter, and stress-free academic success.
        </p>
      </div>
      <div className="right">
        <div className="right-box">
          <h3>Navigation</h3>
          <a href="/">Home</a>
          <a href="#about-us">About Us</a>
          <a href="#why-us">Why Us</a>
          <a href="/quiz">Play Our Quiz</a>
        </div>
        <div className="right-box2">
          <h3>Follow Us On</h3>
          <a href="">
            <img src={Facebook} alt="" />
          </a>
          <a href="">
            <img src={Linkedin} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
