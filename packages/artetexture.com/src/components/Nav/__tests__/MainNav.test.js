import React from 'react';
import MainNav from '../MainNav';
import { MemoryRouter } from 'react-router-dom';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mainNav = ['/link', '/other-link'];

describe('it renders the footer navs', () => {
  test('it displays the desktop version', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <MainNav sizes={{ mobile: false }} mainNav={mainNav} />
      </MemoryRouter>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('it displays the mobile version', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <MainNav sizes={{ mobile: true }} mainNav={mainNav} />
      </MemoryRouter>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
