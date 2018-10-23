/** @flow */
import gateway from './gateway';
// types
import type { Router, $Request, $Response } from 'express';
import type { Transaction } from '@artetexture/checkout-objects';

const clientToken = (req: $Request, res: $Response) => {
  gateway.clientToken
    .generate({})
    .then((clientToken) =>
      res.status(200).json({
        status: 200,
        ...clientToken,
      })
    )
    .catch((error) => {
      res.status(404).json({
        status: 404,
        message: 'client token not approved',
      });
    });
};

export default clientToken;
