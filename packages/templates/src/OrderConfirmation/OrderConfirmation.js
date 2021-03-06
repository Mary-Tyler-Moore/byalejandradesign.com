/** @flow */
import * as React from 'react';
import { dollarString } from 'smalldash';
import Line from '../Line';
import LineItems from '../LineItems';
import ServerAddress from '../ServerAddress';
import Customer from '../Customer';
// defaults
import { transaction } from '@byalejandradesign/checkout-objects';
// types
import type { Transaction } from '@byalejandradesign/checkout-objects';
// style
import './order-confirmation.sass';

export type Props = {
  transaction: Transaction,
};

class OrderConfirmation extends React.Component<Props> {
  static defaultProps = {
    transaction,
  };

  render() {
    return (
      <section className="confirmation">
        <h4 className="headline">Order Confirmation</h4>
        <p className="copy-2">
          <em>
            Thank you for your order from byalejandradesign.com! Your order
            details are summarized below.
          </em>
        </p>
        <section>
          <h5 className="headline">Order Info</h5>
          {this.props.transaction.orderId && (
            <Line label="orderNumber">{this.props.transaction.orderId}</Line>
          )}
          <Line label="total">
            {dollarString(this.props.transaction.amount)}
          </Line>
        </section>
        <Customer customer={this.props.transaction.customer} />
        <LineItems lineItems={this.props.transaction.lineItems} />
        <section className="confirmation_grid">
          <ServerAddress
            address={this.props.transaction.shipping}
            label="Shipping Address"
          />
          <ServerAddress
            address={this.props.transaction.billing}
            label="Billing Address"
          />
        </section>
      </section>
    );
  }
}

export default OrderConfirmation;
