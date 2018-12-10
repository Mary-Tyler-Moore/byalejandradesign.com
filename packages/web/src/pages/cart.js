import * as React from 'react';
import Helmet from 'react-helmet';

import Cart from '../components/Cart';
import Layout from '../components/Layout';

const CartPage = ({ location, ...props }) => (
  <Layout location={location} title="Cart">
    <Helmet />
    <Cart {...props} />
  </Layout>
);

export default CartPage;
