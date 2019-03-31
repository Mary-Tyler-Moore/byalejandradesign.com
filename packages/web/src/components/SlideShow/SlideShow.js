/** @flow */
import * as React from 'react';
import { Transition } from 'react-transition-group';
import classNames from 'classnames';

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

const TRANSITION_LENGTH = 450;
const SLIDESHOW_LENGTH = 1000 * 4;

/** slide show for product style fluid images */
class SlideShow extends React.PureComponent<Props, State> {
  state = {
    transitioning: false,
    active: 0,
    interval: null,
  };

  get length() {
    return this.props.images.length;
  }

  get images() {
    const { active } = this.state;
    const { images } = this.props;
    const currentIndex = active % this.length;
    const prevIndex = (active + this.length - 1) % this.length;
    const nextIndex = (active + this.length + 1) % this.length;

    return [images[prevIndex], images[currentIndex]];
  }

  componentDidMount() {
    if (this.length > 1) this.startCarousel();
  }

  componentWillUnmount() {
    this.stopCarousel();
  }

  startCarousel = () => {
    this.setState({
      interval: setInterval(this.nextImage, SLIDESHOW_LENGTH),
    });
  };

  stopCarousel = () => {
    const { interval } = this.state;
    if (interval) clearInterval(interval);
  };

  nextImage = () => {
    this.setState({
      transitioning: true,
    });

    setTimeout(() => {
      this.setState((state) => ({
        active: state.active + 1,
        transitioning: false,
      }));
    }, TRANSITION_LENGTH);
  };

  render() {
    const { active, transitioning } = this.state;
    return (
      <React.Fragment>
        <Transition in={transitioning} timeout={TRANSITION_LENGTH}>
          {(state) => (
            <section className="slideshow_imgContainer">
              {this.images.map((image) => (
                <FluidImage
                  key={image.id}
                  localFile={image.localFile}
                  className={classNames({
                    slideshow_img: true,
                    [`slideshow_img-${state}`]: true,
                  })}
                />
              ))}
            </section>
          )}
        </Transition>
      </React.Fragment>
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
