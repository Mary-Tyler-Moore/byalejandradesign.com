'use strict';

module.exports = (api) => {
  api.cache(true);

  const env = process.env.BABEL_ENV;

  return {
    babelrcRoots: ['/packages/*'],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
      'dynamic-import-node',
    ],
  };
};
