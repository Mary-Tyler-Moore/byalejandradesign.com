/** @flow */
import * as React from 'react';
import Line from '../Line';
import { kebabToTitle, dollarString } from 'smalldash';
// types
import type { Props } from './types';
// styles
import './line-items.sass';

class LineItems extends React.Component<Props> {
  render() {
    return (
      Array.isArray(this.props.lineItems) &&
      this.props.lineItems.length && (
        <section className="lineItems">
          <h5 className="h5-amiri">Items</h5>
          <ul className="lineItems_ul">
            {this.props.lineItems.map((item) => (
              <li className="lineItems_li" key={item.name}>
                <h6 className="h6-amiri">{kebabToTitle(item.name)}</h6>
                <Line label="quantity">{item.quantity}</Line>
                <Line label="price">{dollarString(item.unitAmount)}</Line>
                <Line label="totalPrice">{dollarString(item.totalAmount)}</Line>
              </li>
            ))}
          </ul>
        </section>
      )
    );
  }
}

export default LineItems;
