import React from 'react';
import { connect } from 'react-redux';
import Size from 'react-size-components';

import DesktopHeader from './DesktopHeader';
import StickyHeader from './StickyHeader';
import MobileHeader from './MobileHeader';

import { menuOn, menuOff } from './menu-actions';

import './header-default.sass';

const mapStateToProps = (state) => ({
  isMenuOn: state.menu.isMenuOn,
  isMobile: state.UI.isMobile,
});

const mapDispatchToProps = (dispatch) => ({
  menuOn: () => dispatch(menuOn()),
  menuOff: () => dispatch(menuOff()),
});

const Mobile = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileHeader);
const Desktop = connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopHeader);
const Sticky = connect(
  mapStateToProps,
  mapDispatchToProps
)(StickyHeader);

const HeaderContainer = ({ isMobile, pages, sizes } = {}) =>
  !isMobile ? (
    <React.Fragment>
      <Desktop pages={pages} />
      <Sticky pages={pages} isStickyHeaderActive={sizes.isStickyHeaderActive} />
    </React.Fragment>
  ) : (
    <Mobile pages={pages} />
  );

const custom = [
  {
    name: 'isStickyHeaderActive',
    fn: (node) => {
      const top = Math.abs(node.getBoundingClientRect().top);
      return top > 480;
    },
    subscriptions: {
      scroll: true,
      resize: true,
    },
    schema: '',
  },
];

export default connect(mapStateToProps)(
  Size({ component: true, custom })(HeaderContainer)
);
