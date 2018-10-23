import { nullish } from 'smalldash';
import type { $Request, $Response, NextFunction } from 'express';

function validateBody(req: $Request, res: $Response, next: NextFunction) {
  if (req.method === 'post') {
    if (nullish(req.body)) {
      res.json({
        status: 404,
        error: 'error validating request body',
      });
    }
  }

  next();
}

export default validateBody;
