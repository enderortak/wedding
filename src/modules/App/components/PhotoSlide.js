import React from "react";
import Slider from "react-slick";
import photo9 from "./../photos/photo10.jpg";
import photo10 from "./../photos/photo11.jpg";
import photo11 from "./../photos/photo12.jpg";
import photo12 from "./../photos/photo13.jpg";
import photo13 from "./../photos/photo14.jpg";
import photo14 from "./../photos/photo15.jpg";
import photo15 from "./../photos/photo16.jpg";
import photo1 from "./../photos/photo2.jpg";
import photo2 from "./../photos/photo3.jpg";
import photo3 from "./../photos/photo4.jpg";
import photo4 from "./../photos/photo5.jpg";
import photo5 from "./../photos/photo6.jpg";
import photo6 from "./../photos/photo7.jpg";
import photo7 from "./../photos/photo8.jpg";
import photo8 from "./../photos/photo9.jpg";


const PhotoSlide = () => (
  <Slider arrows={false} autoplay={true}>
    <img src={photo1} alt="Slide" />
    <img src={photo2} alt="Slide" />
    <img src={photo3} alt="Slide" />
    <img src={photo4} alt="Slide" />
    <img src={photo5} alt="Slide" />
    <img src={photo6} alt="Slide" />
    <img src={photo7} alt="Slide" />
    <img src={photo8} alt="Slide" />
    <img src={photo9} alt="Slide" />
    <img src={photo10} alt="Slide" />
    <img src={photo11} alt="Slide" />
    <img src={photo12} alt="Slide" />
    <img src={photo13} alt="Slide" />
    <img src={photo14} alt="Slide" />
    <img src={photo15} alt="Slide" />
  </Slider>
);

export default PhotoSlide;