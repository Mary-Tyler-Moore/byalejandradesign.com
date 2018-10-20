import path from 'path';
import directory from '@njmyers/directory';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import runtimes from '@njmyers/babel-runtime-files';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const dependencies = {
  ...(pkg.dependencies || {}),
  ...(pkg.peerDependencies || {}),
};

delete dependencies['@artetexture/server-middlware'];

const external = [
  ...Object.keys(dependencies),
  ...runtimes(),
  'react-dom/server',
  'fs',
  'path',
];

const basePlugins = [
  resolve(),
  globals({
    process: false,
    dirname: false,
  }),
  builtins(),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**',
    plugins: ['@babel/plugin-transform-runtime'],
  }),
  commonjs(),
];

const cssEntries = directory('src/routes/email/templates', {
  filter: '.js',
  recursive: true,
})
  .filter((obj) => !/(index|styles)/gi.test(obj.path))
  .map((obj) => obj.path);

console.log(cssEntries);

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
      ...basePlugins,
      postcss({
        plugins: [autoprefixer],
      }),
    ],
  },
  ...cssEntries.map((absolutePath) => ({
    input: absolutePath,
    external,
    output: {
      file: `build/static/js/${path.basename(absolutePath, '.js')}.js`,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      ...basePlugins,
      postcss({
        plugins: [autoprefixer],
        extract: `build/static/css/${path.basename(absolutePath, '.js')}.css`,
        sourceMap: true,
        minimize: true,
      }),
    ],
  })),
];
