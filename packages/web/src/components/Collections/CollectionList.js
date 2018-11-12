/** @flow */
import * as React from 'react';
import CollectionExcerpt from './CollectionExcerpt';
import './collection-list.sass';

/** Renders a list of collections */
const CollectionList = ({ edges }) => (
  <React.Fragment>
    <h3 className="collections_h3">Collections</h3>
    <section className="collections">
      <p className="collections_description">
        Collections are ceramic items that are grouped by technique, color and
        or material. Items in a collection are made to work easily with one
        another but feel free to mix and match if it suits your taste!
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
