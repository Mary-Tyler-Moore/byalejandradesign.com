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
          <section>
            <h5 className="headline">By Alejandra Design</h5>
            <p className="copy">
              By Alejandra Design focuses on creating intricate design products
              for both home décor and wearable art. The products are designed
              using computational algorithms and printed in-house with our 3D
              printer. The final pieces are made using slipcasting technique and
              fired in a kiln. Each piece is then hand glazed to create varying
              effects and ends up with different patterns and beautiful
              geometric results!
            </p>
          </section>
          <section>
            <h5 className="headline">Meet the designer</h5>
            <p className="copy">
              Alejandra is an architect with a great curiosity in both
              computational design and fabrication. Her architectural studies
              led her to live in multiple cities, but she ultimately settled in
              her favorite one: NYC. Shortly after moving, she started taking
              sculpture and ceramic classes while developing new scripted
              geometries. After quite a lot of experimentation, she found a
              workflow to bring her intricate designs to life and started By
              Alejandra Design.
            </p>
          </section>
          <section>
            <h5 className="headline">Explore by Collections</h5>
            <p className="copy">
              Collections are products curated based on technique, color and/or
              material. Items in a collection are made to be combined easily
              with one another but feel free to mix and match if it suits your
              taste!
            </p>
          </section>
          <section>
            <h5 className="headline">Cloud Studio</h5>
            <p className="copy">
              This is a virtual studio where we share our creative process.
            </p>
          </section>
        </article>
      </section>
    </Layout>
  </React.Fragment>
);

export default About;
