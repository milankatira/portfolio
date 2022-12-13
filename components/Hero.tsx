import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import BackgroundCircle from "./design/BackgroundCircle";
import SectionTitle from "./design/SectionTitle";

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
        src="https://cdn.tailgrids.com/1.0/assets/images/services/image-3.jpg"
        alt=""
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
      />
      <div className="z-20">
        <SectionTitle text="software engineer" />

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
    </motion.div>
  );

}
