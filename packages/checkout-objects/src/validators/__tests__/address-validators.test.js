import validateAddress from '../validate-address';
import validateServerAddress from '../validate-server-address';
import validatePaypalAddress from '../validate-paypal-address';

import { serverAddress, address, paypalAddress } from '../../objects';

describe('it validates our address objects and returns a response', () => {
  test('it returns an object', () => {
    expect(typeof validateAddress(address, () => true)).toBe('object');
    expect(typeof validateServerAddress(address, () => true)).toBe('object');
    expect(typeof validatePaypalAddress(address, () => true)).toBe('object');
  });

  test("it returns the correct format 'valid' response", () => {
    const validResponse = {
      valid: true,
      fields: [],
    };

    expect(validateAddress(address, (a) => a)).toMatchObject(validResponse);

    expect(validateServerAddress(serverAddress, (a) => a)).toMatchObject(
      validResponse
    );

    expect(validatePaypalAddress(paypalAddress, (a) => a)).toMatchObject(
      validResponse
    );
  });

  test('it returns the correct invalid response', () => {
    const invalidResponse = {
      valid: false,
      fields: ['firstName'],
    };

    const testObject = { ...address, firstName: '' };

    expect(validateAddress(testObject, (a) => a)).toMatchObject(
      invalidResponse
    );
  });

  test('it returns the correct invalid response', () => {
    const invalidResponse = {
      valid: false,
      fields: ['firstName'],
    };

    const testObject = { ...serverAddress, firstName: '' };

    expect(validateServerAddress(testObject, (a) => a)).toMatchObject(
      invalidResponse
    );
  });

  test('it returns the correct invalid response', () => {
    const invalidResponse = {
      valid: false,
      fields: ['recipientName'],
    };

    const testObject = { ...serverAddress, recipientName: '' };

    expect(validateAddress(testObject, (a) => a)).toMatchObject(
      invalidResponse
    );
  });
});
