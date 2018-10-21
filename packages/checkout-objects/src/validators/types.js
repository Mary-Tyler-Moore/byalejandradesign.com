/** @flow */

export type ValidationResponse = {
  valid: boolean,
  fields: Array<string>,
};

export type Check = (value: mixed) => boolean;
