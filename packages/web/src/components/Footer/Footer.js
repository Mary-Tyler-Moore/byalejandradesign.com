/** @flow */
import * as React from 'react';
import SocialWidget from '../SocialWidget';
import FooterNav from '../FooterNav';
import EmailSignup from '../EmailSignup';
// types
import type { Props } from './types';
// styles
import './footer.sass';

const Footer = (props: Props) => (
  <footer className="footer">
    <section className="footer_container">
      <EmailSignup />
      <SocialWidget />
      <FooterNav {...props} />
    </section>
  </footer>
);

export default Footer;
