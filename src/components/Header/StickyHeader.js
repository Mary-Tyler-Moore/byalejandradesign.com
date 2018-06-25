import React, { PureComponent } from 'react';
// components
import Nav from './Nav';
// assets
import logo from '../../media/logo_white.png';

class StickyHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isStickyHeaderActive: this.props.isStickyHeaderActive,
      style: {
        transform: this.props.isStickyHeaderActive
          ? 'translateY(0)'
          : 'translateY(-100px)',
      },
    };
  }

  /**
   * https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props
   * @param {*} props
   * @param {*} state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.isStickyHeaderActive !== state.isStickyHeaderActive) {
      const transform = props.isStickyHeaderActive
        ? 'translateY(0)'
        : 'translateY(-100px)';
      return {
        isStickyHeaderActive: props.isStickyHeaderActive,
        style: { transform },
      };
    }
    return null;
  }

  render() {
    return (
      <header style={this.state.style} className="stickyHeader">
        <img className="stickyHeader_logo" src={logo} alt="artetexture logo" />
        <Nav pages={this.props.pages} />
      </header>
    );
  }
}

export default StickyHeader;
