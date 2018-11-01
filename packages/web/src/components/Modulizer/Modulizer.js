import * as React from 'react';
import Text from './Text';
import YouTube from './YouTube';
import Gallery from './Gallery';
import SingleImage from './SingleImage';
// styles
import './modulizer.sass';

const Modulizer = ({ slide }) => {
  switch (slide.__typename) {
    case 'WordPressAcf_gallery':
      return <Gallery slide={slide} />;
    case 'WordPressAcf_text':
      return <Text slide={slide} />;
    case 'WordPressAcf_heading':
      return <h4 className="h4-sourceSans">{slide.heading}</h4>;
    case 'WordPressAcf_youtube':
      return <YouTube slide={slide} />;
    // case 'video':
    //   return <SelfHostedVideo slide={slide} />;
    case 'WordPressAcf_image':
      return <SingleImage slide={slide} />;
    default:
      return null;
  }
};

export default Modulizer;
