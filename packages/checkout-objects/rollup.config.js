import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import runtimes from '@njmyers/babel-runtime-files';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  ...runtimes(),
  'uuid/v1',
];

const plugins = [
  resolve(),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**',
  }),
];

export default [
  {
    input: path.resolve(__dirname, 'src/index.js'),
    external,
    output: {
      file: path.resolve(__dirname, pkg.module),
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: path.resolve(__dirname, 'src/index.js'),
    external,
    output: {
      file: path.resolve(__dirname, pkg.main),
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
  },
];
