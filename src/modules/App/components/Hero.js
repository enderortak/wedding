import React from "react";
import { Header } from "semantic-ui-react";
import "./../../../shared/fonts/gabriola/style.css";
import "./Hero.css";
import heroBgPath from "./heroimage.jpg";
import PhotoSlide from "./PhotoSlide";

const heroBg = "url(" + heroBgPath + ")";

const Hero = ({contentStyle, bgStyle}) => (
<header className="Hero">
  <div className="Hero-bg" style={{backgroundImage: heroBg, ...bgStyle}} alt="Hero BG" />
  <div className="Hero-content-wrapper">
    <div className="Hero-content" style={contentStyle}>
    <Header as="h1">
        İpek & Ender
        <Header.Subheader>
          Evlilik Planı
        </Header.Subheader>
      </Header>
      <div className="Hero-content-photo">
        <PhotoSlide />
      </div>
    </div>
  </div>
</header>
);
export default Hero;