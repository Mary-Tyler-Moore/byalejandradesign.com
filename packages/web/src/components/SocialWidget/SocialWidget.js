/** @flow */
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookSquare,
  faPinterestSquare,
} from '@fortawesome/free-brands-svg-icons';
// types
import type { Props } from './types';
// styles
import './social-widget.sass';

const SocialWidget = (props: Props) => (
  <section className="socialWidget">
    <p className="socialWidget_subtitle">Follow Us!</p>
    <a href="https://www.instagram.com/byalejandradesign" target="__blank">
      <FontAwesomeIcon
        className="socialWidget_icon socialWidget_icon-left"
        icon={faInstagram}
        size="3x"
      />
    </a>
    <a href="https://pinterest.com/byalejandradesign" target="__blank">
      <FontAwesomeIcon
        className="socialWidget_icon"
        icon={faPinterestSquare}
        size="3x"
      />
    </a>
    <a href="https://facebook.com/byalejandradesign" target="__blank">
      <FontAwesomeIcon
        className="socialWidget_icon"
        icon={faFacebookSquare}
        size="3x"
      />
    </a>
  </section>
);

export default SocialWidget;
