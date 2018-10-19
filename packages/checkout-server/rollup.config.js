import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const dependencies = {
  ...(pkg.dependencies || {}),
  ...(pkg.peerDependencies || {}),
};

const { '@artetexture/checkout-objects': bad, ...rest } = dependencies;

const external = [...Object.keys(rest), 'react-dom/server', 'fs', 'path'];

const plugins = [
  postcss({
    plugins: [autoprefixer],
    extract: 'build/style.css',
    sourceMap: true,
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
    plugins: [
      resolve(),
      globals({
        process: false,
      }),
      builtins(),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
      commonjs(),
      ...plugins,
    ],
  },
];
