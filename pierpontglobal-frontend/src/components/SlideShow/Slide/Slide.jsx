import React from 'react';
import { Carousel } from 'react-bootstrap';

function Slide({ image }) {
  return (
    <Carousel.Item>
      <img
        style={{
          width: '100%',
          height: '100%',
          left: '50%',
          top: '50%',
        }}
        alt="900x500"
        src={image}
      />
    </Carousel.Item>
  );
}

export default Slide;
