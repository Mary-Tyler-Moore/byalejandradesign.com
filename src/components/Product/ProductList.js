// @flow
import * as React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { withCart } from '../Cart';
import { BEM } from 'njmyers-component-library';
import Button from '../Button';
// helpers
import title from './title';
import { dollarString } from 'smalldash';
// style
import './product-list.sass';
// types
import type { ProductNode } from './types';

type Props = {
  edges: Array<{ node: ProductNode }>,
  addOneToCart: () => null,
  sizes: {
    mobile: boolean,
  },
};

/**
 * Displays list of products
 * @param {ProductNode} node      graphql node of shop product
 * @param {function} addOneToCart  redux connect function to add to cart
 */
const ProductList = ({ edges, addOneToCart, sizes }: Props) => (
  <section className="productList">
    {edges.map(({ node }) => (
      <BEM block="productListItem" key={node.id}>
        <article>
          <Link element="imgLink" to={`/shop/${node.slug}`}>
            <Img
              className="productListItem_img"
              fluid={node.acf.main_image.localFile.childImageSharp.fluid}
            />
          </Link>
          <div element="textContainer">
            <Link element="textLink" to={`/shop/${node.slug}`}>
              <h3 className="productLink_title">{title(node)}</h3>
            </Link>
            <p element="price">{dollarString(node.acf.price)}</p>
            <Button element="button" onClick={addOneToCart} name={node.id}>
              Add to Cart
            </Button>
          </div>
        </article>
      </BEM>
    ))}
  </section>
);

export default withCart(ProductList);
