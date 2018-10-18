/** @flow */
import * as React from 'react';
import Line from '../Line';
import ServerAddress from '../ServerAddress';
import Customer from '../Customer';
// defaults
import { transaction } from '@artetexture/checkout-objects';
// types
import type { Transaction } from '@artetexture/checkout-objects';
import { camelToTitle } from 'smalldash';

export type Props = {
  transaction: Transaction,
};

class OrderConfirmation extends React.Component<Props> {
  static defaultProps = {
    transaction: transaction,
  };

  render() {
    return (
      <section className="confirmation">
        <h3 className="h3-amiri">Order Confirmation</h3>
        {this.props.transaction.orderId && (
          <section>
            <Line label="orderNumber">{this.props.transaction.orderId}</Line>
          </section>
        )}
        <Customer customer={this.props.transaction.customer} />
        <ServerAddress
          address={this.props.transaction.shipping}
          label="Shipping Address"
        />
        <ServerAddress
          address={this.props.transaction.billing}
          label="Billing Address"
        />
      </section>
    );
  }
}

export default OrderConfirmation;
