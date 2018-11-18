import normalizeDomain from '../normalize-domain';

describe('it normalizes a domain to a full secure address', () => {
  test('it normalizes a domain without a protocol', () => {
    expect(normalizeDomain('staging.domain.com')).toBe(
      'https://staging.domain.com'
    );
  });

  test("it doesn't normalize a domain with a protocol", () => {
    expect(normalizeDomain('http://staging.domain.com')).toBe(
      'http://staging.domain.com'
    );
  });
});
