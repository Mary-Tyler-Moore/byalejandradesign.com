/** @flow */
import * as React from 'react';
import CollectionExcerpt from './CollectionExcerpt';
import GridSection from '../../layouts/GridSection';

const CollectionList = ({ edges }) => (
  <GridSection
    heading={() => 'Collections'}
    copy={() =>
      'Collections are ceramic items that are grouped by technique, color and or material. Items in a collection are made to work easily with one another but feel free to mix and match if it suits your taste!'
    }
  >
    {edges
      .slice()
      .sort((a, b) => parseInt(a.node.acf.order) - parseInt(b.node.acf.order))
      .map(({ node }) => (
        <CollectionExcerpt key={node.id} node={node} />
      ))}
  </GridSection>
);

export default CollectionList;
