import * as React from 'react';
import withSize from 'react-size-components';

import { ProductList } from '../components/Product';
import { CollectionList } from '../components/Collections';

class Shop extends React.Component {
  render() {
    return (
      <section className="shop">
        <section className="shopSideBar">
          <CollectionList
            edges={this.props.data.allWordpressWpCollections.edges}
          />
        </section>
        <ProductList
          edges={this.props.data.allWordpressWpShop.edges}
          sizes={this.props.sizes}
        />
      </section>
    );
  }
}

export default withSize({ mobile: true })(Shop);

export const query = graphql`
  query AllShopItems {
    allWordpressWpShop {
      edges {
        node {
          id
          slug
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
    allWordpressWpCollections {
      edges {
        node {
          ...CollectionData
        }
      }
    }
  }
`;
