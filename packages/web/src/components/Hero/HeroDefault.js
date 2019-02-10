import * as React from 'react';
import { Link } from 'gatsby';
import Hero from './Hero';
import Button from '../Button';

import './hero-default.sass';

const HeroDefault = () => (
  <Hero filter={0.3}>
    <section className="hero_content-default">
      <h1 className="hero_title-default">{`Colorful\u00A0Ceramics`}</h1>
      <h2 className="hero_subtitle-default">Geometric Patterns & Textures</h2>
    </section>
    <section className="hero_cta-default">
      <Link className="hero_link-default" to={`/shop`}>
        <Button className="clearButton">{`Shop\u00A0Now`}</Button>
      </Link>
    </section>
  </Hero>
);

export default HeroDefault;
