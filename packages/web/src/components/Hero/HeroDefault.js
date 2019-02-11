import * as React from 'react';
import { Link } from 'gatsby';
import Hero from './Hero';
import Button from '../Button';
import withSize from 'react-size-components';

import './hero-default.sass';

class HeroDefault extends React.Component {
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
      <Hero filter={0.3}>
        <section className="hero_content-default">
          <h1 className="hero_title-default">{`Patterned\u00A0Ceramics`}</h1>
          <h2 className="hero_subtitle-default">
            Geometric Patterns & Textures
          </h2>
        </section>
        <section className="hero_cta-default">
          <Link className="hero_link-default" to={`/shop`}>
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

export default withSize({ mobile: true })(HeroDefault);
