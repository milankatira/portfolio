/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import React from "react";

const LightTheme = ({ children }) => {
//   React.useEffect(() => {
//     document.querySelector("body").classList.add("bd-dark");
//     return () => {
//       document.querySelector("body").classList.remove("bd-dark");
//     };
//   });

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/dark.css" />
      </Head>
      {children}
    </>
  );
};

export default LightTheme;
