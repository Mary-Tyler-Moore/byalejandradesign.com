module.exports = {
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '6.10',
        },
      },
    ],
    '@babel/preset-flow',
  ],
};
