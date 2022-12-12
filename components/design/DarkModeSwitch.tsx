import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import useSound from "use-sound";

export default function DarkModeSwitch() {

  const [ThemeSound] = useSound("/sound/switch-on.mp3");

  const { theme, setTheme } = useTheme();
  const [isOn, setIsOn] = useState(() => {

    if (typeof window !== "undefined") {

      if (theme === "dark") {

        return true;

      }
      return false;

    }

  });

  const toggleSwitch = () => {

    ThemeSound();
    setTheme(theme === "dark" ? "light" : "dark"), setIsOn(!isOn);

  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div
      onClick={toggleSwitch}
      className={`mx-4 flex-start flex h-[50px] w-[100px] rounded-[50px] bg-zinc-100 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${
        isOn && "place-content-end"
      }`}
    >
      <motion.div
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black/90"
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>
          {isOn
            ? (
                <RiSunFill className="h-6 w-6 text-yellow-300" />
              )
            : (
                <RiMoonClearFill className="h-6 w-6 text-slate-200" />
              )}
        </motion.div>
      </motion.div>
    </div>
  );

}
