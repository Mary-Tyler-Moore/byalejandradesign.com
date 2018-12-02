import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import FooterNav from '../FooterNav';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<FooterNav />);
    expect(render.toJSON()).toMatchSnapshot();
  });
});


