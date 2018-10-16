import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const external = [...Object.keys(pkg.dependencies), 'fs', 'path'];

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
    ],
  },
];
