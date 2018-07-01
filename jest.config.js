module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(sass|css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.cache/'],
  transform: { '^.+\\.js$': '<rootDir>/jest-preprocess.js' },
};
