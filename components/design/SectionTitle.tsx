import { motion } from "framer-motion";
import React from "react";
import styles from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { TypingText } from "./TypingText";

const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div className="mt-4 flex justify-center mb-2 w-full uppercase tracking-[20px] text-gray-500 text-2xl">
      <motion.div
        variants={staggerContainer as unknown as any}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <TypingText title={text} textStyles="text-center" />
      </motion.div>
    </div>
  );
};

export default SectionTitle;
