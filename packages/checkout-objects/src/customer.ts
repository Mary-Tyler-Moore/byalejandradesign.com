import developmentDefault from './development-default';

export interface Customer {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const customer: Customer = {
  email: developmentDefault('', 'nick@email.com'),
  firstName: developmentDefault('', 'Nick'),
  lastName: developmentDefault('', 'Myers'),
  phone: developmentDefault('', '212-192-1222'),
};

export default customer;
