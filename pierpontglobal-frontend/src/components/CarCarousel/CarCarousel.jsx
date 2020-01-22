import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './styles.css';

function CarCarousel({ images, maxWidth }) {
  return (
    <div style={{ maxWidth, justifySelf: 'center' }}>
      <ImageGallery
        items={
          images.map(i => ({ original: i, thumbnail: `${i}?width=354&height=200` }))
        }
        disableThumbnailScroll
        showPlayButton={false}
        lazyLoad={true}
      />
    </div>
  );
}

export default CarCarousel;
