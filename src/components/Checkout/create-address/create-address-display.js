import * as React from 'react';
import { connect } from 'react-redux';
import { camelToTitle } from 'smalldash';

import './create-address-display.sass';

const createAddressDisplay = (slice) => {
  class DisplayAddress extends React.PureComponent {
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
