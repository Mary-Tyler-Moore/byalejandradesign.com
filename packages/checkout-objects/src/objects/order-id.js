/** @flow */
import uuid from 'uuid/v1';

type OrderID = () => string;

const orderId: OrderID = () =>
  uuid()
    .replace(/-/gi, '')
    .slice(0, 16);

export default orderId;
