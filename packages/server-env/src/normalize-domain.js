/** @flow */
const normalizeDomain = (domain: string): string => {
  const regex = /https?:\/\//gi;
  return regex.test(domain) ? domain : `https://${domain}`;
};

export default normalizeDomain;
