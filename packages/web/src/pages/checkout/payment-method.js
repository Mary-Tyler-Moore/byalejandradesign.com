import * as React from 'react';
import PaymentMethods from '../../components/Checkout/PaymentMethods';
import Layout from '../../components/Layout';

export default ({ location }) => (
  <Layout location={location} title="Checkout Payment Methods">
    <PaymentMethods />
  </Layout>
);
