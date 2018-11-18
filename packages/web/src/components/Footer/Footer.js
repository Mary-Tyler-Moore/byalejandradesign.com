/** @flow */
import * as React from 'react';
import { Link } from 'gatsby';
import { Form } from '@njmyers/component-library';
import Button from '../Button';
import URLToTitle from '../Nav/url-to-title';
// types
import type { Props } from './types';
// styles
import './footer.sass';

class Footer extends React.Component<Props> {
  onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('clicked');
  };

  style = () => ({
    padding: `0.5rem ${this.props.design.mobileContentPadding}px`,
  });

  render() {
    return (
      <footer className="footer" style={this.style()}>
        {/* <pre>{JSON.stringify(this.style(), null, 2)}</pre> */}
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
              type="email"
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

export default Footer;
