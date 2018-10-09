import React from 'react';
// icons
import logo from './blue_venmo_acceptance_mark.svg';
// style
import './payment-option.sass';

const PaymentOption = ({ onClick, image, alt, label } = {}) => (
  <button className="paymentOption_button" onClick={onClick}>
    <img className="paymentOption_img" src={image} alt={alt} />
    <span className="paymentOption_text">
      <strong>{label}</strong>
    </span>
  </button>
);

export default PaymentOption;
