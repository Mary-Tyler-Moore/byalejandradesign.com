export const choosePaymentMethod = (value) => ({
  type: '@FLOW/CHOOSE_PAYMENT_METHOD',
  key: 'paymentMethod',
  value,
});

export const chooseSeperateBilling = (value) => ({
  type: '@FLOW/BILLING_EQUALS_SHIPPING',
  key: 'billingIsShipping',
  value,
});
