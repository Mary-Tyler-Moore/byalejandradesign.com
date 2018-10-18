/** @flow */
export type CreditCardNonce = {
  binData: {
    prepaid: string,
  },
  description: string,
  details: {
    cardType: string,
    lastFour: string,
    lastTwo: string,
  },
  nonce: string,
  type: 'CreditCard',
};

const creditCardNonce = {
  binData: {
    prepaid: '',
  },
  description: '',
  details: {
    cardType: '',
    lastFour: '',
    lastTwo: '',
  },
  nonce: '',
  type: 'CreditCard',
};

export default creditCardNonce;
