import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircle from "./design/BackgroundCircle";

export default function Hero() {

  const [text, count] = useTypewriter({
    words: ["Developer", "Designer", "creator"],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircle />

      <motion.img
        // initial={{
        //   x: 500,
        //   opacity: 0,
        // }}
        // whileInView={{
        //   x: 0,
        //   opacity: 1,
        // }}
        transition={{
          duration: 2.5,
        }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0, scale: 1 }}
        whileInView={{ opacity: 1, scale: 1.2 }}
        src="https://cdn.tailgrids.com/1.0/assets/images/services/image-3.jpg"
        alt=""
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
      />
      {/* <img
        src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        alt="FF"
      /> */}
      <div className="z-20">
        <h2 className="uppercase text-gray-500 text-sm pb-2 tracking-[15px]">Software Engineer</h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>
          <Link href="#experiance">
            <button className="heroButton">Experiance</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="#project">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );

}
