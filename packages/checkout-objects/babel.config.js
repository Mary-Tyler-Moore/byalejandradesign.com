const path = require('path');
const config = require(path.resolve(__dirname, '../../babel.config.js'));

module.exports = (api) => {
  const plugins = [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
  ];

  return {
    ...config(api),
    plugins,
    babelrcRoots: ['./'],
  };
};
