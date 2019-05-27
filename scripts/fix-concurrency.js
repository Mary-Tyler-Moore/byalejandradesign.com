#!/usr/bin/env node
const path = require('path');
const shell = require('shelljs');

const FILE_PATH = path.resolve(
  __dirname,
  '../',
  'packages/web',
  'node_modules',
  'gatsby-source-filesystem/create-remote-file-node.js'
);

shell.sed('-i', 'concurrent: 200', 'concurrent: 20', FILE_PATH);
