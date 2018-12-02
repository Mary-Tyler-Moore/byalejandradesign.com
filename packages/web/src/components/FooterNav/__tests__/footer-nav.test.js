import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import FooterNav from '../FooterNav';

describe('it works', () => {
  test('it loads without crashing', () => {
    const render = TestRenderer.create(<FooterNav />);
    expect(render.toJSON()).toMatchSnapshot();
  });

  test('it loads routes crashing', () => {
    const footerNav = [
      {
        link: '/path',
        label: 'Path',
      },
    ];

    const render = TestRenderer.create(<FooterNav footerNav={footerNav} />);
    expect(render.toJSON()).toMatchSnapshot();
  });
});
