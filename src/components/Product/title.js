// @flow
import type { ProductNode } from './types';

/**
 * Fallback to title if no display title
 * @param  {object} wordpressWpShop data object from graphql query
 */
const title = (node: ProductNode) =>
  node.acf.display_title ? node.acf.display_title : node.title;

export default title;
