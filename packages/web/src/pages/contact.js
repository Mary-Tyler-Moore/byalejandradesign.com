import * as React from 'react';
import Helmet from 'react-helmet';

import Contact from '../components/Contact';
import Layout from '../components/Layout';

export default ({ location }) => (
  <Layout location={location} title="Contact">
    <Helmet />
    <Contact />
  </Layout>
);
