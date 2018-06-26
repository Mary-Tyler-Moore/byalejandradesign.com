/**
 * Fallback to title if no display title
 * @param  {object} wordpressWpShop data object from graphql query
 */
const title = (wordpressWpShop) =>
  wordpressWpShop.acf.display_title
    ? wordpressWpShop.acf.display_title
    : wordpressWpShop.title;

export default title;
