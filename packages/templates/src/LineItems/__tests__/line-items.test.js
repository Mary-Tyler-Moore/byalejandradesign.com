import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import LineItems from '../LineItems';

const item = {
  name: 'shoreline-cups',
  description:
    'Yes, they are smaller than your regular size. My husband loves drinking tea/coffee in these guys. He says they are the perfect ',
  quantity: 1,
  unitAmount: 15,
  totalAmount: 15,
  kind: 'debit',
};

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<LineItems />);
    expect(render.toJSON()).toMatchSnapshot();
  });

  test('it loads line items', () => {
    const render = TestRenderer.create(<LineItems lineItems={[item]} />);
    expect(render.toJSON()).toMatchSnapshot();
  });
});
