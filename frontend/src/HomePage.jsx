import React, { useState, useEffect, lazy, Suspense } from "react";
import "./HomePage.css";
import Nav from "./Components/Nav";
import Meta from "./Components/Meta";
import LogoWhite from "./assets/logo-white.png";
import LogoBlue from "./assets/logo-blue.png";

const Section1 = lazy(() => import("./Components/Section1"));
const Section2 = lazy(() => import("./Components/Section2"));
const Section3 = lazy(() => import("./Components/Section3"));
const Section4 = lazy(() => import("./Components/Section4"));
const Section5 = lazy(() => import("./Components/Section5"));
const Section6 = lazy(() => import("./Components/Section6"));
const Section7 = lazy(() => import("./Components/Section7"));
const QuizPrompt = lazy(() => import("./Components/QuizPrompt"));
const Footer = lazy(() => import("./Components/Footer"));

const HomePage = () => {
  const [navColor, setNavColor] = useState("#F5F5F3");
  const [navTextColor, setNavTextColor] = useState("#3848B6");
  const [navLogo, setNavLogo] = useState(LogoBlue);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let activeSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          activeSection = section;
        }
      });

      if (!activeSection) return;

      const bg = activeSection.getAttribute("data-bg-color");

      if (bg === "white") {
        setNavColor("#3848B6");
        setNavTextColor("#F5F5F3 ");
        setNavLogo(LogoWhite);
      }

      if (bg === "blue") {
        setNavColor("#F5F5F3 ");
        setNavTextColor("#3848B6");
        setNavLogo(LogoBlue);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Meta
        title="AI Research eBook for PhD & Master's | WritePlus"
        description="Download the AI-powered WritePlus eBook trusted by 5,000+ scholars. Finish thesis, research, and papers faster—without burnout or outsourcing."
      />

      <main>
        <Nav
          navColor={navColor}
          navTextColor={navTextColor}
          navLogo={navLogo}
        />

        <Suspense fallback={<div className="section-loader" />}>
          <section data-bg-color="blue">
            <Section1 />
          </section>

          <section data-bg-color="white" id="about-us">
            <Section2 />
          </section>

          <section data-bg-color="blue" id="why-us">
            <Section3 />
          </section>

          <section data-bg-color="white">
            <Section4 />
          </section>

          <section data-bg-color="blue">
            <Section5 />
          </section>

          <section data-bg-color="white">
            <Section6 />
          </section>

          <section data-bg-color="blue" id="quiz-section">
            <Section7 />
          </section>

          <QuizPrompt />
          <section data-bg-color="white">
            <Footer />
          </section>
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
