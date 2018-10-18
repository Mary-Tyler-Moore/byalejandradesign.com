/** @flow */
import defaults from './defaults';

export type Customer = {
  +email: string,
  +firstName: string,
  +lastName: string,
  +phone: string,
};

const customer: Customer = {
  email: defaults('', 'nick@email.com'),
  firstName: defaults('', 'Nick'),
  lastName: defaults('', 'Myers'),
  phone: defaults('', '212-192-1222'),
};

export default customer;
