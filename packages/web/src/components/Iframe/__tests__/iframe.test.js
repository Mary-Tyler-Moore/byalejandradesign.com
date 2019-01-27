import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import Iframe from '../Iframe';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<Iframe />);
    expect(render.toJSON()).toMatchSnapshot();
  });
});

