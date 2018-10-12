import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Form } from '@njmyers/component-library';
import { dollarString } from 'smalldash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// actions
import withCart from '../Cart/with-cart';
import title from '../Product/title';
import type { State } from './cart-reducer';
// utils
import getQuantity from '../Product/get-quantity';
// styles
import './cart-contents.sass';

type Props = {
  cart: State,
  editable: boolean,
};

class CartContents extends React.PureComponent<Props> {
  /**
   * Safely reduce cart total price to number values
   * @return {number} total price of cart
   */
  reduceTotal = (data) => {
    const total =
      this.props.cart.products.length > 0
        ? this.props.cart.products
            .map((product) => {
              const price = this.getNodeByID(product.id, data).acf.price;
              return price * product.quantity;
            })
            .reduce((a, b) => a + b)
        : 0;

    if (this.props.totalCallback) {
      this.props.totalCallback(total);
    }

    return total;
  };

  getNodeByID = (id, data) => {
    // find product info from query data
    // Note the destructuring of the node from graph data
    const { node } = data.allWordpressWpShop.edges.find(
      ({ node }) => node.id === id
    );

    return node;
  };

  onClick = (id, num) => (event) => {
    const product = this.props.cart.products.find(
      (product) => id === product.id
    );

    this.props.updateCartQuantityDirectly({
      id,
      quantity: product.quantity + num,
    });
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
          query AllShopProducts {
            allWordpressWpShop {
              edges {
                node {
                  ...ProductData
                }
              }
            }
          }
        `}
        render={(data) => (
          <React.Fragment>
            <section className="cartContents">
              {this.props.cart.products.length > 0 &&
                Object.values(this.props.cart.products).map((product) => {
                  const node = this.getNodeByID(product.id, data);
                  const quantity = getQuantity(node, this.props.cart.products);
                  // map node product info to values
                  return (
                    <section key={product.id} className="cartItem">
                      <Img
                        fluid={
                          node.acf.main_image.localFile.childImageSharp.fluid
                        }
                      />
                      <div className="cartItem_middle">
                        <h5 className="cartItem_h5">{title(node)}</h5>
                        <p className="body-sourceSans-2">
                          {node.acf.description}
                        </p>
                        <div className="cartItem_floatDown">
                          <p>
                            <strong>Quantity: </strong>
                            {product.quantity}
                            {this.props.editable && (
                              <span className="cartItem_quantityUpdate">
                                {quantity > 0 && (
                                  <FontAwesomeIcon
                                    className="cartItem_chevron"
                                    onClick={this.onClick(product.id, 1)}
                                    icon="chevron-up"
                                  />
                                )}
                                <FontAwesomeIcon
                                  className="cartItem_chevron"
                                  onClick={this.onClick(product.id, -1)}
                                  icon="chevron-down"
                                />
                              </span>
                            )}
                          </p>
                          <p>
                            <strong>Price: </strong>
                            {dollarString(node.acf.price)}
                          </p>
                        </div>
                      </div>
                      <div className="cartItem_end cartItem_floatDown">
                        <p>
                          <strong>Subtotal: </strong>
                          {dollarString(product.quantity * node.acf.price)}
                        </p>
                      </div>
                    </section>
                  );
                })}
            </section>
            {this.props.cart.products.length > 0 ? (
              <p className="cartContents_total">
                <strong>Total: </strong>
                {dollarString(this.reduceTotal(data))}
              </p>
            ) : (
              <p className="body-sourceSans-2">
                Oh no you have nothing in your cart!
              </p>
            )}
          </React.Fragment>
        )}
      />
    );
  }
}

export default withCart(CartContents);
