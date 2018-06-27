// @flow
import * as React from 'react';
import Link from 'gatsby-link';
import withSize from 'react-size-components';
import { Modal } from 'njmyers-component-library';
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
  mainNav: Array<string>,
};

class DesktopMainNav extends React.Component<Props> {
  getStyle = () => {
    const { innerWidth } = this.props.sizes.window;
    const { maxWidth } = this.props;
    const sidePadding = innerWidth > maxWidth ? (innerWidth - maxWidth) / 2 : 0;

    return { padding: `0 ${sidePadding}px` };
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

class MobileMainNav extends React.Component<Props> {
  render() {
    return (
      <Modal>
        <nav className="mainNavMobile">
          {this.props.mainNav.map((nav) => (
            <Link
              key={nav}
              to={nav}
              className="mainNavMobile_link"
              activeClassName="mainNavMobile_link-active"
              onClick={this.props.onClick}
            >
              {URLToTitle(nav)}
            </Link>
          ))}
          <CartIcon />
        </nav>
      </Modal>
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
