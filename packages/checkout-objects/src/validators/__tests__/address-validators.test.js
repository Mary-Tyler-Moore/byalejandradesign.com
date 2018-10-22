import validateAddress from '../validate-address';
import validateServerAddress from '../validate-server-address';
import validatePaypalAddress from '../validate-paypal-address';

import { serverAddress, address, paypalAddress } from '../../objects';

describe('it validates our address objects and returns a response', () => {
  test('it returns an object', () => {
    expect(typeof validateAddress(address)).toBe('object');
    expect(typeof validateServerAddress(address)).toBe('object');
    expect(typeof validatePaypalAddress(address)).toBe('object');
  });

  test("it returns the correct format 'valid' response", () => {
    const validResponse = {
      valid: true,
      fields: [],
    };

    expect(validateAddress(address)).toMatchObject(validResponse);

    expect(validateServerAddress(serverAddress)).toMatchObject(validResponse);

    expect(validatePaypalAddress(paypalAddress)).toMatchObject(validResponse);
  });

  test('it returns the correct invalid response', () => {
    const invalidResponse = {
      valid: false,
      fields: ['firstName'],
    };

    const testObject = { ...address, firstName: '' };

    expect(validateAddress(testObject)).toMatchObject(invalidResponse);
  });

  test('it returns the correct invalid response', () => {
    const invalidResponse = {
      valid: false,
      fields: ['firstName'],
    };

    const testObject = { ...serverAddress, firstName: '' };

    expect(validateServerAddress(testObject)).toMatchObject(invalidResponse);
  });

  test('it returns the correct invalid response', () => {
    const invalidResponse = {
      valid: false,
      fields: ['recipientName'],
    };

    const testObject = { ...serverAddress, recipientName: '' };

    expect(validateAddress(testObject)).toMatchObject(invalidResponse);
  });
});
