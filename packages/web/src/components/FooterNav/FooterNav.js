/** @flow */
import * as React from 'react';
import { Link } from 'gatsby';
import URLToTitle from '../Nav/url-to-title';
// types
import type { Props } from './types';
// styles
import './footer-nav.sass';

const FooterNav = (props: Props) => (
  <nav className="footerNav">
    {props.footerNav.map(({ link, label }) => (
      <React.Fragment>
        <Link
          key={link}
          to={link}
          className="footerNav_link"
          activeClassName="footerNav_link-active"
        >
          {label}
        </Link>
      </React.Fragment>
    ))}
  </nav>
);

export default FooterNav;
