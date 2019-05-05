import * as React from 'react';
import { graphql } from 'gatsby';
import { CollectionList } from '../../components/Collections';
import Layout from '../../components/Layout';
import Head from '../../components/Head';
import Hero from '../../components/Hero';

class CollectionEdges extends React.Component {
  get title() {
    return 'Collections';
  }

  get edges() {
    return this.props.data.allWordpressWpCollections.edges
      .slice()
      .sort((a, b) => parseInt(a.node.acf.order) - parseInt(b.node.acf.order));
  }

  get image() {
    return this.edges
      .filter(({ node }) => node.acf.header_image)
      .reduce((a, b) => (Math.random() >= 0.5 ? a : b)).node.acf.header_image;
  }

  render() {
    return (
      <React.Fragment>
        <Head location={this.props.location} title={this.title} />
        <Layout
          location={this.props.location}
          hero={() => <Hero image={this.image} filter={0.3} />}
        >
          <CollectionList edges={this.edges} />
        </Layout>
      </React.Fragment>
    );
  }
}

export default CollectionEdges;

export const query = graphql`
  query AllCollections {
    allWordpressWpCollections {
      edges {
        node {
          ...CollectionExcerptFragment
          acf {
            header_image {
              localFile {
                ...HeaderImageFragment
              }
            }
          }
        }
      }
    }
  }
`;
