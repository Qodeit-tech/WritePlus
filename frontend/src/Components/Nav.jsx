import React, { useState } from "react";
import "./Nav.css";
import Logo from "../assets/logo.webp";

const Nav = ({ navColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav style={{ background: navColor, transition: "background 0.3s ease" }}>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className={`links ${menuOpen ? "mobile-open" : ""}`}>
          <a href="">Home</a>
          <a href="#about-us">About Us</a>
          <a href="#why-us">Why Us</a>
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
