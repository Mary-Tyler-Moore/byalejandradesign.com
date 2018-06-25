import React from 'react';
// icons
import icon from 'payment-icons/svg/flat/paypal.svg';
// style
import './options.sass';

const PaypalOption = ({ onClick } = {}) => (
    <button className="paypalOption_button" onClick={onClick}>
        <img className="paypalOption_img" src={icon} alt="credit_card_icon" />
        <span className="paypalOption_text">Paypal</span>
    </button>
);

export default PaypalOption;
