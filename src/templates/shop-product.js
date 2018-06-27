import * as React from 'react';
import withSize from 'react-size-components';
import { SingleProduct } from '../components/Product';

const Node = (props) => <SingleProduct node={props.data.wordpressWpShop} />;

const SizedNode = withSize({ mobile: true })(Node);

export default SizedNode;

export const query = graphql`
  query ShopItemById($id: String!) {
    wordpressWpShop(id: { eq: $id }) {
      title
      slug
      id
      acf {
        quantity
        price
        sale_price
        description
        product_type
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
        provided_dimensions
      }
    }
  }
`;
