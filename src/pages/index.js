import React, { useState } from "react";
import AboutWithSkills from "../components/About-with-skills";
import CallToAction from "../components/Call-to-action";
import ContactSection from "../components/Contact-section";
import Footer from "../components/Footer";
import IntroTxt from "../components/Intro-txt";
import Navbar from "../components/Navbar";
import PortfolioCustomColumn from "../components/Portfolio-custom-column";
import Services4 from "../components/Services4";
import Testimonials1 from "../components/Testimonials1";
import DarkTheme from "../layouts/Dark";
import LightTheme from "../layouts/Light";
const Homepage2 = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const [isDarkModa, setisDarkModa] = useState(true);

  const handleChange = () => {
    setisDarkModa(!isDarkModa); // This will toggle the value of isDarkModa
  };

  React.useEffect(() => {
    var navbar = navbarRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
  }, [navbarRef]);
  return (
    <>
      {isDarkModa ? (
        <DarkTheme>
          <Navbar nr={navbarRef} lr={logoRef} handleChange={handleChange} />
          <IntroTxt subBG />
          <PortfolioCustomColumn column={2} filterPosition="left" />
          <Services4 halfBG />
          <AboutWithSkills />
          <CallToAction />
          <Testimonials1 subBGLftstlParallaxie withBG overlay />
          <div id="contactus">
            <ContactSection />
          </div>
          <Footer />
        </DarkTheme>
      ) : (
        <LightTheme>
          <Navbar nr={navbarRef} lr={logoRef} handleChange={handleChange} />
          <IntroTxt subBG />
          <PortfolioCustomColumn column={2} filterPosition="left" />
          <Services4 halfBG />
          <AboutWithSkills />
          <CallToAction />
          <Testimonials1 subBGLftstlParallaxie withBG overlay />
          <div id="contactus">
            <ContactSection />
          </div>
          <Footer />
        </LightTheme>
      )}
      {/* // Inside your Navbar component */}
      <button onClick={handleChange}>Toggle {isDarkModa ? 'dark':'light'} Mode</button>
    </>
  );
};

export default Homepage2;
