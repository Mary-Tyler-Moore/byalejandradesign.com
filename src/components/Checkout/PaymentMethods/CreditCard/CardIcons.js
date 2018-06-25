// @flow
import React from 'react';
// icons
import americanExpressMono from 'payment-icons/svg/mono/amex.svg';
import americanExpress from 'payment-icons/svg/flat/amex.svg';

import discoverCardMono from 'payment-icons/svg/mono/discover.svg';
import discoverCard from 'payment-icons/svg/flat/discover.svg';

import masterCardMono from 'payment-icons/svg/mono/mastercard.svg';
import masterCard from 'payment-icons/svg/flat/mastercard.svg';

import visaMono from 'payment-icons/svg/mono/visa.svg';
import visa from 'payment-icons/svg/flat/visa.svg';
// style
import './card-icons.sass';
// components
import { BEM } from 'njmyers-component-library';

// card keys come from hostedFieldsInstance event emitters
const cards = [
  {
    key: 'american-express',
    mono: americanExpressMono,
    flat: americanExpress,
  },
  {
    key: 'discover',
    mono: discoverCardMono,
    flat: discoverCard,
  },
  {
    key: 'master-card',
    mono: masterCardMono,
    flat: masterCard,
  },
  {
    key: 'visa',
    mono: visaMono,
    flat: visa,
  },
];

type Props = {
  active: string,
};

const CardIcons = ({ active }: Props) => (
  <BEM block="cardIcons">
    <section>
      {cards.map(({ key, mono, flat } = {}) => (
        <div key={key} element="forceAspect">
          <img
            src={active !== key ? mono : flat}
            element="svg"
            alt={`${key}-icon`}
          />
        </div>
      ))}
    </section>
  </BEM>
);

export default CardIcons;
