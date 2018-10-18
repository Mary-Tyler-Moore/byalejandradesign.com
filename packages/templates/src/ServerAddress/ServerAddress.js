import * as React from 'react';
import Line from '../Line';
import { ServerAddress as ServerAddressType } from '@artetexture/checkout-objects';

interface Props {
  address: ServerAddressType;
  label?: string;
}

const ServerAddress = ({ address, label }: Props) => (
  <section className="confirmation_billingAddress">
    <h4 className="h4-amiri">{label}</h4>
    <Line label="name">{`${address.firstName} ${address.lastName}`}</Line>
    <Line label="address">{address.streetAddress}</Line>
    {address.extendedAddress && (
      <Line label="address">{address.extendedAddress}</Line>
    )}
    <Line label="city">{address.locality}</Line>
    <Line label={address.countryCodeAlpha2 === 'US' ? 'state' : 'province'}>
      {address.region}
    </Line>
    <Line label="postalCode">{address.postalCode}</Line>
  </section>
);

export default ServerAddress;
