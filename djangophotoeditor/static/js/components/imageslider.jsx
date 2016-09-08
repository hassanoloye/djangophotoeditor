import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

/**
let AllImages = [
  {
    imageSource: "static/img/carousel.png",
    imageCaption: "First slide label"
  },
  {
    imageSource: "static/img/carousel.png",
    imageCaption: "Second slide label"
  },
  {
    imageSource: "static/img/carousel.png",
    imageCaption: "Third slide label"
  },
  {
    imageSource: "static/img/carousel.png",
    imageCaption: "Fourth slide label"
  }
]
const displayImages = (props) => {
  return (
    props.images.map((image) => {
      return (
        <Carousel.Item>
          <img alt="900x500" src={image.imageSource}/>
          <Carousel.Caption>
            <h3>{image.imageCaption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      );
    })
  );
}
**/
const ImageSlider = () => {
  return (
  <Carousel>
  <Carousel.Item>
    <img alt="900x500" src="static/img/img1.png"/>
    <Carousel.Caption>
      <h3>First slide label</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img alt="900x500" src="static/img/img2.png"/>
    <Carousel.Caption>
      <h3>Second slide label</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img alt="900x500" src="static/img/img3.png"/>
    <Carousel.Caption>
      <h3>Third slide label</h3>
    </Carousel.Caption>
  </Carousel.Item>
  </Carousel>
);
}

module.exports = ImageSlider;
