import * as React from 'react';
import { Link } from 'gatsby';
import Header from './DesktopHeader';
import Button from '../Button';

import './default-header.sass';

const DefaultHeader = () => (
  <Header>
    <section
      style={{
        color: 'white',
        textAlign: 'center',
        marginBottom: '1rem',
      }}
    >
      <h2 className="h2-sourceSans">Colorful Ceramics</h2>
      <h3 className="h3-sourceSans">Geometric Patterns & Textures</h3>
    </section>
    <Link className="header_shopLink" to={`/shop`}>
      <Button className="clearButton">{`Shop\u00A0Now`}</Button>
    </Link>{' '}
  </Header>
);

export default DefaultHeader;
