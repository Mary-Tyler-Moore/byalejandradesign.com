/** @flow */
import * as React from 'react';

export type Props = {
  footerNav: Array<string>,
  design: {
    mobileContentPadding: number,
    contentPadding: number,
    maxWidth: number,
  },
  sizes: {
    window: {
      innerWidth: number,
      innerHeight: number,
      outerWidth: number,
      outerHeight: number,
    },
  },
};

export type State = {
  email: string,
};
