import * as React from 'react';
import FluidImage from '../FluidImage';

const SingleImage = ({ slide }) => (
  <section>
    <FluidImage localFile={slide.singleImage.localFile} />
  </section>
);

export default SingleImage;
