import * as React from 'react';
import { LazyImage } from 'njmyers-component-library';
import { dollarString } from 'smalldash';
import Button from '../Button';
// style
import './product.sass';

const Product = ({ data, onClick }) => {
  return (
    <article className="productLink">
      <LazyImage
        className="productLinkPhoto"
        src={data.acf.main_image.sizes.medium_large}
      />
      <h3 className="productLink_title">
        {data.acf.display_title ? data.acf.display_title : data.title.rendered}
      </h3>
      <p className="productLink_price">{dollarString(data.acf.price)}</p>
      <Button onClick={onClick} name={data.id}>
        Add to Cart
      </Button>
    </article>
  );
};

export default Product;
