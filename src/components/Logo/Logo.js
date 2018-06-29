import * as React from 'react';
import logo from './logo_white.png';
import './logo.sass';

const Logo = (props) => (
  <div className={`logo ${props.className ? props.className : ''}`}>
    <img className="logo_img" src={logo} alt="logo" />
  </div>
);

export default Logo;
