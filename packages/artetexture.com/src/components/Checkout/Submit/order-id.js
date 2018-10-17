import uuid from 'uuid/v1';

const orderId = () =>
  uuid()
    .replace(/-/gi, '')
    .slice(0, 16);

export default orderId;
