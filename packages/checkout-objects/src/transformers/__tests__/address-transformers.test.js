import addressToPaypalAddress from '../address-to-paypal-address';
import addressToServerAddress from '../address-to-server-address';

import { address, paypalAddress, serverAddress } from '../../objects';

described('address transformers correctly transform object shapes', () => {
  test('it transforms address to paypal address object shape', () => {
    expect(addressToPaypalAddress(address)).toMatchObject(paypalAddress);
  });

  test('it transforms address to server address object shape', () => {
    expect(addressToServerAddress(address)).toMatchObjects(serverAddress);
  });
});
