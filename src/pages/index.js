import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import WithLoader from "../layouts/Loader";
import axiosInstance from "../utils/axiosInstance";
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

const Homepage2 = ({ blogs }) => {
  const navbarRef = useRef(null);

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
    <>
      <WithLoader>
        <IntroTxt subBG />
      </WithLoader>
      <PortfolioCustomColumn column={2} filterPosition="left" />

      <Services4 halfBG />
      <AboutWithSkills />
      <Blog blogs={blogs} />
      <CallToAction />
      <Testimonials1 subBGLftstlParallaxie withBG overlay />
      <div id="contactus">
        <ContactSection />
      </div>
    </>
  );
};

export default Homepage2;

export async function getStaticProps() {
  try {
    const response = await axiosInstance.get("/blog");
    const blogs = response.data;
    return {
      props: {
        blogs,
      },
      revalidate: 10, // Revalidate at most once every 10 seconds
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