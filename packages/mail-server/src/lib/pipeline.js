/** @flow */
import { pipeAsync } from 'smalldash';
import catchError from './catch-error';
// types
import type { $Request, $Response } from 'express';

type CTX = {
  body: Object,
  id?: string,
  message?: string,
  status?: number,
};

type Pipe = (ctx: CTX) => Promise<CTX>;

type Pipeline = (
  ...fns: Array<Pipe>
) => (req: $Request, res: $Response) => void;

/** ensure all response from our server look the same */
const pipeline: Pipeline = (...fns) => (req, res) => {
  pipeAsync(...fns)({ body: req.body })
    .then((ctx: CTX) => {
      // verify successful mailgun transaction with presence of id
      if (ctx.id) {
        // use message or default message
        const message = ctx.message || 'email delivery successful';
        // send the server response
        res.status(200).json({
          status: 200,
          message,
        });
        // if there is no transaction id then the mail was still unsuccessful
      } else {
        // send the server response in the same format
        catchError(res)(ctx);
      }
    })
    // default error handler
    .catch(catchError(res));
};

export default pipeline;
