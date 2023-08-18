import React from "react";
import Head from "next/head";
import Script from "next/script";
import Cursor from "../components/Cursor";
import ScrollToTop from "../components/Scroll-to-top";
import LoadingScreen from "../components/Loading-Screen";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Milan katira </title>
      </Head>
      <Toaster />
      <Cursor />
      <LoadingScreen />
      <ScrollToTop />
      <Analytics />
      <Component {...pageProps} />

      <Script rel="prefetch" id="wow" src="/js/wow.min.js"></Script>
      <Script
        strategy="beforeInteractive"
        id="splitting"
        rel="prefetch"
        src="/js/splitting.min.js"
      ></Script>
      <Script id="simpleParallax" src="/js/simpleParallax.min.js"></Script>
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
