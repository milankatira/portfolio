/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {device} from "../constant/Responsive";

const Container = styled.section`
  height: 40vh; /* Since pageSplitTime is 1.4 */
  width: 100%;
  /* border: 1px solid blue; */
  position: relative;
  overflow: hidden;
`;

const AboutMeTitle = styled.div.attrs({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  style: ({ scrollPercent }:any) => ({
    transform: `translateX(${scrollPercent * 5.5}%)`,
  }),
})`
  transition: transform 0.5s ease-out;
  font-family: "AvenirHeavy";
  position: absolute;
  color: #eee;
  top: 5%;
  left: -15%;
  @media ${device.laptop} {
    font-size: 180px;
  }
  @media ${device.laptopL} {
    font-size: 200px;
  }
  @media ${device.desktop} {
    font-size: 350px;
  }
`;

const AboutMeDescription = styled.div`
  align-items: center;
  font-family: "AvenirLight";
  text-align: left;
  margin-left: 30%;
  margin-right: 5%;
  @media ${device.laptop} {
    transform: translateY(90%);
    font-size: 30px;
  }
  @media ${device.laptopL} {
    transform: translateY(87%);
    font-size: 38px;
  }
  @media ${device.desktop} {
    transform: translateY(80%);
    font-size: 70px;
  }
`;

export const AboutMe = () => {

  const [scrollPercent, setscrollPercent] = useState(0);
  const handleScroll = (event:any) => {

    const { body, documentElement } = event.srcElement;
    const sd = Math.max(body.scrollTop, documentElement.scrollTop);
    const sp = (sd / (documentElement.scrollHeight - documentElement.clientHeight)) * 100;
    const maxlimit = (documentElement.clientHeight * 150) / documentElement.scrollHeight;
    if (sp >= 0 && sp <= maxlimit) {

      setscrollPercent(sp);

    }

  };

  useEffect(() => {

    window.addEventListener("scroll", handleScroll);
    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, []);

  // const { scrollPercent } = this.state;
  return (
    <Container>
      <AboutMeTitle scrollPercent={scrollPercent}>ABOUT ME</AboutMeTitle>
      <AboutMeDescription>
        Front-end developer who cares deeply about user experience. Serious passion for UI design and new technologies.
      </AboutMeDescription>
    </Container>
  );

};

export default AboutMe;
