import * as React from 'react';
import { graphql } from 'gatsby';
import withSize from 'react-size-components';

import Layout from '../components/Layout';
import Head from '../components/Head';
import Hero from '../components/Hero';
import { ProductList } from '../components/Product';

import './collection-products.sass';

class CollectionProducts extends React.Component {
  get node() {
    return this.props.data.wordpressWpCollections;
  }

  get edges() {
    return this.props.data.allWordpressWpShop.edges;
  }

  get image() {
    return this.node.acf.header_image;
  }

  get title() {
    return this.node.name.replace(/\s/gi, '\u00A0');
  }

  render() {
    return (
      <React.Fragment>
        <Head
          location={this.props.location}
          title={this.title}
          image={this.image}
        />
        <Layout
          hero={() => (
            <Hero image={this.image} filter={0.5} fill="full">
              <article className="singleCollection_headerText">
                <h2>{this.title}</h2>
                {!this.props.sizes.mobile && (
                  <p>
                    <em>"{this.node.description}"</em>
                  </p>
                )}
              </article>
            </Hero>
          )}
        >
          {this.props.sizes.mobile && (
            <section className="singleCollection">
              <article className="singleCollection_article">
                {/* <h2 className="singleCollection_h2">{this.node.name}</h2> */}
                <p className="singleCollection_description">
                  <em>"{this.node.description}"</em>
                </p>
              </article>
            </section>
          )}
          <ProductList edges={this.edges} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default withSize({
  mobile: true,
})(CollectionProducts);

export const query = graphql`
  query CollectionById($id: String!) {
    wordpressWpCollections(id: { eq: $id }) {
      ...SingleCollectionFragment
      acf {
        header_image {
          localFile {
            publicURL
            ...HeaderImageFragment
          }
        }
      }
    }
    allWordpressWpShop(
      filter: { collections: { elemMatch: { id: { eq: $id } } } }
    ) {
      edges {
        node {
          ...ProductData
        }
      }
    }
  }
`;
