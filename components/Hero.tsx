import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import BackgroundCircle from "./design/BackgroundCircle";

export default function Hero() {

  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden"
    >
      <BackgroundCircle />

      <motion.img
        transition={{
          duration: 2.5,
        }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0, scale: 1 }}
        whileInView={{ opacity: 1, scale: 1.2 }}
        src="/img/profile.jpeg"
        alt="profile"
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
      />
      <div className="z-20">
        <h1 className="uppercase tracking-[20px] text-gray-500 text-2xl">software engineer</h1>
        <div className="pt-5 flex flex-wrap justify-center flex-col sm:flex-row">
          <Link href="#about">
            <button className="heroButton w-36">About</button>
          </Link>
          <Link href="#experiance">
            <button className="heroButton w-36">Experiance</button>
          </Link>
          <Link href="#skills">
            <button className="heroButton w-36">Skills</button>
          </Link>
          <Link href="#project">
            <button className="heroButton w-36">Projects</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );

}
