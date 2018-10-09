export type State = {
  +paymentMethod: '' | 'paypal' | 'creditCard' | 'venmo',
  +billingIsShipping: number,
};

const brainTree: State = {
  paymentMethod: '',
  billingIsShipping: false,
};

const flowReducer = (state, action) => {
  switch (action.type) {
    case '@FLOW/CHOOSE_PAYMENT_METHOD':
    case '@FLOW/BILLING_EQUALS_SHIPPING':
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};
