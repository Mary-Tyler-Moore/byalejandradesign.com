// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, dollarString } from 'smalldash';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
// actions
import withCart from './with-cart';
import title from '../Product/title';
import type { CartType } from './cart-reducer';
import { BEM } from 'njmyers-component-library';

import './cart.sass';

type Props = {
  edges: Array<{}>,
  cart: CartType,
  sizes: {
    mobile: boolean,
  },
};

class Cart extends React.PureComponent<Props> {
  /**
   * Safely reduce cart total price to number values
   * @return {number} total price of cart
   */
  reduceTotal = () => {
    return this.props.cart.products.length > 0
      ? this.props.cart.products
          .map((product) => {
            const price = this.getNodeByID(product.id).acf.price;
            return price * product.quantity;
          })
          .reduce((a, b) => a + b)
      : 0;
  };

  getNodeByID = (id) => {
    // find product info from query data
    // Note the destructuring of the node from graph data
    const { node } = this.props.edges.find(({ node }) => node.id === id);

    return node;
  };

  render() {
    return (
      <BEM
        block="cart"
        modifiers={this.props.sizes.mobile ? 'mobile' : 'desktop'}
      >
        <aside>
          <h2 element="h2">This is your cart contents</h2>
          <section element="contents">
            {this.props.cart.products.length > 0 &&
              Object.values(this.props.cart.products).map((product) => {
                const node = this.getNodeByID(product.id);
                // map node product info to values
                return (
                  <BEM
                    block="cartItem"
                    modifiers={this.props.sizes.mobile ? 'mobile' : 'desktop'}
                    key={product.id}
                  >
                    <article>
                      <div element="image">
                        <Img
                          sizes={
                            node.acf.main_image.localFile.childImageSharp.sizes
                          }
                        />
                      </div>
                      <div element="text">
                        <Link element="title" to={`/shop/${node.slug}`}>
                          <h4 element="title">{title(node)}</h4>
                        </Link>
                        <p element="price">{dollarString(node.acf.price)}</p>
                        <p element="quantity">Quantity: {product.quantity}</p>
                        <p element="subTotal">
                          Subtotal:{' '}
                          {dollarString(product.quantity * node.acf.price)}
                        </p>
                      </div>
                    </article>
                  </BEM>
                );
              })}
            <p>Total: {dollarString(this.reduceTotal())}</p>
          </section>
          <Link to="/checkout/shipping-address">
            <button>Checkout</button>
          </Link>
        </aside>
      </BEM>
    );
  }
}

export default withCart(Cart);
