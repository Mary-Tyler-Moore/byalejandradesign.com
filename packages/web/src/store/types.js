import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

import type { State as CartState } from '../components/Cart/cart-reducer';
import type { Actions as CartActions } from '../components/Cart/cart-actions';

import type { State as AddressState } from '../components/Address/address-reducer';
import type { Actions as AddressActions } from '../components/Address/address-actions';

import type { State as BraintreeState } from '../components/PaymentMethods/Braintree/braintree-reducer';
import type { Actions as BraintreeActions } from '../components/PaymentMethods/Braintree/braintree-actions';

import type { State as PaymentState } from '../components/PaymentMethods/payment-methods-reducer';
import type { Actions as PaymentActions } from '../components/PaymentMethods/payment-methods-actions';

export type State = AddressState & BraintreeState & PaymentState & CartState;

export type Actions =
  | AddressActions
  | BraintreeActions
  | PaymentActions
  | CartActions;

export type Store = ReduxStore<State, Actions>;

export type Dispatch = ReduxDispatch<Actions>;
