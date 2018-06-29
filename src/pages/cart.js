import * as React from 'react';
import { graphql } from 'gatsby';

import withSize from 'react-size-components';
import Cart from '../components/Cart';
import Layout from '../components/Layout';

const Edges = (props) => (
  <Layout>
    <Cart edges={props.data.allWordpressWpShop.edges} {...props} />
  </Layout>
);
const SizedEdges = withSize({ mobile: true })(Edges);

export default SizedEdges;

export const query = graphql`
  query AllShopItemsCart {
    allWordpressWpShop {
      edges {
        node {
          ...ProductData
        }
      }
    }
  }
`;
