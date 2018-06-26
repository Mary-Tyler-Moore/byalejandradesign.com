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
          id
          slug
          title
          acf {
            price
            sale_price
            description
            display_title
            main_image {
              localFile {
                childImageSharp {
                  sizes(maxWidth: 800, maxHeight: 600) {
                    ...GatsbyImageSharpSizes
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;