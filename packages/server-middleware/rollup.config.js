import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import runtimes from '@njmyers/babel-runtime-files';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies | {}),
  'body-parser/lib/types/json',
  'body-parser/lib/types/urlencoded',
  ...runtimes(),
];

const plugins = [
  resolve(),
  globals({
    process: false,
    dirname: false,
  }),
  builtins(),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**',
  }),
  commonjs(),
];

export default [
  {
    input: path.resolve(__dirname, 'src/middleware.js'),
    external,
    output: {
      file: path.resolve(__dirname, pkg.module),
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: path.resolve(__dirname, 'src/middleware.js'),
    external,
    output: {
      file: path.resolve(__dirname, pkg.main),
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
  },
];
