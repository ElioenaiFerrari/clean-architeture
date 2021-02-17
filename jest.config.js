/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: 1,
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts?(x)'],
  moduleNameMapper: {
    '@domain(.*)$': '<rootDir>/src/domain/$1',
    '@app(.*)$': '<rootDir>/src/app/$1',
    '@infra(.*)$': '<rootDir>/src/infra/$1',
    '@main(.*)$': '<rootDir>/src/main/$1',
    '@shared(.*)$': '<rootDir>/src/shared/$1',
  },
};
