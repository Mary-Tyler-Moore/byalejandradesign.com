import * as React from 'react';
import withSize from 'react-size-components';
import { dollarString } from 'smalldash';
import Img from 'gatsby-image';
import Button from '../Button';
// styles
import './single-product.sass';
import title from './title';

const SingleProductMobile = ({ node, addOneToCart } = {}) => (
  <article className="singleProductMobile">
    <aside>
      <Img sizes={node.acf.main_image.localFile.childImageSharp.sizes} />
    </aside>
    <aside>
      <h1>{title(node)}</h1>
      <p>{node.acf.description}</p>
      <p>{dollarString(node.acf.price)}</p>
      <p>Quantity Available: {node.acf.quantity}</p>
      <Button onClick={addOneToCart} name={node.id}>
        Add To Cart
      </Button>{' '}
    </aside>
  </article>
);

export default SingleProductMobile;
