export interface LineItem {
  name: string;
  productCode: string;
  description: string;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
  kind: 'debit' | 'credit';
}

const lineItem: LineItem = {
  name: '',
  productCode: '',
  description: '',
  quantity: 0,
  unitAmount: 0,
  totalAmount: 0,
  kind: 'debit',
};

export default lineItem;
