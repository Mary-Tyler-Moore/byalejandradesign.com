// @flow
import * as React from 'react';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import { withCart } from '../Cart';
import { BEM } from 'njmyers-component-library';
import Button from '../Button';
// helpers
import title from './title';
import { dollarString } from 'smalldash';
// style
import './product-list.sass';
// types
import type { Props } from './types';

/**
 * Displays list of products
 * @param {ProductNode} node      graphql node of shop product
 * @param {function} addOneToCart  redux connect function to add to cart
 */
const ProductList = ({ node, addOneToCart }: Props) => (
  <BEM block="productLink">
    <article>
      <Link element="imgLink" to={`/shop/${node.slug}`}>
        <Img
          className="productLink_img"
          sizes={node.acf.main_image.localFile.childImageSharp.sizes}
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
);

export default withCart(ProductList);
