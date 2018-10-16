import orderId from '../order-id';

describe('it returns an order id number', () => {
  test("it doesn't throw an error", () => {
    expect(() => orderId()).not.toThrow();
  });

  test('it returns a string', () => {
    expect(typeof orderId()).toBe('string');
  });

  test('it returns an order id of 16 digits', () => {
    expect(orderId().length).toBe(16);
  });

  test('it contains no - characters', () => {
    expect(/\-/gi.test(orderId())).toBe(false);
  });
});
