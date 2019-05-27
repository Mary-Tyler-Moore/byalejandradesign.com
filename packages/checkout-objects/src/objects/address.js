import defaults from './defaults';

const address = {
  firstName: defaults('', 'Nick'),
  lastName: defaults('', 'Myers'),
  streetAddress1: defaults('', '1000 8th St. W'),
  streetAddress2: defaults('', 'Apt. 1C'),
  city: defaults('', 'Charleston'),
  // must define default country **important**
  countryCode: defaults('US', 'US'),
  postalCode: defaults('', '25301'),
  province: defaults('', 'WV'),
  phone: defaults('', '516-123-1230'),
};

export default address;
