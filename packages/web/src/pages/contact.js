import * as React from 'react';
import Contact from '../components/Contact';
import Layout from '../components/Layout';
import Head from '../components/Head';

export default ({ location }) => (
  <React.Fragment>
    <Head location={location} title="Contact" />
    <Layout>
      <Contact />
    </Layout>
  </React.Fragment>
);
