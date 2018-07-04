import * as React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { BEM } from 'njmyers-component-library';
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
      <BEM block="collectionList">
        <section>
          {this.props.edges.map(({ node }) => (
            <article element="article" key={node.id}>
              <h2 element="title">{node.name}</h2>
              <Link element="imgLink" to={`/shop/collection/${node.slug}`}>
                <figure className="collectionList_img">
                  <Img fluid={node.acf.image.localFile.childImageSharp.fluid} />
                </figure>
              </Link>
              <p element="description">{node.description}</p>
              <Link element="buttonLink" to={`/shop/collection/${node.slug}`}>
                <Button>View Collection</Button>
              </Link>
            </article>
          ))}
        </section>
      </BEM>
    );
  }
}

export default CollectionList;
