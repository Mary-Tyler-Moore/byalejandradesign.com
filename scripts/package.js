#!/usr/bin/env node
const setEnv = require('./modules/set-env');
const dependencies = require('./modules/dependencies');
const gatsby = require('./modules/gatsby');
const parcel = require('./modules/parcel');
const serverless = require('./modules/severless');

setEnv();

dependencies.build();
parcel.build();
gatsby.build();
serverless.packager();
