import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import runtimes from '@njmyers/babel-runtime-files';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  ...runtimes(),
];

export default [
  {
    input: 'src/index.ts',
    external,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      typescript({
        rollupCommonJSResolveHack: true,
      }),
      resolve({
        jsnext: true,
        main: true,
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    external,
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      typescript({
        rollupCommonJSResolveHack: true,
      }),
      resolve(),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
            },
          ],
        ],
      }),
    ],
  },
];
