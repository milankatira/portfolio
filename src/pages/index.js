import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import DarkTheme from "../layouts/Dark";
import axiosInstance from "../utils/axiosInstance";

const Navbar = dynamic(() => import("../components/Navbar"));
const IntroTxt = dynamic(() => import("../components/Intro-txt"));
const PortfolioCustomColumn = dynamic(() =>
  import("../components/Portfolio-custom-column")
);
const Services4 = dynamic(() => import("../components/Services4"));
const AboutWithSkills = dynamic(() =>
  import("../components/About-with-skills")
);
const Blog = dynamic(() => import("../components/blog"));
const CallToAction = dynamic(() => import("../components/Call-to-action"));
const Testimonials1 = dynamic(() => import("../components/Testimonials1"));
const ContactSection = dynamic(() => import("../components/Contact-section"));
const Footer = dynamic(() => import("../components/Footer"));

const Homepage2 = ({ blogs }) => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (window.pageYOffset > 300) {
        navbar?.classList.add("nav-scroll");
      } else {
        navbar?.classList.remove("nav-scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarRef]);

  return (
    <DarkTheme>
      {/* <Navbar nr={navbarRef} lr={logoRef} /> */}
      <IntroTxt subBG />
      <PortfolioCustomColumn column={2} filterPosition="left" />

      <Services4 halfBG />
      <AboutWithSkills />
      <Blog blogs={blogs} />
      <CallToAction />
      <Testimonials1 subBGLftstlParallaxie withBG overlay />
      <div id="contactus">
        <ContactSection />
      </div>
      {/* <Footer /> */}
    </DarkTheme>
  );
};

export default Homepage2;


export async function getServerSideProps() {
  try {
    const response = await axiosInstance.get("/blog"); // Replace with your actual API endpoint
    const blogs = response.data; // Assuming your API returns an array of blog objects

    return {
      props: {
        blogs,
      },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return {
      props: {
        blogs: [],
      },
    };
  }
}