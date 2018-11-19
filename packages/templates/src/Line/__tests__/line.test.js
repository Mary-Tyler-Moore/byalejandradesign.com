import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Line from '../Line';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<Line />);
    expect(render.toJSON()).toMatchSnapshot();
  });

  test('it loads line items', () => {
    const render = TestRenderer.create(<Line label="label">content</Line>);
    expect(render.toJSON()).toMatchSnapshot();
  });
});
