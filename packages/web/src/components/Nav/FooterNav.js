import * as React from 'react';
import { Link } from 'gatsby';
import { Form } from '@njmyers/component-library';
import Button from '../Button';
import URLToTitle from './url-to-title';
// style
import './footer-nav.sass';

class DesktopFooterNav extends React.Component {
  onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('clicked');
  };

  render() {
    return (
      <footer className="footer">
        <section className="footer_widgets">
          <form
            name="emailSignup"
            className="emailSignup"
            onSubmit={this.onSubmit}
          >
            <Form.Input
              block="emailSignup"
              name="email"
              label="Signup For Our Newsletter"
              required
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </section>
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
      </footer>
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
