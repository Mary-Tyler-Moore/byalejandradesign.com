import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Customer from '../Customer';
import { transaction } from '@byalejandradesign/checkout-objects';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<Customer />);
    expect(render.toJSON()).toMatchSnapshot();
  });

  test('it renders a customer', () => {
    const render = TestRenderer.create(
      <Customer customer={transaction.customer} />
    );
    expect(render.toJSON()).toMatchSnapshot();
  });
});
