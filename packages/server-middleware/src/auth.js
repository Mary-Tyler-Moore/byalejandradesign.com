// @flow
import type { $Request, $Response, NextFunction } from 'express';
import env from '@byalejandradesign/server-env';

// $FlowFixMe
const apiKey = env.API_KEY;

const auth = (req: $Request, res: $Response, next: NextFunction) => {
  const key: string | void = req.get('Authorization');

  if (key === apiKey) {
    next();
  } else
    res.status(401).json({
      status: 401,
      error: 'not authorized',
      key,
    });
};

export default auth;
