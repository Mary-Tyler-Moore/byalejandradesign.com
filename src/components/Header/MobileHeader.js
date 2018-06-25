import React from 'react';
// components
import Title from './Title';
import MobileNav from './MobileNav';
import { CartIcon } from '../Cart';
// assets
// import logo from '../../media/logo_white.png';

const title = process.env.REACT_APP_SITE_TITLE;

const MobileHeader = ({ isMenuOn, menuOff, menuOn, pages } = {}) => {
  const icon = isMenuOn ? 'times' : 'bars';
  const iconClass = `fa fa-${icon} fa-lg mobile-header__hamburger`;

  const style = {}; //isMenuOn ? { borderBottom: 'white 1px solid' } : null;
  return (
    <React.Fragment>
      <div className="mobile-header__container" style={style}>
        <header className="mobile-header">
          <button className={iconClass} onClick={isMenuOn ? menuOff : menuOn} />
          <Title text={title} />
          <CartIcon />
        </header>
      </div>
      <MobileNav pages={pages} />
    </React.Fragment>
  );
};

export default MobileHeader;
