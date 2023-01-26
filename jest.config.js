/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',

      { tsconfig: './tsconfig.json', compiler: 'ttypescript', useESM: true },
    ],
  },
}
export default config
