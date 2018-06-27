import * as React from 'react';
import withSize from 'react-size-components';
import { dollarString } from 'smalldash';
import Img from 'gatsby-image';
import Button from '../Button';
import { BEM } from 'njmyers-component-library';
// styles
import './single-product.sass';
import title from './title.js';

const SingleProduct = ({ node, addOneToCart } = {}) => (
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

export default SingleProduct;
