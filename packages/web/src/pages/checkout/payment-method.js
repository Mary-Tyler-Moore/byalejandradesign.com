import * as React from 'react';
import PaymentMethods from '../../components/Checkout/PaymentMethods';
import Layout from '../../components/Layout';
import Head from '../../components/Head';

export default ({ location }) => (
  <React.Fragment>
    <Head location={location} title="Checkout Payment Methods" />
    <Layout>
      <PaymentMethods />
    </Layout>
  </React.Fragment>
);
