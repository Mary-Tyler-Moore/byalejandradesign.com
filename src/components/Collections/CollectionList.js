import * as React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import Button from '../Button';
import './collection-list.sass';
// types
import type { CollectionEdges } from './types';

type Props = {
  edges: CollectionEdges,
};

/**
 * Renders a list of collections
 */
class CollectionList extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <section className="collections">
          <h2 className="collections_h2">Collections</h2>
          <p className="collections_description">
            Here we should put some nice text. Explaining how all of the
            products are divided into collections based on their colors,
            textures and use.
          </p>
        </section>
        <section className="collectionList">
          {this.props.edges.map(({ node }) => (
            <article className="collectionList_article" key={node.id}>
              <h4 className="collectionList_h4">{node.name}</h4>
              <Link
                className="collectionList_imgLink"
                to={`/shop/collection/${node.slug}`}
              >
                <figure className="collectionList_img">
                  <Img fluid={node.acf.image.localFile.childImageSharp.fluid} />
                </figure>
              </Link>
              <p className="collectionList_description">{node.description}</p>
              <Link
                className="collectionList_buttonLink"
                to={`/shop/collection/${node.slug}`}
              >
                <Button>View Collection</Button>
              </Link>
            </article>
          ))}
        </section>
      </React.Fragment>
    );
  }
}

export default CollectionList;
