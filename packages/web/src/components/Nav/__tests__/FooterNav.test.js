import React from 'react';
import FooterNav from '../FooterNav';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const footerNav = ['/link', '/other-link'];

window.__PATH_PREFIX__ = '';

describe('it renders the footer navs', () => {
  test('it displays the desktop version', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <FooterNav sizes={{ mobile: false }} footerNav={footerNav} />
      </MemoryRouter>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('it displays the mobile version', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <FooterNav sizes={{ mobile: true }} footerNav={footerNav} />
      </MemoryRouter>
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
