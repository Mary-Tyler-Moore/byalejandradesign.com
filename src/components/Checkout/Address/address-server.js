import { ajax } from 'rxjs/observable/dom/ajax';

export default (body) =>
  ajax.post(`${process.env.REACT_APP_BRAINTREE_URL}/address_validation`, body);
