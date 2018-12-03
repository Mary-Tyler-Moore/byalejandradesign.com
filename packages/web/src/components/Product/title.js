/** @flow */
import type { ProductNode } from '@byalejandradesign/data-objects';

/**
 * Fallback to title if no display title
 * @param  {object} wordpressWpShop data object from graphql query
 */
const titleFromProduct = (node: ProductNode) =>
  node.acf.display_title ? node.acf.display_title : node.title;

export default titleFromProduct;
