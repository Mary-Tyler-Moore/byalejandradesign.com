import * as React from 'react';
import Cart from '../components/Cart';
import Layout from '../components/Layout';

const CartPage = ({ location, ...props }) => (
  <Layout location={location} title="Cart">
    <Cart {...props} />
  </Layout>
);

export default CartPage;
