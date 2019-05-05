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
          <h5 className="h5-sourceSans">By Alejandra Design</h5>
          <p className="body-sourceSans-1">
            By Alejandra Design focuses on creating intricate design products
            for both home décor and wearable art. The products are designed
            using computational algorithms and printed in-house with our 3D
            printer. The final pieces are made using slipcasting technique and
            fired in a kiln. Each piece is then hand glazed to create varying
            effects and ends up with different patterns and beautiful geometric
            results!
          </p>
          <h5 className="h5-sourceSans">Meet the designer</h5>
          <p className="body-sourceSans-1">
            Alejandra is an architect with a great curiosity in both
            computational design and fabrication. Her architectural studies led
            her to live in multiple cities, but she ultimately settled in her
            favorite one: NYC. Shortly after moving, she started taking
            sculpture and ceramic classes while developing new scripted
            geometries. After quite a lot of experimentation, she found a
            workflow to bring her intricate designs to life and started By
            Alejandra Design.
          </p>
          <h5 className="h5-sourceSans">Explore by Collections</h5>
          <p className="body-sourceSans-1">
            Collections are products curated based on technique, color and/or
            material. Items in a collection are made to be combined easily with
            one another but feel free to mix and match if it suits your taste!
          </p>
          <h5 className="h5-sourceSans">Cloud Studio</h5>
          <p className="body-sourceSans-1">
            This is a virtual studio where we share our creative process.
          </p>
        </article>
      </section>
    </Layout>
  </React.Fragment>
);

export default About;
