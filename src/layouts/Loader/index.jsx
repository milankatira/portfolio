/* eslint-disable @next/next/no-css-tags */
import React from "react";
import Head from "next/head";
// import './loader.module.css';
const WithLoader = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/loader.module.css" />
      </Head>
      {children}
    </>
  );
};

export default WithLoader;
