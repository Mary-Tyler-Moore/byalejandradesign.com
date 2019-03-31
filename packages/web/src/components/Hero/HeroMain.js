import * as React from 'react';
import { Link } from 'gatsby';
import Hero from './Hero';
import Button from '../Button';
import withSize from 'react-size-components';

import './hero-main.sass';

class HeroMain extends React.Component {
  get style() {
    return !this.props.mobile
      ? {
          fontSize: '1.2rem',
          marginBottom: 2,
        }
      : {};
  }

  render() {
    return (
      <Hero fill="full" filter={0.3}>
        <section className="hero_content-main">
          <h1 className="hero_title-main">{`Complex\u00A0Designs`}</h1>
          <h2 className="hero_subtitle-main">Colorful Textured Ceramics</h2>
        </section>
        <section className="hero_cta-main">
          <Link className="hero_link-main" to={`/shop`}>
            <Button
              className="clearButton"
              span={{ style: this.style }}
            >{`Shop\u00A0Now`}</Button>
          </Link>
        </section>
      </Hero>
    );
  }
}

export default withSize({ mobile: true })(HeroMain);
