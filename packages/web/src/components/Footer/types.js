/** @flow */
import * as React from 'react';

export type Props = {
  footerNav: Array<string>,
  sizes: {
    window: {
      innerWidth: number,
      innerHeight: number,
      outerWidth: number,
      outerHeight: number,
    },
  },
};
