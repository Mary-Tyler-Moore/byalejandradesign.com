import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { camelToTitle } from 'smalldash';

import './display-address.sass';

const createDisplayAddress = (slice) => {
  class DisplayAddress extends PureComponent {
    render() {
      return (
        <section>
          <h2 className="displayAddress_title">{camelToTitle(slice)}</h2>
          <article className="displayAddress">
            {Object.keys(this.props[slice]).map((key) => {
              return this.props[slice][key] ? (
                <p key={key} className="displayAddress_paragraph">
                  <span className="displayAddress_key">
                    {camelToTitle(key)}
                  </span>
                  <span className="displayAddress_prop">
                    {this.props[slice][key]}
                  </span>
                </p>
              ) : null;
            })}
          </article>
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
