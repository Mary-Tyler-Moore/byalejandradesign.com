import React from 'react';
// components
import Nav from './Nav';
// assets
import logo from '../../media/logo_white.png';
import plate from '../../media/plate.jpg';

const DesktopHeader = ({ isMobile, isMenuOn, menuOn, menuOff, pages }) => {
  return (
    <header className="header">
      <img src={plate} className="header_backgroundImg" alt="logo_background" />
      <div className="header_filter" />
      <div className="header_content">
        <img className="header_logo" src={logo} alt="artetexture logo" />
        <Nav pages={pages} />
      </div>
    </header>
  );
};

export default DesktopHeader;
