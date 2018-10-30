import * as React from 'react';
import Cart from '../components/Cart';
import Layout from '../components/Layout';

const CartPage = (props) => (
  <Layout>
    <Cart {...props} />
  </Layout>
);

export default CartPage;
