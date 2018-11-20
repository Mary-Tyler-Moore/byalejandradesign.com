/** @flow */
import * as React from 'react';
import { Link } from 'gatsby';
import { Form } from '@njmyers/component-library';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookSquare,
  faPinterestSquare,
} from '@fortawesome/free-brands-svg-icons';
import Button from '../Button';
import URLToTitle from '../Nav/url-to-title';
// types
import type { Props, State } from './types';
// styles
import './footer.sass';

class Footer extends React.Component<Props, State> {
  state = {
    email: '',
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();

    const {
      currentTarget: { value },
    } = e;

    this.setState((state) => ({
      email: value,
    }));
  };

  onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState((state) => ({ email: '' }));
  };

  getStyle = () => {
    const { innerWidth } = this.props.sizes.window;
    const { maxWidth, contentPadding } = this.props.design;
    // calculate the max width
    const sidePadding = innerWidth > maxWidth ? (innerWidth - maxWidth) / 2 : 0;
    // add content padding
    const totalPadding = sidePadding + 10 + contentPadding / 2;

    return {
      padding: `2.5rem ${totalPadding}px 0.5rem ${totalPadding}px`,
    };
  };

  render() {
    return (
      <footer className="footer" style={this.getStyle()}>
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
              value={this.state.email}
              onChange={this.onChange}
              required
            />
            <Button type="submit">Sign Up</Button>
          </form>
          <section className="socialWidget">
            <p className="socialWidget_subtitle">Follow Us!</p>
            <a href="https://instagram.com" target="__blank">
              <FontAwesomeIcon
                className="socialWidget_icon socialWidget_icon-left"
                icon={faInstagram}
                size="3x"
              />
            </a>
            <a href="https://pinterest.com" target="__blank">
              <FontAwesomeIcon
                className="socialWidget_icon"
                icon={faPinterestSquare}
                size="3x"
              />
            </a>
            <a href="https://facebook.com" target="__blank">
              <FontAwesomeIcon
                className="socialWidget_icon"
                icon={faFacebookSquare}
                size="3x"
              />
            </a>
          </section>
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
