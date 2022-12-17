import { motion } from "framer-motion";
import { Key } from "react";
import { SocialIcon } from "react-social-icons";
import { PersonalData } from "../../constant/PersonalData";

const style = {
  wrapper: `fixed hidden sm:block left-3 bottom-0 z-30`,
  iconsContainer: `flex flex-col justify-center items-center`,
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
        <div className={style.iconsContainer}>
          {PersonalData.socialMedia.map((item: string | undefined, id: Key | null | undefined) => {

            return <SocialIcon className="hover:scale-125 transition-all duration-700" fgColor="gray" bgColor="transparent" url={item} key={id} />;

          })}
          <div className={style.line} />
        </div>
      </motion.div>
    </div>
  );

};
export default SocialBar;
