import * as React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import withSize from 'react-size-components';

import Layout from '../components/Layout';
import Head from '../components/Head';
import Hero from '../components/Hero';
import { SingleProduct } from '../components/Product';

class ShopProduct extends React.Component {
  get title() {
    const { acf } = this.product;
    return acf.display_title || acf.title;
  }

  get description() {
    return this.product.description;
  }

  get image() {
    return this.collection.acf.header_image;
  }

  get collection() {
    const { collections } = this.product;
    if (!Array.isArray(collections)) {
      throw new Error(
        `${this.product.slug} does not have a collection attribution`
      );
    }

    return collections[0];
  }

  get product() {
    return this.props.data.wordpressWpShop;
  }

  render() {
    return (
      <React.Fragment>
        <Head
          location={this.props.location}
          title={this.title}
          description={this.description}
          image={this.image}
        >
          <Helmet>
            <html itemScope itemType="http://schema.org/Product" />
            <meta property="og:type" content="article" />
            <meta property="og:price:amount" content={this.product.acf.price} />
            <meta property="og:price:currency" content="USD" />
          </Helmet>
        </Head>
        <Layout
          hero={() => (
            <Hero image={this.image} filter={0.5} fill="half">
              {!this.props.sizes.mobile && (
                <article className="singleCollection_headerText">
                  <h2>{this.collection.name}</h2>
                  <p>
                    <em>
                      {'"'}
                      {this.collection.description}
                      {'"'}
                    </em>
                  </p>
                </article>
              )}
            </Hero>
          )}
        >
          <SingleProduct
            node={this.props.data.wordpressWpShop}
            sizes={this.props.sizes}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default withSize({ mobile: true })(ShopProduct);

export const sparseFragment = graphql`
  fragment SparseProductData on wordpress__wp_shop {
    title
    slug
    id
    wordpress_id
  }
`;

/**
 * Shop Product fragment. All product data for a full detailed entry.
 * @type {wordpress__wp_shop}
 */
export const fragment = graphql`
  fragment ProductData on wordpress__wp_shop {
    ...SparseProductData
    collections {
      slug
      description
      name
      acf {
        header_image {
          localFile {
            publicURL
            ...HeaderImageFragment
          }
        }
      }
    }
    sizes {
      slug
    }
    ceramics {
      slug
    }
    acf {
      display_title
      quantity
      price
      sale_price
      description
      dimensions {
        length
        width
        height
      }
      main_image {
        ...FluidImageFragment
      }
      additional_images {
        ...FluidImageFragment
      }
    }
  }
`;

export const query = graphql`
  query ProductById($id: String!) {
    wordpressWpShop(id: { eq: $id }) {
      ...ProductData
    }
  }
`;
