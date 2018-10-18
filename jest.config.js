module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|woff|woff2)$': '<rootDir>/__mocks__/file-mock.js',
    '\\.(sass|css|scss)$': '<rootDir>/__mocks__/style-mock.js',
  },
  testPathIgnorePatterns: [
    'node_modules/',
    '<rootDir>/.cache/',
    '<rootDir>/public',
    'helpers/',
  ],
  roots: ['packages/'],
  // projects: ['<rootDir>/jest.config.js', '<rootDir>/packages/*/jest.config.js'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
};
