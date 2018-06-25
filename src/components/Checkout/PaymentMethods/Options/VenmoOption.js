import React from 'react';
// icons
import logo from './blue_venmo_acceptance_mark.svg';
// style
import './options.sass';

const VenmoOption = ({ onClick } = {}) => (
    <button className="venmoOption_button" onClick={onClick}>
        <img className="venmoOption_img" src={logo} alt="venmo_acceptance_logo" />
        <span className="venmoOption_text">Venmo</span>
    </button>
);

export default VenmoOption;
