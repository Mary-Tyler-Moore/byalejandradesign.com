/**
 * Fallback to title if no display title
 * @param  {object} wordpressWpShop data object from graphql query
 */
const title = (node) =>
  node.acf.display_title ? node.acf.display_title : node.title;

export default title;
