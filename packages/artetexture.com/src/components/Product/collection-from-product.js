/** @flow */
import type { CollectionNode, ProductNode } from 'data';

/**
 * Safely retrieve the collection node from a product node
 */
const collectionFromProduct = (node: ProductNode): CollectionNode | null => {
  const { collections } = node;

  if (Array.isArray(collections) && collections.length === 1) {
    return collections[0];
  }

  return null;
};

export default collectionFromProduct;
