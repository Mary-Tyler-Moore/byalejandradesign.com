import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Footer from '../Footer';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<Footer />);
    expect(render.toJSON()).toMatchSnapshot();
  });
});


