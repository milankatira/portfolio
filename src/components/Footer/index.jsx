/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Formik, Form, Field } from "formik";
import appData from "../../data/app.json";

const Footer = () => {
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  const sendEmail = (ms) => new Promise((r) => setTimeout(r, ms));
  return (
    <footer className="footer-half sub-bg section-padding pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="cont">
              <div className="logo">
                <a href="#0">
                  MilanKatira
                </a>
              </div>
              <div className="con-info custom-font">
                <ul>
                  <li>
                    <span>Email : </span>milankatira26@gmail.com
                  </li>
                  <li>
                  Ahmedabad,india
                  </li>
                  <li>
                    <span>Phone : </span> (+91)  7283899803
                  </li>
                </ul>
              </div>
              <div className="social-icon">
                <div className="social">
             
                <a href="mailto:milankatira26@gmail.com" className="icon" target="_blank"  rel="noopener noreferrer">
                  <i className="fa fa-envelope"></i>
                </a> 
                <a href="https://www.linkedin.com/in/milan-katira/" className="icon" target="_blank"  rel="noopener noreferrer">
                  <i className="fab fa-linkdin"></i>
                </a>
                <a href="https://github.com/milankatira" className="icon" target="_blank"  rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://medium.com/@milankatira26" className="icon" target="_blank"  rel="noopener noreferrer">
                  <i className="fab fa-medium"></i>
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
