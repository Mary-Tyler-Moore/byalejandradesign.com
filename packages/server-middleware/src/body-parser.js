// @flow
import { json, urlencoded } from 'body-parser';
// types
import type { Middleware } from 'express';

const body: Middleware[] = [urlencoded({ extended: false }), json()];

export default body;
