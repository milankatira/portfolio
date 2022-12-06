import { motion } from "framer-motion";
import { SocialIcon } from "react-social-icons";
import { socials } from "../constant";

import styles from "../styles";
import { footerVariants } from "../utils/motion";

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative bg-white dark:bg-black overflow-hidden`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-black dark:bg-white" />

        <div className="flex items-center justify-between">
          <div>
            <span className="font-extrabold text-[30px] text-purple-700 dark:text-white">
              M
            </span>
            <span className="font-extrabold text-[24px] text-black dark:text-white">
              ILAN KATIRA
            </span>
          </div>
          <p className="font-normal text-[14px] text-black dark:text-white opacity-50">
            Copyright © 2021 - 2022 Metaversus. All rights reserved.
          </p>

          <div className="flex gap-4">
            <SocialIcon
              url="https://github.com/milankatira"
              fgColor="gray"
              bgColor="transparent"
            />
            <SocialIcon
              url="https://www.linkedin.com/in/milan-katira/"
              fgColor="gray"
              bgColor="transparent"
            />{" "}
            <SocialIcon
              url="https://medium.com/@milankatira26"
              fgColor="gray"
              bgColor="transparent"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
