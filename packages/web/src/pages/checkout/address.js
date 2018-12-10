import * as React from 'react';
import Helmet from 'react-helmet';
import Address from '../../components/Checkout/AddressForms';
import Layout from '../../components/Layout';

export default ({ location }) => (
  <Layout location={location} title="Checkout Address">
    <Helmet />
    <Address />
  </Layout>
);
