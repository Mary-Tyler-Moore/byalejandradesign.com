import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import EmailSignup from '../EmailSignup';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<EmailSignup />);
    expect(render.toJSON()).toMatchSnapshot();
  });
});


