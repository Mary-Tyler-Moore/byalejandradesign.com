import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import runtimes from '@njmyers/babel-runtime-files';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  ...runtimes(),
];

const plugins = [
  resolve(),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**',
  }),
  postcss({
    plugins: [autoprefixer],
    extract: path.resolve(__dirname, 'build/style.css'),
    sourceMap: true,
  }),
];

export default [
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
];
