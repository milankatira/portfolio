import React from "react";

const IntroTxt = ({subBG}) => {
  return (
    <header
      className={`freelancer ${subBG ? "sub-bg" : ""} valign bg-img parallaxie`}
      style={{ backgroundImage: "url(/img/slid/freelancer.jpg)"}}
      data-overlay-dark="4"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="cont">
              <h6>Hello, I&apos;m</h6>
              <h1>Milan katira</h1>
              <div className="main">
                <span className="main__name">
                Senior Full stack 
                </span>
              <span>
                & 
                </span>  
                <span className="main__name">
                Blockchain   
                </span>
                 {" "} developer</div>
              <div className="social-icon">

               
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
    </header>
  );
};

export default IntroTxt;
