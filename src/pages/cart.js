import * as React from 'react';
import withSize from 'react-size-components';
import Cart from '../components/Cart';

const Edges = (props) => (
  <Cart edges={props.data.allWordpressWpShop.edges} {...props} />
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
