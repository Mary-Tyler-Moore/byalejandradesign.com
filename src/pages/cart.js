import * as React from 'react';
import withSize from 'react-size-components';
import Cart from '../components/Cart';

const Edges = (props) => <Cart edges={props.data.allWordpressWpShop.edges} />;
const SizedEdges = withSize({ mobile: true })(Edges);

export default SizedEdges;

export const query = graphql`
  query AllShopItemsCart {
    allWordpressWpShop {
      edges {
        node {
          id
          title
          acf {
            quantity
            price
            sale_price
            description
            product_type
            provided_dimensions
            ceramic {
              name
              slug
            }
            size {
              name
              slug
            }
            collection {
              name
              slug
            }
            additional_images
            video_type
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
