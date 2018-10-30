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
    input: 'src/middleware.js',
    external,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'src/middleware.js',
    external,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
  },
];
