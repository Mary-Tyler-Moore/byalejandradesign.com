import * as React from 'react';
import { connect } from 'react-redux';
import { camelToTitle } from 'smalldash';

import './display-address.sass';

const createDisplayAddress = (slice) => {
  class DisplayAddress extends React.PureComponent {
    render() {
      return (
        <section className="displayAddress">
          <h5 className="displayAddress_h5">{camelToTitle(slice)}</h5>
          {Object.keys(this.props[slice]).map((key) => {
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
    [slice]: state.checkout[slice],
  });

  const mapDispatchToProps = {};

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(DisplayAddress);
};

export default createDisplayAddress;
