import React from "react";
import "./Nav.css";
import Logo from "../assets/logo.png";

const Nav = ({ navColor }) => {
  return (
    <nav style={{ background: navColor, transition: "background 0.3s ease" }}>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="links">
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
      </div>
    </nav>
  );
};

export default Nav;
