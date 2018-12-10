import * as React from 'react';
import Contact from '../components/Contact';
import Layout from '../components/Layout';

export default ({ location }) => (
  <Layout location={location} title="Contact">
    <Contact />
  </Layout>
);
