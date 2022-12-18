/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import dynamic from "next/dynamic";
import ContactUs from "../components/ContactUs";
import Experiance from "../components/Experiance";
import Hero from "../components/Hero";
import Project from "../components/Project";
import Skills from "../components/Skills";
import Navbar from "../layouts/Navbar";
import SocialBar from "../components/design/SocialBar";
import MyProject from "../components/MyProject";

const Abouts = dynamic(() => import("../components/Abouts"), {
  ssr: false,
});

const Portfolio = dynamic(() => import("../components/Portfolio"), {
  ssr: false,
});
export default function Home() {

  return (
    <div className="transition-all duration-700 bg-white dark:bg-[#0e1017] h-screen snap-y snap-mandatory overflow-scroll overflow-x-hidden">
      <Head>
        <title>Milan katira</title>
        <meta name="description" content="Milan katira portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <script type="text/javascript" src="/js/medium.js" />
      </Head>

      <main className="transition-all duration-300">
        <SocialBar />
        <Navbar />
        <section className="snap-center">
          <Hero />
        </section>
        <section className="snap-center" id="about">
          <Abouts />
        </section>
        <section className="snap-center" id="experiance">
          <Experiance />
        </section>
        <section className="snap-start lg:snap-center">
          <Portfolio />
        </section>
        <section id="skills" className="snap-start">
          <Skills />
        </section>
        <section id="project" className="snap-start">
          <MyProject />
        </section>
        <section className="snap-center">
          <ContactUs />
        </section>
      </main>
    </div>
  );

}
