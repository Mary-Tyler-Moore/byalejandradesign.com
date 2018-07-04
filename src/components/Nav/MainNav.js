
import * as React from 'react';
import { Link } from 'gatsby';
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
    mobile: boolean,
  },
  design: {
    maxWidth: number,
    contentPadding: number,
    mobileContentPadding: number,
  },
  mainNav: Array<string>,
};

class DesktopMainNav extends React.Component<Props> {
  getStyle = () => {
    const { innerWidth } = this.props.sizes.window;
    const { maxWidth, contentPadding } = this.props.design;
    // calculate the max width
    const sidePadding = innerWidth > maxWidth ? (innerWidth - maxWidth) / 2 : 0;
    // add content padding
    return { padding: `0 ${sidePadding + contentPadding}px` };
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
          className="mainNavDesktop_linkCart"
          activeClassName="mainNavDesktop_linkCart-active"
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

const LinkedMobileCartIcon = ({ onClick }) => (
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
  getStyle = () => {
    const { innerWidth } = this.props.sizes.window;
    const { maxWidth, mobileContentPadding } = this.props.design;
    // calculate the max width
    const sidePadding = innerWidth > maxWidth ? (innerWidth - maxWidth) / 2 : 0;
    // add content padding
    return { padding: `0 ${sidePadding + mobileContentPadding}px` };
  };

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
      <header style={this.getStyle()} className="mainHeaderMobile">
        <div className="mainHeaderMobile_hamburger" onClick={this.handleClick}>
          <Icon.Hamburger color="#ffffff" radius={1} />
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
            <LinkedMobileCartIcon onClick={this.handleClick} />
          </nav>
        </Modal>
      </header>
    );
  }
}

const MainNav = (props: Props) =>
  props.sizes.mobile ? (
    <MobileMainNav {...props} />
  ) : (
    <DesktopMainNav {...props} />
  );

export default MainNav;
