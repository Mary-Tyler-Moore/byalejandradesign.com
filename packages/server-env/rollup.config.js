import dotEnv from 'dotenv';
import path from 'path';
import validateEnv from './validate-env';
import replace from 'rollup-plugin-replace';
import flow from 'rollup-plugin-flow';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import runtimes from '@njmyers/babel-runtime-files';
import pkg from './package.json';

dotEnv.config({
  // $FlowFixMe
  path: path.resolve(__dirname, `.env.${process.env.STAGE}`),
});

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies | {}),
  ...runtimes(),
  'path',
];

const keys = [
  'STAGE',
  'ROOT_DOMAIN',
  'CHECKOUT_DOMAIN',
  'MAIL_DOMAIN',
  'MAILGUN_DOMAIN',
  'EMAIL_RECIPIENT',
  'API_KEY',
  'MAILGUN_API_KEY',
  'BRAINTREE_MERCHANT_ID',
  'BRAINTREE_PUBLIC_KEY',
  'BRAINTREE_PRIVATE_KEY',
];

const values = {};

keys.forEach((key) => {
  values[key] = `'${validateEnv(key)}'`;
});

const plugins = [
  flow(),
  replace({
    delimiters: [`'`, `'`],
    values,
  }),
  resolve(),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**',
  }),
];

export default [
  {
    input: 'src/env.js',
    external,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'src/env.js',
    external,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
  },
];
