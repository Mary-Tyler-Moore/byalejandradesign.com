/** @flow */
import defaults from './defaults';

export type LineItem = {
  name: string,
  productCode: string,
  description: string,
  quantity: number,
  unitAmount: number,
  totalAmount: number,
  kind: 'debit' | 'credit',
};

const lineItem: LineItem = {
  name: defaults('', 'shoreline-cups'),
  productCode: defaults('', '01234'),
  description: defaults('', 'a beautiful cup from shoreline collection'),
  quantity: defaults(0, 1),
  unitAmount: defaults(0, 10),
  totalAmount: defaults(0, 10),
  kind: 'debit',
};

export default lineItem;
