// @flow
import json from 'body-parser/lib/types/json';
import urlencoded from 'body-parser/lib/types/urlencoded';
// types
import type { Middleware } from 'express';

const body: Middleware[] = [urlencoded({ extended: false }), json()];

export default body;
