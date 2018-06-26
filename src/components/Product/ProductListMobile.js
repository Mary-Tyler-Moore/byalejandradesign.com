import * as React from 'react';
import Img from 'gatsby-image';
import withSize from 'react-size-components';
import Button from '../Button';
// helpers
import { dollarString } from 'smalldash';
// style
import './product-list.sass';

const ProductListMobile = ({ node, onClick }) => (
  <article className="productLink">
    <Img sizes={node.acf.main_image.localFile.childImageSharp.sizes} />
    <h3 className="productLink_title">
      {node.acf.display_title ? node.acf.display_title : node.title.rendered}
    </h3>
    <p className="productLink_price">{dollarString(node.acf.price)}</p>
    <Button onClick={onClick} name={node.id}>
      Add to Cart
    </Button>
  </article>
);

export default ProductListMobile;
