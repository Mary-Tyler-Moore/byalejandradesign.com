import React from 'react';
import FluidImage from '../FluidImage';
import './gallery.sass';

const columns = (display) => {
  let size = '';

  for (let i = 0; i < Number(display); i++) {
    size += '1fr ';
  }

  return size;
};

const Gallery = ({ slide } = {}) => (
  <section
    className="postsGallery"
    style={{ gridTemplateColumns: columns(slide.display) }}
  >
    {slide.images.map((image) => (
      <FluidImage localFile={image.localFile} />
    ))}
  </section>
);

export default Gallery;
