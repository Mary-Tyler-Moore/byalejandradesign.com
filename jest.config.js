module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/__mocks__/file-mock.js',
    '\\.(sass|css|scss)$': '<rootDir>/__mocks__/style-mock.js',
  },
  testPathIgnorePatterns: [
    'node_modules/',
    '.cache/',
    'public/',
    'build/',
    'helpers/',
  ],
  roots: ['packages/'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby|@artetexture)/)'],
};
