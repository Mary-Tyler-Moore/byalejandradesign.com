'use strict';

module.exports = (api) => {
  api.cache(true);

  const env = process.env.BABEL_ENV;

  return {
    babelrcRoots: ['packages/*'],
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
          useBuiltIns: 'usage',
          shippedProposals: true,
          targets: {
            browsers: ['>0.25%', 'not dead'],
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          useBuiltIns: true,
          pragma: 'React.createElement',
        },
      ],
      '@babel/preset-flow',
    ],
    plugins: [
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-macros',
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: true,
          regenerator: true,
        },
      ],
    ],
    env: {
      test: {
        presets: [
          ['@babel/preset-env'],
          '@babel/preset-react',
          '@babel/preset-flow',
        ],
        plugins: ['dynamic-import-node'],
      },
    },
  };
};