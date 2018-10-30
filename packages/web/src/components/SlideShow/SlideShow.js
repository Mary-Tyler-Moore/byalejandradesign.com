/** @flow */
import * as React from 'react';
import FluidImage from '../FluidImage';
// types
import type { ImageNode } from '@byalejandradesign/data-objects';
// styles
import './slideshow.sass';

type Props = {
  images: Array<ImageNode>,
};

type State = {
  active: number,
  interval: IntervalID | null,
};

/** slide show for product style fluid images */
class SlideShow extends React.PureComponent<Props, State> {
  state = {
    active: 0,
    interval: null,
  };

  componentDidMount() {
    if (this.props.images.length > 1) this.startCarousel();
  }

  componentWillUnmount() {
    this.stopCarousel();
  }

  startCarousel = () => {
    this.setState({
      interval: setInterval(this.nextImage, 3000),
    });
  };

  stopCarousel = () => {
    if (this.state.interval) clearInterval(this.state.interval);
  };

  nextImage = () => {
    this.setState((state) => ({
      active: (state.active + 1) % this.props.images.length,
    }));
  };

  className = (i: number) => {
    return `slideshow_img ${
      i === this.state.active ? `slideshow_img-active` : ``
    }${i === this.state.active - 1 ? `slideshow_img-last` : ``}${
      i === this.state.active + 1 ? `slideshow_img-next` : ``
    }`;
  };

  render() {
    return (
      <section className="slideshow_imgContainer">
        {this.props.images.map((image, i) => (
          <FluidImage
            key={i}
            className={this.className(i)}
            localFile={image.localFile}
          />
        ))}
      </section>
    );
  }
}

type InvalidProps = {
  images: Array<ImageNode> | ImageNode,
};

/** ensure images are passed as an array to the slideshow */
const FormatProps = (props: InvalidProps) => (
  <SlideShow
    {...props}
    images={Array.isArray(props.images) ? props.images : [props.images]}
  />
);

export default FormatProps;
