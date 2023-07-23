import React from "react";
import AboutWithSkills from "../components/About-with-skills";
import Footer from "../components/Footer";
import IntroTxt from "../components/Intro-txt";
import Navbar from "../components/Navbar";
import PortfolioCustomColumn from "../components/Portfolio-custom-column";
import Services4 from "../components/Services4";
import Testimonials1 from "../components/Testimonials1";
import DarkTheme from "../layouts/Dark";
import ContactSection from "../components/Contact-section";
import CallToAction from "../components/Call-to-action";

const Homepage2 = () => {
  return (
    <DarkTheme>
      <Navbar />
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
