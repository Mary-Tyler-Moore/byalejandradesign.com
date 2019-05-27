const validateTransaction = (transaction) => {
  const {
    amount,
    paymentMethodNonce,
    billing,
    shipping,
    customer,
    lineItems,
    orderId,
  } = transaction;

  return {
    amount,
    paymentMethodNonce,
    billing,
    shipping,
    customer,
    lineItems,
    orderId,
  };
};

export default validateTransaction;
