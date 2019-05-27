import React from 'react';
import MainNav from '../MainNav';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mainNav = [
  {
    link: '/link',
    label: 'Link',
  },
  {
    link: '/other-link',
    label: 'Other Link',
  },
];

describe('it renders the footer navs', () => {
  test('it displays the desktop version', () => {
    const wrapper = shallow(
      <MainNav sizes={{ mobile: false }} mainNav={mainNav} />
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('it displays the mobile version', () => {
    const wrapper = shallow(
      <MainNav sizes={{ mobile: true }} mainNav={mainNav} />
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
