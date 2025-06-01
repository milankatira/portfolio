"use client";

import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function CopyButton({ textToCopy }) {
  const [onCopy, setOnCopy] = useState(false);
  const [onSuccess, setSuccess] = useState(false);

  const handleCopy = async () => {
    try {
   
      await navigator.clipboard.writeText(textToCopy);
      setOnCopy(true);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setOnCopy(false);
      }, 800);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div
      className="hover:scale-105 relative hover:bg-zinc-700 p-2 rounded-md cursor-pointer"
      onClick={handleCopy}
    >

        {onSuccess ? (
          <IoCheckmarkOutline
            style={{
              cursor: "pointer",
              transition: "all",

              width: "20px",
              height: "20px",
              // marginLeft: "30px",
              color: onSuccess ? "#00C853" : "transparent",
              transform: onSuccess ? "scale(1)" : "scale(0)",
            }}
            onTransitionEnd={() => {
              setTimeout(() => {
                setSuccess(false);
                setOnCopy(false);
              }, 800);
            }}
          />
        ) : (
          <BsCopy
            style={{
              cursor: "pointer",
              transition: "all",
              width: "20px",
              height: "20px",
              transform: onSuccess ? "scale(0)" : "scale(1)",
            }}
            onTransitionEnd={() => {
              if (onCopy) {
                setSuccess(true);
              }
            }}
          />
        )}

    </div>
  );
}
