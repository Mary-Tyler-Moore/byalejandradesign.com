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
    render() {
      return (
        <section className="displayAddress">
          <h5 className="displayAddress_h5">{camelToTitle(slice)}</h5>
          {Object.keys(this.props.address).map((key) => {
            return this.props.address[key] ? (
              <p key={key} className="displayAddress_paragraph">
                <span>
                  <strong>{camelToTitle(key)}: </strong>
                </span>
                <span>{this.props.address[key]}</span>
              </p>
            ) : null;
          })}
        </section>
      );
    }
  }

  const mapStateToProps = (state) => {
    const stateSlice = state.checkout.payment.billingAddress
      ? slice
      : 'shippingAddress';

    return {
      address: state.checkout[stateSlice],
    };
  };

  return connect(mapStateToProps)(DisplayAddress);
};

export default createAddressDisplay;
