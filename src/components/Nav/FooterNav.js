import * as React from 'react';
import Link from 'gatsby-link';
import URLToTitle from './url-to-title';
//
import './footer-nav.sass';

class DesktopFooterNav extends React.Component {
  render() {
    return (
      <nav className="footerNavDesktop">
        {this.props.footerNav.map((nav) => (
          <Link
            key={nav}
            to={nav}
            className="footerNavDesktop_link"
            activeClassName="footerNavDesktop_link-active"
          >
            {URLToTitle(nav)}
          </Link>
        ))}
      </nav>
    );
  }
}

class MobileFooterNav extends React.Component {
  render() {
    return (
      <nav className="footerNavMobile">
        {this.props.footerNav.map((nav) => (
          <Link
            key={nav}
            to={nav}
            className="footerNavMobile_link"
            activeClassName="footerNavMobile_link-active"
            onClick={this.props.onClick}
          >
            {URLToTitle(nav)}
          </Link>
        ))}
      </nav>
    );
  }
}

const FooterNav = (props) =>
  props.sizes.mobile ? (
    <MobileFooterNav {...props} />
  ) : (
    <DesktopFooterNav {...props} />
  );

export default FooterNav;
