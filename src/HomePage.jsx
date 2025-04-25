import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Nav from "./Components/Nav";
import Section1 from "./Components/Section1";
import Section2 from "./Components/Section2";
import Section3 from "./Components/Section3";
import Section4 from "./Components/Section4";
import Section5 from "./Components/Section5";
import Section6 from "./Components/Section6";
import Section7 from "./Components/Section7";
import Footer from "./Components/Footer";

const HomePage = () => {
  const [navColor, setNavColor] = useState("rgba(255, 255, 255, 0.3)");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bgColor = entry.target.getAttribute("data-bg-color");
            setNavColor(
              bgColor === "white" ? "#3848B6" : "rgba(255, 255, 255, 0.3)"
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <main>
      <Nav navColor={navColor} />
      <section data-bg-color="blue">
        <Section1 />
      </section>
      <section className="white-section" data-bg-color="white">
        <Section2 />
      </section>
      <section data-bg-color="blue">
        <Section3 />
      </section>
      <section className="white-section" data-bg-color="white">
        <Section4 />
      </section>
      <section data-bg-color="blue">
        <Section5 />
      </section>
      <section className="white-section" data-bg-color="white">
        <Section6 />
      </section>
      <section data-bg-color="blue">
        <Section7 />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
