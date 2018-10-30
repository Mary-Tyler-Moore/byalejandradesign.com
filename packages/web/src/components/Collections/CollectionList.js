/** @flow */
import * as React from 'react';
import CollectionExcerpt from './CollectionExcerpt';
import './collection-list.sass';

/** Renders a list of collections */
const CollectionList = ({ edges }) => (
  <React.Fragment>
    <section className="collections">
      <h3 className="collections_h3">Collections</h3>
      <p className="collections_description">
        Here we should put some nice text. Explaining how all of the products
        are divided into collections based on their colors, textures and use.
      </p>
    </section>
    <section className="collectionList">
      {edges.map(({ node }) => (
        <CollectionExcerpt key={node.id} node={node} />
      ))}
    </section>
  </React.Fragment>
);

export default CollectionList;
