module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js,vue}', 'dev/**/*.{ts,js,vue}'],
  coverageDirectory: './coverage-unit',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/jest.setup.js'],
  transformIgnorePatterns: ['node_modules/(?!vue-router|@babel|vuetify)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
    'vue-jest': {
      experimentalCSSCompile: false,
    },
  },
};
