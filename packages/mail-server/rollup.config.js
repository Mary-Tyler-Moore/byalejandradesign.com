import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';
import runtimes from '@njmyers/babel-runtime-files';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const dependencies = {
  ...(pkg.dependencies || {}),
  ...(pkg.peerDependencies || {}),
};

const external = [
  ...Object.keys(dependencies),
  ...runtimes(),
  'react-dom/server',
  'fs',
  'path',
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
  postcss({
    plugins: [autoprefixer],
  }),
];

export default [
  {
    input: 'src/app.js',
    external,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
  },
];
