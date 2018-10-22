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
    extract: 'build/style.css',
    sourceMap: true,
  }),
];

export default [
  {
    input: 'src/index.js',
    external,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'src/index.js',
    external,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
];
