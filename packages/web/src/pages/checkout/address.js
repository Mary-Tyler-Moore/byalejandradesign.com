import * as React from 'react';
import Address from '../../components/Checkout/AddressForms';
import Layout from '../../components/Layout';
import Head from '../../components/Head';

export default ({ location }) => (
  <React.Fragment>
    <Head location={location} title="Checkout Address" />
    <Layout>
      <Address />
    </Layout>
  </React.Fragment>
);
