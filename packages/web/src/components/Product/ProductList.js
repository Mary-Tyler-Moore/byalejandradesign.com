/** @flow */
import * as React from 'react';
import { Link } from 'gatsby';
import { withCart } from '../Cart';
import Button from '../Button';
import FluidImage from '../FluidImage';
// helpers
import title from './title';
import { dollarString } from 'smalldash';
import getQuantity from './get-quantity';
import stringifyDimensions from './stringify-dimensions';
// style
import './product-list.sass';
// types
import type { ProductEdges } from 'data';

type Props = {
  edges: ProductEdges,
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
const ProductList = ({ edges, addOneToCart, sizes, cart }: Props) => (
  <section className="grid-products">
    {edges.map(({ node }) => {
      const quantity = getQuantity(node, cart.products);

      return (
        <article key={node.id}>
          <FluidImage
            to={`/shop/${node.slug}`}
            localFile={node.acf.main_image.localFile}
          />
          <Link className="productListItem_textLink" to={`/shop/${node.slug}`}>
            <h5 className="productListItem_h5">{title(node)}</h5>
          </Link>
          {/* <Size node={node} /> */}
          <p className="productListItem_textLine">
            <span>
              <strong>Price: </strong>
              <span className={quantity < 1 ? 'productListItem-strike' : ''}>
                {dollarString(node.acf.price)}
              </span>
              {quantity < 1 && <span> Sold Out!</span>}
            </span>
            <span>
              <strong>Size: </strong>
              {stringifyDimensions(node.acf.dimensions)}
            </span>
          </p>
          <Button
            className="button-yellow ripple-grey"
            fullWidth
            onClick={quantity > 0 ? addOneToCart : null}
            name={node.id}
          >
            Add to Bag
          </Button>
        </article>
      );
    })}
  </section>
);

export default withCart(ProductList);
