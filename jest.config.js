module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/*.test.{js,jsx}'],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '<rootDir>/test/setup.js'],
}
