#!/usr/bin/env node
const setEnv = require('./modules/set-env');
const dependencies = require('./modules/dependencies');

setEnv();
dependencies.build();
