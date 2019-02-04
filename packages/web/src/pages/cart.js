import * as React from 'react';
import Cart from '../components/Cart';
import Layout from '../components/Layout';
import Head from '../components/Head';

const CartPage = ({ location, ...props }) => (
  <React.Fragment>
    <Head location={location} title="Cart" />
    <Layout>
      <Cart {...props} />
    </Layout>
  </React.Fragment>
);

export default CartPage;
