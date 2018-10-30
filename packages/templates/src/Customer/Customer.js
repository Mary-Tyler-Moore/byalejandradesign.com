/** @flow */
import * as React from 'react';
import Line from '../Line';
// types
import type { Customer as CustomerType } from '@byalejandradesign/checkout-objects';

export type Props = {
  customer: CustomerType,
};

const Customer = ({ customer }: Props) => (
  <section className="confirmation_customerSection">
    <h4 className="h4-amiri">Customer</h4>
    <Line label="name">{`${customer.firstName} ${customer.lastName}`}</Line>
    <Line label="email">{customer.email}</Line>
    <Line label="phone">{customer.phone}</Line>
  </section>
);

export default Customer;
