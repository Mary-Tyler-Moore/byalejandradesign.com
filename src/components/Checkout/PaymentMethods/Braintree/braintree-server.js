// @flow
import { ajax } from 'rxjs/observable/dom/ajax';

const base = (): string => {
  if (!process.env.BRAINTREE_SERVER)
    throw new Error('you must supply a braintree base url in the .env file');

  return process.env.BRAINTREE_SERVER;
};

export default (extension: string) => ajax.getJSON(`${base()}${extension}`);
