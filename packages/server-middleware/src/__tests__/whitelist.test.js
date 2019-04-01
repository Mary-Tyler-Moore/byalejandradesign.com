import whitelist from '../whitelist';

describe('it passes only allowed domains on the whitelist', () => {
  const domains = [
    'byalejandradesign.com',
    'www.byalejandradesign.com',
    'staging.byalejandradesign.com',
  ];

  domains.forEach((domain) => {
    test(`it passes ${domain} as whitelisted`, () => {
      expect(
        whitelist.map((fn) => fn()).some((regex) => regex.test(domain))
      ).toBe(true);
    });
  });

  const badDomains = [
    'somedomain.com',
    'byalrjandesign.com',
    'garbage.net',
    'asdfasdfasdfa.asdfasdf',
  ];

  badDomains.forEach((domain) => {
    test(`it doesn\'t pass ${domain} as whitelisted`, () => {
      expect(
        whitelist.map((fn) => fn()).some((regex) => regex.test(domain))
      ).toBe(false);
    });
  });
});
