/** @flow */
import * as React from 'react';
import Line from '../Line';
// types
import type { Props } from './types';

const Customer = ({ customer }: Props) =>
  customer ? (
    <section className="confirmation_customerSection">
      <h5 className="h5-roboto">Customer</h5>
      <Line label="name">{`${customer.firstName} ${customer.lastName}`}</Line>
      <Line label="email">{customer.email}</Line>
      <Line label="phone">{customer.phone}</Line>
    </section>
  ) : null;

export default Customer;
