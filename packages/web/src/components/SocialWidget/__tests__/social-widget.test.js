import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import SocialWidget from '../SocialWidget';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<SocialWidget />);
    expect(render.toJSON()).toMatchSnapshot();
  });
});


