import React, { useState, Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import { Div, DivDescription, DivImage, DivInfo, DivInfoName, DivRes, Rectangle } from './styles';

import face1 from 'pages/Home/partials/face1.jpg';
import face2 from 'pages/Home/partials/face2.jpg';
import face3 from 'pages/Home/partials/face3.jpg';





const Carousel = () => {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,



  };


    const autor = [
        { text: 'Johan Smith' },
        { text: 'Carolina Martinez' },
        { text: 'Ernesto Vela' }
      ];
    const ocupation = [
        { text: 'CEO Ford' },
        { text: 'Founder Audi' },
        { text: 'Manager at tesla' }
      ];



  return (
    <DivRes>
    <Slider {...settings}>
      <div>
        <Div>
          <Rectangle>
            <DivImage>
              <img src={face1} ></img>
            </DivImage>
            <DivDescription>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.</p>
            </DivDescription>
            <DivInfoName>
              <p>Johan Smith</p>
            </DivInfoName>
            <DivInfo>
              <p>CEO Ford</p>
            </DivInfo>
          </Rectangle>
        </Div>
      </div>
      <div>
        <Div>
          <Rectangle>
            <DivImage>
              <img src={face2} ></img>
            </DivImage>
            <DivDescription>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.</p>
            </DivDescription>
            <DivInfoName>
              <p>Carolina Martinez</p>
            </DivInfoName>
            <DivInfo>
              <p>Founder Audi</p>
            </DivInfo>
          </Rectangle>
        </Div>
      </div>
      <div>
        <Div>
          <Rectangle>
            <DivImage>
              <img src={face3} ></img>
            </DivImage>
            <DivDescription>
              <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.</p>
            </DivDescription>
            <DivInfoName>
              <p>Ernesto Vela</p>
            </DivInfoName>
            <DivInfo>
              <p>Manager at tesla</p>
            </DivInfo>
          </Rectangle>
        </Div>
      </div>
    </Slider>
    </DivRes>
    
  );
};

export default Carousel;
