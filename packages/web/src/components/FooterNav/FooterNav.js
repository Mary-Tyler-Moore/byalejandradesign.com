/** @flow */
import * as React from 'react';
import { Link } from 'gatsby';
import URLToTitle from '../Nav/url-to-title';
// types
import type { Props } from './types';
// styles
import './footer-nav.sass';

const FooterNav = (props: Props) =>
  props.footerNav ? (
    <nav className="footerNav">
      {props.footerNav.map(({ link, label }) => (
        <Link
          key={link}
          to={link}
          className="footerNav_link"
          activeClassName="footerNav_link-active"
        >
          {label}
        </Link>
      ))}
    </nav>
  ) : null;

export default FooterNav;
