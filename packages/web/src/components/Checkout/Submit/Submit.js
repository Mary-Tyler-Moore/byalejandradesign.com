/** @flow */
import * as React from 'react';
import { Link, navigate } from 'gatsby';
import { connect } from 'react-redux';
// components
import { StatusSwitch } from '@njmyers/component-library';
import Button from '../../Button';
import CartContents from '../../CartContents';
import { createAddressDisplay } from '../create-address';
import Loading from '../../Loading';
// actions
import { emptyCart } from '../../Cart/cart-actions';
// api
import server from '../server';
// util
import {
  addressToServerAddress,
  orderId,
} from '@byalejandradesign/checkout-objects';
// styles
import './submit.sass';

import type { allWordpressWpShop } from '@byalejandradesign/data-objects';
import type {
  Transaction,
  LineItem,
  Address,
} from '@byalejandradesign/checkout-objects';

const ShippingAddress = createAddressDisplay('shippingAddress');
const BillingAddress = createAddressDisplay('billingAddress');

type Props = {
  data: { allWordpressWpShop: allWordpressWpShop },
  billingAddress: Address,
  shippingAddress: Address,
};

type State = {
  total: number,
  status: 'initial' | 'loading' | 'error' | 'resolved',
};

class Submit extends React.PureComponent<Props, State> {
  state = {
    total: 0,
    status: 'resolved',
  };

  paymentMethodDisplay = () => {
    switch (this.props.payment.method) {
      case 'paypal':
        return 'Paypal';
      case 'hostedFields':
        return 'Credit Card';
      case 'venmo':
        return 'Venmo';
      default:
        return 'No Payment Method Selected';
    }
  };

  paymentMethodDetailsDisplay = () => {
    switch (this.props.payment.method) {
      case 'paypal':
        return (
          <React.Fragment>
            <p>
              <strong>Paypal Account: </strong>
              {`${this.props.payment.nonce.details.firstName} ${
                this.props.payment.nonce.details.lastName
              }`}
            </p>
            <p>
              <strong>Paypal Email: </strong>
              {this.props.payment.nonce.details.email}
            </p>
          </React.Fragment>
        );
      case 'hostedFields':
        return (
          <React.Fragment>
            <p>
              <strong>Card Type: </strong>
              {this.props.payment.nonce.details.cardType}
            </p>
            <p>
              <strong>Ending In: </strong>
              {this.props.payment.nonce.details.lastFour}
            </p>
          </React.Fragment>
        );
      case 'venmo':
        return 'Venmo';
      default:
        return null;
    }
  };

  generateProductName = (node) => {
    return `${
      node.collections[0].slug
    }-${node.acf.display_title.toLowerCase().replace(' ', '-')}`.slice(0, 35);
  };

  lineItems = (): Array<LineItem> => {
    return this.props.cart.products.map((product) => {
      const { node } = this.props.data.allWordpressWpShop.edges.find(
        ({ node }) => node.id === product.id
      );

      return {
        name: this.generateProductName(node),
        // max character count
        description: node.acf.description.slice(0, 127),
        quantity: product.quantity,
        unitAmount: Number(node.acf.price),
        totalAmount: Number(node.acf.price) * product.quantity,
        kind: 'debit',
        // url:
      };
    });
  };

  transaction = (): Transaction => ({
    paymentMethodNonce: this.props.payment.nonce.nonce,
    amount: this.state.total,
    shipping: addressToServerAddress(this.props.shippingAddress),
    billing: addressToServerAddress(
      this.props.billingAddress
        ? this.props.billingAddress
        : this.props.shippingAddress
    ),
    customer: {
      email: this.props.payment.email,
      firstName: this.props.shippingAddress.firstName,
      lastName: this.props.shippingAddress.lastName,
      phone: this.props.shippingAddress.phone,
    },
    lineItems: this.lineItems(),
    orderId: orderId(),
  });

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      status: 'loading',
    });

    const transaction = this.transaction();

    server
      .post('/submit', transaction)
      .then((response) => {
        this.setState({
          status: 'resolved',
        });
        navigate('/checkout/confirmation', {
          state: { ...transaction },
        });
      })
      .catch((error) => {
        this.setState({
          status: 'error',
        });
        console.log(error);
      });
  };

  render() {
    return (
      <StatusSwitch
        status={this.state.status}
        loading={Loading}
        error={() => <p>error</p>}
      >
        <section className="orderSubmit">
          <section className="orderSubmit_cartSection">
            <h4 className="h4-amiri">Order Contents</h4>
            <CartContents totalCallback={(total) => this.setState({ total })} />
          </section>
          {this.props.cart.products.length > 0 ? (
            <React.Fragment>
              <section className="orderSubmit_contactSection">
                <h4 className="h4-amiri">Contact Info</h4>
                <p>
                  <strong>Phone: </strong>
                  {this.props.shippingAddress.phone}
                </p>
                <p>
                  <strong>Email: </strong>
                  {this.props.payment.email}
                </p>
              </section>
              <section className="orderSubmit_addressSection">
                <h4 className="h4-amiri">Address</h4>
                <div className="orderSubmit_addressGrid">
                  <ShippingAddress />
                  {this.props.payment.billingAddress ? (
                    <ShippingAddress />
                  ) : (
                    <BillingAddress />
                  )}
                </div>
              </section>
              <section className="orderSubmit_paymentSection">
                <h4 className="h4-amiri">Payment Details</h4>
                <p>
                  <strong>Payment Method: </strong>{' '}
                  {this.paymentMethodDisplay()}
                </p>
                {this.paymentMethodDetailsDisplay()}
              </section>
              <section className="orderSubmit_statusSection">
                <Button fullWidth onClick={this.onSubmit}>
                  Submit Order
                </Button>
              </section>
            </React.Fragment>
          ) : (
            <Link to="/shop" className="link-reset">
              <Button fullWidth margin>
                Continue Shopping
              </Button>
            </Link>
          )}
        </section>
      </StatusSwitch>
    );
  }
}

const mapStateToProps = ({ checkout, cart }) => ({
  cart: cart,
  shippingAddress: checkout.shippingAddress,
  billingAddress: checkout.billingAddress,
  payment: checkout.payment,
  braintree: checkout.braintree,
});

const mapDispatchToProps = (dispatch) => ({
  emptyCart: () => dispatch(emptyCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Submit);
