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
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="author" href="https://milankatira.vercel.app/" />
        <meta name="author" content="Milan katira" />
        <meta
          property="article:author"
          content="https://milankatira.vercel.app/"
        />
        <meta name="author" content="Milan katira" />
        <meta name="author_url" content="https://milankatira.vercel.app/" />
        <link rel="author" href="https://milankatira.vercel.app/" />

        <meta
          property="og:article:author"
          content="https://milankatira.vercel.app/"
        />
        <meta property="og:article:author:name" content="Milan katira" />

        <meta
          name="keywords"
          content="milan katira,milan katira portfolio,nextjs,react,typescript,tailwindcss,express,nodejs,mongodb,mysql,javascript,docker,github,Milan katira,kubernetes,solidity developer"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://milankatira.vercel.app/`}
        />
        <link
          rel="alternate"
          hrefLang="en-US"
          href="https://milankatira.vercel.app"
        />
        <meta property="og:title" content="milan katira" />
        <meta property="og:description" content="milan katira portfolio" />
        <meta
          property="og:url"
          content={`https://milankatira.vercel.app`}
        />
        <meta property="og:site_name" content="Milan katira" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@milankatira26" />
        <meta name="next-size-adjust" />
        <meta name="googlebot" content="index, follow" />
      </Head>
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
        strategy="beforeInteractive"
        id="initWow"
        rel="prefetch"
      >{`new WOW().init();`}</Script>
    </>
  );
}

export default MyApp;
