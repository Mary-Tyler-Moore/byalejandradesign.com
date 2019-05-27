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
      this.props.lineItems.length > 0 && (
        <section className="lineItems">
          <h5 className="headline">Items</h5>
          <table cellspacing="0" cellpadding="0" className="lineItems_table">
            <thead className="lineItems_thead">
              <tr className="lineItems_tr">
                <th className="lineItems_th lineItems_th-first">Description</th>
                <th className="lineItems_th">Unit Price</th>
                <th className="lineItems_th">Quantity</th>
                <th className="lineItems_th">Amount</th>
              </tr>
            </thead>
            <tbody className="lineItems_tbody">
              {this.props.lineItems.map((item) => (
                <tr className="lineItems_tr" key={item.name}>
                  <td className="lineItems_td lineItems_td-first">
                    {kebabToTitle(item.name)}
                  </td>
                  <td className="lineItems_td">
                    {dollarString(item.unitAmount)}
                  </td>
                  <td className="lineItems_td">{item.quantity}</td>
                  <td className="lineItems_td">
                    {dollarString(item.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )
    );
  }
}

export default LineItems;
