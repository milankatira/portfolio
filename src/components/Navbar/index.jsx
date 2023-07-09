/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {
  handleSearch,
} from "../../common/navbar";

const Navbar = ({ lr, nr, theme }) => {
  React.useEffect(() => {
    handleSearch();
  }, []);
  return (
    <nav
      ref={nr}
      className={`navbar navbar-expand-lg change ${
        theme === "themeL" ? "light" : ""
      }`}
    >
      <div className="container">
        <Link href="/">
          <a className="logo">
            MilanKatira
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
