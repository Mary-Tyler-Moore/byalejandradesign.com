import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  addOneToCart,
  removeOneFromCart,
  updateCartQuantity,
  updateCartQuantityDirectly,
  emptyCart,
} from '../Cart/cart-actions';

import RecursiveAPI from '../RecursiveAPIV2';

import { compose } from 'smalldash';

import Product from './Product';
import StoreSidebar from './Sidebar';

import './store.sass';

const Products = ({ onClick, shop }) => (
  <section className="products">
    {shop.data.map((product) => <Product key={product.id} data={product} />)}
  </section>
);

class Store extends PureComponent {
  handleClick = (event) => {
    this.props.addOneToCart(event.target.name);
  };

  render() {
    console.log(this.props.shop);
    return (
      <section className="store">
        <StoreSidebar collections={this.props.collections.data} />
        <Products shop={this.props.shop} onClick={this.handleClick} />
      </section>
    );
  }
}

const mapStateToProps = (store) => ({
  cart: store.cart,
});

const mapDispatchToProps = (dispatch) => ({
  addOneToCart: (id) => dispatch(addOneToCart(id)),
  removeOneFromCart: (id) => dispatch(removeOneFromCart(id)),
  updateCartQuantity: (obj) => dispatch(updateCartQuantity(obj)),
  updateCartQuantityDirectly: (obj) =>
    dispatch(updateCartQuantityDirectly(obj)),
  emptyCart: () => dispatch(emptyCart),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  RecursiveAPI(['shop', 'ceramics', 'paintings', 'sizes', 'collections'])
)(Store);
