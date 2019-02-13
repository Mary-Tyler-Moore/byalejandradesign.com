// @flow
import env from '@byalejandradesign/server-env';
// types
import type { $Request, $Response, NextFunction } from 'express';

import whitelist from './whitelist';

// https://serverless.com/blog/cors-api-gateway-survival-guide/
function responseHeaders(req: $Request, res: $Response, next: NextFunction) {
  const origin = req.headers.origin;

  const isAllowed =
    env.STAGE === 'development' ||
    whitelist.map((regex) => regex().test(origin)).some((boolean) => boolean);

  if (isAllowed) {
    res.header({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
    });
  } else {
    res.header({
      'Access-Control-Allow-Origin': '*',
    });
  }

  next();
}

export default responseHeaders;
