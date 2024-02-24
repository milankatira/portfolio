import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import React, { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";
import LoadingScreen from "../components/Loading-Screen";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/Scroll-to-top";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
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
    <>
      <NextNProgress
        options={{ easing: "ease", speed: 500, showSpinner: false }}
        color="#75dab4"
      />
      <Head>
        <title>Milan katira </title>
      </Head>
      <Toaster />
      <Cursor />
      <LoadingScreen />
      <ScrollToTop />
      <Analytics />
      <SpeedInsights />
      <Navbar nr={navbarRef} lr={logoRef} />
      <Component {...pageProps} />
      <Footer />

      <Script rel="prefetch" id="wow" src="/js/wow.min.js"></Script>
      <Script
        strategy="beforeInteractive"
        id="splitting"
        rel="prefetch"
        src="/js/splitting.min.js"
      ></Script>
      {/* <Script id="simpleParallax" src="/js/simpleParallax.min.js"></Script> */}
      <Script
        id="isotope"
        rel="prefetch"
        strategy="beforeInteractive"
        src="/js/isotope.pkgd.min.js"
      ></Script>
      <Script
        id="initWow"
        rel="prefetch"
        strategy="lazyOnload"
      >{`new WOW().init();`}</Script>
    </>
  );
}

export default MyApp;
