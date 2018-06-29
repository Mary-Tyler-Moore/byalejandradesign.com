import { venmo, paypalCheckout, hostedFields } from 'braintree-web';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

export const venmoClient = ({ client, allowNewBrowserTab = true } = {}) =>
  Observable.from(venmo.create({ client, allowNewBrowserTab }));

export const paypalClient = ({ client } = {}) =>
  Observable.from(paypalCheckout.create({ client }));

export const hostedFieldsClient = (options) =>
  Observable.from(hostedFields.create(options));

// /**
//  * Merges braintree client with options to create a payment method instance.
//  * @param {object} action this is a redux action
//  * @param {*} store light store from redux-observable
//  */
// const returnClient = (action: Actions, store) => {
//   // first get the client from the 'light store' available in redux-observable
//   const client = getClient(store);
//   // merge client from store
//   const args = { ...action.options, client };
//   // return observable based on the which instance creation method we are using
//   switch (action.method) {
//     case 'venmo':
//       return venmoClient(args);
//     case 'paypal':
//       return paypalClient(args);
//     case 'hostedFields':
//       return hostedFieldsClient(args);
//     default:
//       return null;
//   }
// };
//
// export default returnClient;
