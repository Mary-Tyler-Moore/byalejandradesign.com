import defaults from './defaults';

const customer = {
  email: defaults('', 'nick@email.com'),
  firstName: defaults('', 'Nick'),
  lastName: defaults('', 'Myers'),
  phone: defaults('', '212-192-1222'),
};

export default customer;
