// @flow
import type { $Request, $Response, NextFunction } from 'express';
import isDev from './is-dev';

const requestAPIKey = process.env.REQUEST_API_KEY;

const auth = (req: $Request, res: $Response, next: NextFunction) => {
  const key: string | void = req.get('Authorization');

  console.log(requestAPIKey);

  if (key === requestAPIKey) {
    next();
  } else
    res.status(401).json({
      status: 401,
      error: 'not authorized',
      key,
    });
};

export default auth;
