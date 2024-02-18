/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { handleMobileDropdown, handleSearch } from "../../common/navbar";

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
        <Link legacyBehavior href="/">
          <a className="logo">MilanKatira</a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMobileDropdown}
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link legacyBehavior href="/blog">
                <a className="nav-link">blog</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link legacyBehavior href="/#about">
                <a className="nav-link">About</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link legacyBehavior href="/#portfolio">
                <a className="nav-link">portfolio</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link legacyBehavior href="/#contact">
                <a className="nav-link">Contact</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
