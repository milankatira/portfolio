import React from "react";
import heroSkillsProgress from "../../common/heroSkillsProgress";

const AboutWithSkills = () => {
  React.useEffect(() => {
    heroSkillsProgress();
  }, []);
  return (
    <div className="hero-sec section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="cont">
              <div className="sub-title">
                <h6>About Me</h6>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <h3 className="main-title wow" data-splitting>
                My mission is design develop the best Websites around.
              </h3>
              <p className="wow fadeInUp" data-wow-delay=".5s">
                Hello! I’m Milan Katira. Web designer from Ahmedabad, india.
                With extensive experience in website development and a passion for creating innovative digital solutions, I am dedicated to building websites that are not only functional, but also visually striking and user-friendly.
              </p>
              <a href="/Milan katira-resume.pdf" download 
              className="simple-btn mt-40">
                Download C.V
              </a>
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="skills-box full-width">
              <div className="skill-item">
                <h6 className="custom-font">Frontend devlopment</h6>
                <div className="skill-progress">
                  <div className="progres custom-font" data-value="90%"></div>
                </div>
              </div>
              <div className="skill-item">
                <h6 className="custom-font">Backend development</h6>
                <div className="skill-progress">
                  <div className="progres custom-font" data-value="95%"></div>
                </div>
              </div>
              <div className="skill-item">
                <h6 className="custom-font">Mobile application development</h6>
                <div className="skill-progress">
                  <div className="progres custom-font" data-value="85%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWithSkills;
