// @flow
import * as React from 'react';
import Link from 'gatsby-link';
import withSize from 'react-size-components';
import { Modal, Icon } from 'njmyers-component-library';
import URLToTitle from './url-to-title';
// icons
import Logo from '../Logo';
import CartIcon from '../Cart/CartIcon';
// styles
import './main-nav.sass';

type Props = {
  sizes: {
    window: {
      innerWidth: number,
    },
  },
  maxWidth: number,
  contentPadding: number,
  mainNav: Array<string>,
};

class DesktopMainNav extends React.Component<Props> {
  getStyle = () => {
    const { innerWidth } = this.props.sizes.window;
    const { maxWidth } = this.props;
    // calculate the max width
    const sidePadding = innerWidth > maxWidth ? (innerWidth - maxWidth) / 2 : 0;
    // add content padding
    return { padding: `0 ${sidePadding + this.props.contentPadding}px` };
  };

  render() {
    return (
      <nav style={this.getStyle()} className="mainNavDesktop">
        <Logo className="mainNavDesktop_logo" />
        {this.props.mainNav.map((nav) => (
          <Link
            key={nav}
            to={nav}
            className="mainNavDesktop_link"
            activeClassName="mainNavDesktop_link-active"
          >
            {URLToTitle(nav)}
          </Link>
        ))}
        <Link
          to="/cart"
          className="mainNavDesktop_link"
          activeClassName="mainNavDesktop_link-active"
        >
          <CartIcon />
        </Link>
      </nav>
    );
  }
}

type MobileNavState = {
  status: 'on' | 'off',
};

const LinkedCartIcon = ({ onClick }) => (
  <Link
    to="/cart"
    className="mainNavMobile_link"
    activeClassName="mainNavMobile_link-active"
    onClick={onClick}
  >
    <CartIcon />
  </Link>
);

class MobileMainNav extends React.Component<Props, MobileNavState> {
  state = {
    status: 'off',
  };

  handleClick = () => {
    this.setState(({ status }) => ({
      status: status === 'on' ? 'off' : 'on',
    }));
  };

  render() {
    return (
      <header className="mainHeaderMobile">
        <div className="mainHeaderMobile_hamburger" onClick={this.handleClick}>
          <Icon.Hamburger color="#ffffff" radius={1} />
          <Icon.Cross color="#ffffff" radius={1} />
        </div>
        <Modal
          status={this.state.status}
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
        >
          <nav className="mainNavMobile">
            {this.props.mainNav.map((nav) => (
              <Link
                key={nav}
                to={nav}
                className="mainNavMobile_link"
                activeClassName="mainNavMobile_link-active"
                onClick={this.handleClick}
              >
                {URLToTitle(nav)}
              </Link>
            ))}
            <LinkedCartIcon onClick={this.handleClick} />
            {/* <CartIcon className="mainNavMobile_link" /> */}
          </nav>
        </Modal>
        <LinkedCartIcon onClick={this.handleClick} />
      </header>
    );
  }
}

const MainNav = (props) =>
  props.sizes.mobile ? (
    <MobileMainNav {...props} />
  ) : (
    <DesktopMainNav {...props} />
  );

export default MainNav;
