import React, { useState } from "react";
import "./Nav.css";
import { useNavigate, useLocation } from "react-router-dom";

const Nav = ({ navColor, navTextColor, navLogo }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handleNavigation = (href, e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
    } else if (href.startsWith("#")) {
      const hash = href.substring(1);

      if (location.pathname === "/") {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  return (
    <>
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <nav
        style={{
          background: navColor,
          "--nav-text-color": navTextColor,
        }}
      >
        <div className="logo" onClick={() => navigate("/")}>
          <img src={navLogo} alt="Logo" />
        </div>

        <div className={`links ${menuOpen ? "mobile-open" : ""}`}>
          <a href="/" onClick={(e) => handleNavigation("/", e)}>
            Home
          </a>
          <a href="#about-us" onClick={(e) => handleNavigation("#about-us", e)}>
            About Us
          </a>
          <a href="#why-us" onClick={(e) => handleNavigation("#why-us", e)}>
            Why Us
          </a>
          <a href="/contact" onClick={(e) => handleNavigation("/contact", e)}>
            Contact Us
          </a>
          <a href="/quiz" onClick={(e) => handleNavigation("/quiz", e)}>
            Take Quiz
          </a>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>
    </>
  );
};

export default Nav;
