/** @flow */
import * as React from 'react';
import CollectionExcerpt from './CollectionExcerpt';
import { SizeConsumer } from '../Layout';
import { pipe } from 'smalldash';
// styles
import './collection-list.sass';

const reorderDesktop = (length) => (arr) =>
  arr.map(({ node }) => {
    let sort;

    // this major sucks
    // TODO: add algorithm for column reordering
    switch (node.acf.order) {
      case '1':
        sort = 1;
        break;
      case '2':
        sort = 4;
        break;
      case '3':
        sort = 2;
        break;
      case '4':
        sort = 5;
        break;
      case '5':
        sort = 3;
        break;
      default:
        sort = node.acf.order;
        break;
    }

    return { node: { ...node, sort } };
  });

const reorderMobile = (arr) =>
  arr.map(({ node }) => ({ node: { ...node, sort: node.acf.order } }));

const sortCollections = (arr) =>
  arr.slice().sort(({ node: prevNode }, { node }) => prevNode.sort - node.sort);

const mapCollections = (arr) =>
  arr.map(({ node }) => <CollectionExcerpt key={node.id} node={node} />);

/** Renders a list of collections */
const CollectionList = ({ edges }) => (
  <SizeConsumer>
    {(sizes) => (
      <React.Fragment>
        <h3 className="collections_h3">Collections</h3>
        <section className="collections">
          <p className="collections_description">
            Collections are ceramic items that are grouped by technique, color
            and or material. Items in a collection are made to work easily with
            one another but feel free to mix and match if it suits your taste!
          </p>
        </section>
        <section className="collectionList">
          {pipe(
            ...[
              // dynamically add the reordering array function on desktop layouts
              sizes.mobile ? reorderMobile : reorderDesktop(edges.length),
              sortCollections,
              mapCollections,
            ]
          )(edges)}
        </section>
      </React.Fragment>
    )}
  </SizeConsumer>
);

export default CollectionList;
