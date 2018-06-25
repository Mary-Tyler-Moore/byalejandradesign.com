import * as React from 'react';
import withSize from 'react-size-components';
import { dollarString, compose } from 'smalldash';
import Img from 'gatsby-image';
import Button from '../Button';
// styles
import './single-product.sass';

/**
 * Fallback to title if no display title
 * @param  {object} wordpressWpShop data object from graphql query
 */
const title = (wordpressWpShop) =>
  wordpressWpShop.acf.display_title
    ? wordpressWpShop.acf.display_title
    : wordpressWpShop.title;

const SingleProductDesktop = ({ data: { wordpressWpShop } }) => (
  <article className="singleProductDesktop">
    <aside className="singleProductDesktop_img">
      <Img
        sizes={wordpressWpShop.acf.main_image.localFile.childImageSharp.sizes}
      />
    </aside>
    <aside className="singleProductDesktop_">
      <h1>{title(wordpressWpShop)}</h1>
      <p>{wordpressWpShop.acf.description}</p>
      <p>{dollarString(wordpressWpShop.acf.price)}</p>
      <p>Quantity Available: {wordpressWpShop.acf.quantity}</p>
      <Button>Add To Cart</Button>
    </aside>
  </article>
);

const SingleProductMobile = ({ data: { wordpressWpShop } }) => (
  <article className="singleProductMobile">
    <aside>
      <Img
        sizes={wordpressWpShop.acf.main_image.localFile.childImageSharp.sizes}
      />
    </aside>
    <aside>
      <h1>{title(wordpressWpShop)}</h1>
      <p>{wordpressWpShop.acf.description}</p>
      <p>{dollarString(wordpressWpShop.acf.price)}</p>
      <p>Quantity Available: {wordpressWpShop.acf.quantity}</p>
      <Button>Add To Cart</Button>
    </aside>
  </article>
);

const SingleProduct = (props) =>
  props.sizes.mobile ? (
    <SingleProductMobile {...props} />
  ) : (
    <SingleProductDesktop {...props} />
  );

export default withSize({ mobile: true })(SingleProduct);

export const query = graphql`
  query ShopItemById($id: String!) {
    wordpressWpShop(id: { eq: $id }) {
      title
      slug
      id
      acf {
        quantity
        price
        sale_price
        description
        product_type
        ceramic {
          name
          slug
        }
        size {
          name
          slug
        }
        collection {
          name
          slug
        }
        additional_images
        video_type
        display_title
        main_image {
          localFile {
            childImageSharp {
              sizes(maxWidth: 800, maxHeight: 600) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
        provided_dimensions
      }
    }
  }
`;
