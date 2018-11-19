/** @flow */
export type Props = {
  lineItems: Array<{
    name: string,
    description: string,
    quantity: number,
    unitAmount: number,
    totalAmount: number,
    kind: 'debit' | 'credit',
  }>,
};
