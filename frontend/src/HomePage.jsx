import React, { useState, useEffect, lazy, Suspense } from "react";
import "./HomePage.css";

// Regular imports for critical components
import Nav from "./Components/Nav";
import Meta from "./Components/Meta";
// import Footer from "./Components/Footer";

// Lazy load only the heavy sections
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
  const [navColor, setNavColor] = useState("rgba(255, 255, 255, 0.3)");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section;
        }
      });

      if (currentSection) {
        const bgColor = currentSection.getAttribute("data-bg-color");
        setNavColor(
          bgColor === "white" ? "#3848B6" : "rgba(255, 255, 255, 0.3)"
        );
      }
    };

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
        <Nav navColor={navColor} />
        <Suspense fallback={<div className="section-loader" />}>
          <section data-bg-color="blue">
            <Section1 />
          </section>
          <section
            className="white-section"
            data-bg-color="white"
            id="about-us"
          >
            <Section2 />
          </section>
          <section data-bg-color="blue" id="why-us">
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
          <section data-bg-color="blue" id="quiz-section">
            <Section7 />
          </section>
          <QuizPrompt />
          <Footer />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
