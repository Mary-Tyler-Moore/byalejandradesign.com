// @flow
import { ajax } from 'rxjs/observable/dom/ajax';

const base = (): string => {
  if (!process.env.REACT_APP_BRAINTREE_URL)
    throw new Error('you must supply a braintree base url in the .env file');

  return process.env.REACT_APP_BRAINTREE_URL;
};

export default (extension: string) => ajax.getJSON(`${base()}${extension}`);
