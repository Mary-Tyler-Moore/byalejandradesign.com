import * as React from 'react';
import withSize from 'react-size-components';
import { dollarString } from 'smalldash';
import Img from 'gatsby-image';
import Button from '../Button';
// styles
import './single-product.sass';
import title from './title.js';

const SingleProductDesktop = ({ node, addOneToCart } = {}) => (
  <article className="singleProductDesktop">
    <aside className="singleProductDesktop_img">
      <Img sizes={node.acf.main_image.localFile.childImageSharp.sizes} />
    </aside>
    <aside className="singleProductDesktop_">
      <h1>{title(node)}</h1>
      <p>{node.acf.description}</p>
      <p>{dollarString(node.acf.price)}</p>
      <p>Quantity Available: {node.acf.quantity}</p>
      <Button onClick={addOneToCart} name={node.id}>
        Add To Cart
      </Button>
    </aside>
  </article>
);

export default SingleProductDesktop;
