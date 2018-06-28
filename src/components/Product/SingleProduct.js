// @flow
import * as React from 'react';
import Img from 'gatsby-image';
import Button from '../Button';
import { BEM } from 'njmyers-component-library';
import { withCart } from '../Cart';
// styles
import './single-product.sass';
// string helpers
import { dollarString } from 'smalldash';
import title from './title.js';
// types
import type { ProductNode } from './types';

type Props = {
  node: ProductNode,
  addOneToCart: () => null,
  sizes: {
    mobile: boolean,
  },
};

/**
 * Displays single product
 * @param {ProductNode} node      graphql node of shop product
 * @param {function} addOneToCart  redux connect function to add to cart
 */
const SingleProduct = ({ node, addOneToCart }: Props) => (
  <BEM block="singleProduct">
    <article>
      <aside element="img">
        <Img sizes={node.acf.main_image.localFile.childImageSharp.sizes} />
      </aside>
      <aside element="content">
        <h1 element="h1">{title(node)}</h1>
        <p element="description">{node.acf.description}</p>
        <p element="price">{dollarString(node.acf.price)}</p>
        <p element="quantity">Quantity Available: {node.acf.quantity}</p>
        <Button element="button" onClick={addOneToCart} name={node.id}>
          Add To Cart
        </Button>
      </aside>
    </article>
  </BEM>
);

export default withCart(SingleProduct);
