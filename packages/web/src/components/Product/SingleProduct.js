/** @flow */
import * as React from 'react';
import { Link } from 'gatsby';
import Button from '../Button';
import { withCart } from '../Cart';
import SlideShow from '../SlideShow';
// string helpers
import { dollarString } from 'smalldash';
import title from './title.js';
import collectionFromProduct from './collection-from-product';
// types
import type { ProductNode } from '@byalejandradesign/data-objects';
// styles
import './single-product.sass';
// utils
import getQuantity from './get-quantity';
import stringifyDimensions from './stringify-dimensions';

type Props = {
  node: ProductNode,
  addOneToCart: () => null,
  sizes: {
    mobile: boolean,
  },
  cart: {
    products: Array<any>,
  },
};

/**
 * Displays single product
 * @param {ProductNode} node      graphql node of shop product
 * @param {function} addOneToCart  redux connect function to add to cart
 */
class SingleProduct extends React.PureComponent<Props> {
  quantity = () => {
    return getQuantity(this.props.node, this.props.cart.products);
  };

  render() {
    return (
      <article className="singleProduct">
        <SlideShow
          images={[
            this.props.node.acf.main_image,
            ...(this.props.node.acf.additional_images || []),
          ]}
        />
        <section className="singleProduct_content">
          <h4 className="singleProduct_h4">{title(this.props.node)}</h4>
          <p className="singleProduct_description">
            {this.props.node.acf.description}
          </p>
          <aside className="singleProduct_bottomSection">
            <p className="singleProduct_dimensions">
              <strong>Dimensions: </strong>
              <span>{stringifyDimensions(this.props.node.acf.dimensions)}</span>
            </p>
            <p className="singleProduct_monetary">
              <span>
                <strong>Price: </strong>
                <span
                  className={this.quantity() < 1 ? 'singleProduct-strike' : ''}
                >
                  {dollarString(this.props.node.acf.price)}
                </span>
                {this.quantity() < 1 && <span> Sold Out</span>}
              </span>
              <span className="singleProduct_quantity">
                Quantity Available: {this.quantity()}
              </span>
            </p>
            <Button
              className="button-yellow ripple-grey"
              fullWidth
              margin
              onClick={this.quantity() > 0 ? this.props.addOneToCart : null}
              name={this.props.node.id}
            >
              Add To Cart
            </Button>
            {this.props.node.collections && (
              <Link
                className="singleProduct_buttonLink"
                to={`/shop/collection/${
                  collectionFromProduct(this.props.node).slug
                }`}
              >
                <Button fullWidth margin className="button-grey">
                  Shop this Collection
                </Button>
              </Link>
            )}
          </aside>
        </section>
      </article>
    );
  }
}

export default withCart(SingleProduct);
