module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/src/__mocks__/file-mock.js',
    '\\.(sass|css|scss)$': '<rootDir>/src/__mocks__/style-mock.js',
  },
  testPathIgnorePatterns: [
    'node_modules/',
    '<rootDir>/.cache/',
    '<rootDir>/public',
    'helpers/',
  ],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
};
