/** @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { camelToTitle } from 'smalldash';
// types
import type { Address } from '@byalejandradesign/checkout-objects';
// styles
import './create-address-display.sass';

type Props = {
  shippingAddress: Address,
  BillingAddress: Address,
  isBillingAddress: boolean,
};

const createAddressDisplay = (slice: string): React.Component<Props> => {
  class DisplayAddress extends React.PureComponent<Props> {
    key = this.props.isBillingAddress ? slice : 'shippingAddress';

    render() {
      return (
        <section className="displayAddress">
          <h5 className="displayAddress_h5">{camelToTitle(slice)}</h5>
          {Object.keys(this.props[this.key]).map((key) => {
            return this.props[slice][key] ? (
              <p key={key} className="displayAddress_paragraph">
                <span>
                  <strong>{camelToTitle(key)}: </strong>
                </span>
                <span>{this.props[slice][key]}</span>
              </p>
            ) : null;
          })}
        </section>
      );
    }
  }

  const mapStateToProps = (state) => ({
    shippingAddress: state.checkout.shippingAddress,
    billingAddress: state.checkout.billingAddress,
    isBillingAddress: state.checkout.payment.billingAddress,
  });

  return connect(mapStateToProps)(DisplayAddress);
};

export default createAddressDisplay;
