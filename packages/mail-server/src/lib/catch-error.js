/** @flow */
import env from '@byalejandradesign/server-env';
// types
import type { $Response } from 'express';

type CTX = {
  status?: number,
  message?: string,
};

const catchError = (res: $Response) => (ctx: CTX) => {
  if (env.STAGE === 'development') {
    console.log(ctx);
  }

  const status = ctx.status || 500;
  const message = ctx.message || 'unknown error';

  res.status(status).json({
    status,
    message,
  });
};

export default catchError;
