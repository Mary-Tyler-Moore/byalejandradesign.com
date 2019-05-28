#!/usr/bin/env node
const { pipeAsync } = require('smalldash');
const setEnv = require('./modules/set-env');
const dependencies = require('./modules/dependencies');
const parcel = require('./modules/parcel');
const gatsby = require('./modules/gatsby');

const throttler = (...args) =>
  new Promise((res) => {
    const timeout = 3000;
    setTimeout(() => res(...args), timeout);
  });

setEnv();

const pipeline = pipeAsync(
  dependencies.watch(),
  throttler,
  parcel.watch(),
  throttler,
  gatsby.watch()
);

pipeline();
