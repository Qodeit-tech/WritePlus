import React, { useState } from "react";
import "./Nav.css";
import Logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";

const Nav = ({ navColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
    setMenuOpen(false); // close menu if open
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll to top
  };

  return (
    <>
      <nav style={{ background: navColor, transition: "background 0.3s ease" }}>
        <div className="logo" onClick={handleLogoClick}>
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`links ${menuOpen ? "mobile-open" : ""}`}>
          <a href="/">Home</a>
          <a href="#about-us">About Us</a>
          <a href="#why-us">Why Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/quiz">Take Quiz</a>
        </div>
        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className="menu-icon">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </nav>
    </>
  );
};

export default Nav;
