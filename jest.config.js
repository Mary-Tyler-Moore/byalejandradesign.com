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
  globals: {
    __PATH_PREFIX__: '',
  },
  roots: ['packages/'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby|@byalejandradesign)/)'],
  setupFiles: ['<rootDir>/loadershim.js'],
};
