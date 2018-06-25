import React from 'react';
// icons
import icon from 'payment-icons/svg/flat/default.svg';
// style
import './options.sass';

const CreditCardOption = ({ onClick } = {}) => (
    <button className="creditCardOption_button" onClick={onClick}>
        <img className="creditCardOption_img" src={icon} alt="credit_card_icon" />
        <span className="creditCardOption_text">Credit Card</span>
    </button>
);

export default CreditCardOption;
