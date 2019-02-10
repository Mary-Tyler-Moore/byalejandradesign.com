/** @flow */
import * as React from 'react';
import { Link } from 'gatsby';
import { Modal, Icon } from '@njmyers/component-library';
// icons
import CartIcon from '../CartIcon';
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
  render() {
    return (
      <header className="desktopHeader">
        <nav className="navDesktop">
          {this.props.mainNav.map(({ link, label }) => (
            <Link
              key={link}
              to={link}
              className="navDesktop_link"
              activeClassName="navDesktop_link-active"
            >
              {label.replace(/\s/gi, '\u00A0')}
            </Link>
          ))}
          <Link
            to="/cart"
            className="navDesktop_linkCart"
            activeClassName="navDesktop_linkCart-active"
          >
            <CartIcon />
          </Link>
        </nav>
      </header>
    );
  }
}

type MobileNavState = {
  status: 'on' | 'off',
};

const LinkedMobileCartIcon = ({ onClick }) => (
  <Link
    to="/cart"
    className="navMobile_link"
    activeClassName="navMobile_link-active"
    onClick={onClick}
  >
    <CartIcon />
  </Link>
);

class MobileMainNav extends React.Component<Props, MobileNavState> {
  state = {
    status: 'off',
  };

  handleClick = (e: SyntheticEvent<HTMLLinkElement>) => {
    this.setState(({ status }) => ({
      status: status === 'on' ? 'off' : 'on',
    }));
  };

  render() {
    return (
      <header className="mainHeaderMobile">
        <section className="mainHeaderMobile_container">
          <div
            className="mainHeaderMobile_hamburger"
            onClick={this.handleClick}
          >
            {this.state.status === 'off' ? (
              <Icon.Hamburger color="#ffffff" radius={1} />
            ) : (
              <Icon.Cross color="#ffffff" radius={1} />
            )}
          </div>
          <Link to="/cart">
            <CartIcon />
          </Link>
        </section>
        <Modal
          status={this.state.status}
          style={{ background: 'rgba(0, 0, 0, 0.75)' }}
          zIndexOn={3}
        >
          <nav className="navMobile">
            {this.props.mainNav.map(({ link, label }) => (
              <Link
                key={link}
                to={link}
                className="navMobile_link"
                activeClassName="navMobile_link-active"
                onClick={this.handleClick}
              >
                {label.replace(/\s/gi, '\u00A0')}
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
