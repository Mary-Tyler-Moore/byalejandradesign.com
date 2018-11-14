import dotEnv from 'dotenv';
import path from 'path';
import validateEnv from './validate-env';
import replace from 'rollup-plugin-replace';
import flow from 'rollup-plugin-flow';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import runtimes from '@njmyers/babel-runtime-files';
import pkg from './package.json';

dotEnv.config();

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies | {}),
  ...runtimes(),
  'path',
];

const keys = [
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

const values = {
  STAGE: process.env.STAGE,
};

keys.forEach((key) => {
  values[key] = `'${validateEnv(`${key}_${process.env.STAGE.toUpperCase()}`)}'`;
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
    input: path.resolve(__dirname, 'src/env.js'),
    external,
    output: {
      file: path.resolve(__dirname, pkg.module),
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: path.resolve(__dirname, 'src/env.js'),
    external,
    output: {
      file: path.resolve(__dirname, pkg.main),
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
  },
];
