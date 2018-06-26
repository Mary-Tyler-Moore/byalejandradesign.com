import * as React from 'react';
import Link from 'gatsby-link';
import CartIcon from '../Cart/CartIcon';
import withSize from 'react-size-components';
import { Modal } from 'njmyers-component-library';
import URLToTitle from './url-to-title';
// styles
import './main-nav.sass';

class DesktopMainNav extends React.Component {
  render() {
    return (
      <nav className="mainNavDesktop">
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
        <Link className="mainNavDesktop_link" to="/cart">
          Cart
        </Link>
      </nav>
    );
  }
}

class MobileMainNav extends React.Component {
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
