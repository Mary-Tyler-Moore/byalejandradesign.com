import * as React from 'react';
import withSize from 'react-size-components';

import { ProductListDesktop, ProductListMobile } from '../components/Product';

class Shop extends React.Component {
  render() {
    return (
      <section className="shop">
        <section className="shopSideBar">
          <p>SideBar</p>
        </section>
        <section className="shopProducts">
          {this.props.data.allWordpressWpShop.edges.map(
            ({ node }) =>
              this.props.sizes.mobile ? (
                <ProductListMobile node={node} key={node.id} />
              ) : (
                <ProductListDesktop node={node} key={node.id} />
              )
          )}
        </section>
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
          title
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
    }
    allWordpressWpCollections {
      edges {
        node {
          name
          id
          description
          acf {
            subtitle
            image {
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
