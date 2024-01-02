import React from "react";
import AboutWithSkills from "../components/About-with-skills";
import CallToAction from "../components/Call-to-action";
import ContactSection from "../components/Contact-section";
import Footer from "../components/Footer";
import IntroTxt from "../components/Intro-txt";
import Navbar from "../components/Navbar";
import PortfolioCustomColumn from "../components/Portfolio-custom-column";
import Services4 from "../components/Services4";
import Testimonials1 from "../components/Testimonials1";
import LightTheme from "../layouts/Light";
import DarkTheme from '../layouts/Dark';
const Homepage2 = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

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
    <DarkTheme>
      <Navbar nr={navbarRef} lr={logoRef} />
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
  );
};

export default Homepage2;
