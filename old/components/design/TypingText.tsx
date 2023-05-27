import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../../utils/motion";

export function TypingText({ title, textStyles }: { title: string; textStyles: string }) {

  return (
    <motion.p variants={textContainer} className={`font-normal text-[14px] text-secondary-white ${textStyles}`}>
      {Array.from(title).map((letter, index) => (
        <motion.span variants={textVariant2} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.p>
  );

}

export function TitleText({ title, textStyles }: { title: string; textStyles: string }) {

  return (
    <motion.h2
      variants={textVariant2}
      initial="hidden"
      whileInView="show"
      className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
    >
      {title}
    </motion.h2>
  );

}
