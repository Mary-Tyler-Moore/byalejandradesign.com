import React from 'react';
import Head from '../components/Head';

import Layout from '../components/Layout';
import about from '../assets/about.png';

import './about.sass';

const About = ({ location, ...props }) => (
  <React.Fragment>
    <Head location={location} title="About" />
    <Layout>
      <section className="about">
        <img src={about} />
        <article>
          <h4 className="h4-sourceSans" style={{ marginTop: 0 }}>
            About
          </h4>
          <p className="body-sourceSans-1">
            I’m a designer based in NYC with a background in architecture and
            computational design. I have always been curious to learn new
            techniques and materials. For a few years I have been getting my
            hands dirty making pottery while creating different geometries
            digitally. Not so long ago I started researching for a way to merge
            both. And so, with the help of a 3D printer I have been bringing
            these designs to life!
          </p>
          <p className="body-sourceSans-2">
            <em>
              By Alejandra Design focuses on creating intricate home decor
              products. We seek to challenge the boundaries of fabrication with
              complex patterns that define different geometries. Alejandra is a
              designer with a background in architecture and computational
              design. Her fascination with 3D printing and ceramic craftsmanship
              has led her to develop a workflow where she brings to life unique
              shapes. We are based in New York City and we source our products
              locally.
            </em>
          </p>
        </article>
      </section>
    </Layout>
  </React.Fragment>
);

export default About;
