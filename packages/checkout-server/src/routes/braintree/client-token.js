/** @flow */
import gateway from './gateway';
// types
import type { Router, $Request, $Response } from 'express';
import type { Transaction } from '@artetexture/checkout-objects';

const clientToken = async (req: $Request, res: $Response) => {
  try {
    const clientToken = await gateway.clientToken.generate({});
    res.status(200).json({
      status: 200,
      ...clientToken,
    });
  } catch (e) {
    res.status(404).json({
      status: 404,
      message: e,
    });
  }
};

export default clientToken;
