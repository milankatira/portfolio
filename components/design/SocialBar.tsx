import { motion } from "framer-motion";
import { Key } from "react";
import { SocialIcon } from "react-social-icons";
import { PersonalData } from "../../constant/PersonalData";

const style = {
  wrapper: `fixed hidden sm:block right-4 bottom-4 z-30`,
  iconsContainer: `flex flex-col justify-center items-center p-2 dark:bg-gray-900 bg-gray-100 rounded-lg transition-all duration-700`,
  line: `h-20 md:h-32 mt-2 w-1/12 bg-gray-400 dark:bg-gray-500`,
};

const SocialBar = () => {

  return (
    <div className={style.wrapper}>
      <motion.div
        initial={{
          y: 200,
          opacity: 0,
          scale: 1,
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className={style.iconsContainer}
      >
        <svg className="h-8 w-8 fill-current text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
        </svg>
      </motion.div>
    </div>
  );

};
export default SocialBar;
