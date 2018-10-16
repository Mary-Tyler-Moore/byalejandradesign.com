import * as React from 'react';
import { graphql } from 'gatsby';

import { CollectionList } from '../../components/Collections';
import Layout from '../../components/Layout';

class CollectionEdges extends React.Component {
  /** Filter nodes that don't have header_image */
  headerImage = ({ node }) => node.acf.header_image;

  /** Safely get random header image */
  getHeaderImage = () =>
    this.props.data.allWordpressWpCollections.edges
      .filter(this.headerImage)
      .map(this.headerImage)
      .reduce((a, b) => (Math.random() >= 0.5 ? a : b));

  render() {
    return (
      <Layout headerImage={this.getHeaderImage()}>
        <CollectionList
          edges={this.props.data.allWordpressWpCollections.edges}
        />
      </Layout>
    );
  }
}

export default CollectionEdges;

export const query = graphql`
  query AllCollectionsOr {
    allWordpressWpCollections {
      edges {
        node {
          ...CollectionData
        }
      }
    }
  }
`;
