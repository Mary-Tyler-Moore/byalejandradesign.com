import * as React from 'react';

type Props = {
  offState: {},
  onState: {},
  replaceStyle: {},
  style: {},
  children?: React.Node,
};

type State = {
  active: number,
  inverval: IntervalID,
};

class SlideShow extends React.Component {
  static defaultProps = {
    replaceStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    onState: {
      opacity: 1,
    },
    offState: {
      opacity: 0,
    },
  };

  getTransitionString = () => {
    const { onState } = this.props;
    const { transitionSpeed, transitionTiming } = this.props;

    return Object.keys(onState)
      .map((key: string) => `${transitionSpeed}s ${transitionTiming} ${key}`)
      .reduce((a, b) => `${a},${b}`);
  };

  nextImage = () => {
    this.setState((state) => ({
      active: (state.active + 1) % this.images.length,
    }));
  };

  startCarousel = () => {
    this.setState({
      interval: setInterval(this.nextImage, 3000),
    });
  };

  stopCarousel = () => {
    if (this.state.interval) clearInterval(this.state.interval);
  };

  style = (index) => ({
    ...this.props.replaceStyle,
    ...this.props.style,
    ...(Number(index) === Number(this.state.active)
      ? this.onState
      : this.offState),
  });

  render() {
    return (
      <aside>
        {React.Children.map(this.props.children, (child, index) =>
          React.cloneElement(child, { style: this.style(index) })
        )}
      </aside>
    );
  }
}

export default SlideShow;
