declare module '@artetexture/checkout-objects' {
  /** different types of address formats */
  declare export type Address = {
    +firstName: string,
    +lastName: string,
    +streetAddress1: string,
    +streetAddress2: string,
    +city: string,
    +countryCode: string,
    +postalCode: string,
    +province: string,
    +phone: string,
  };

  declare export type ServerAddress = {
    +firstName: string,
    +lastName: string,
    +streetAddress: string,
    +extendedAddress: string,
    +locality: string,
    +region: string,
    +postalCode: string,
    +countryCodeAlpha2: string,
  };

  declare export type PaypalAddress = {
    +recipientName: string,
    +line1: string,
    +line2: string,
    +city: string,
    +state: string,
    +postalCode: string,
    +countryCode: string,
  };

  /** different types of nonce formats */
  declare export type CreditCardNonce = {
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

  declare export type PaypalNonce = {
    details: {
      countryCode: string,
      email: string,
      firstName: string,
      lastName: string,
      payerId: string,
    },
    shippingAddress: {},
    nonce: string,
    type: 'PayPalAccount',
  };

  /** parts of a transaction type */
  declare export type Customer = {
    +email: string,
    +firstName: string,
    +lastName: string,
    +phone: string,
  };

  declare export type LineItem = {
    +name: string,
    +productCode: string,
    +description: string,
    +quantity: number,
    +unitAmount: number,
    +totalAmount: number,
    +kind: 'debit' | 'credit',
  };

  declare export type Transaction = {
    +paymentMethodNonce: {},
    +shipping: ServerAddress,
    +billing: ServerAddress,
    +customer: Customer,
    +lineItems: Array<LineItem>,
    +orderId: string,
  };
}
