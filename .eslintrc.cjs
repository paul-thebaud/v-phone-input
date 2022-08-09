module.exports = {
  root: true,
  env: {
    es2021: true,
    jest: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // See https://stackoverflow.com/a/63767419
    'no-unused-vars': ['off'],
    // See https://youtrack.jetbrains.com/issue/WEB-21182
    'import/order': ['off'],
    'object-curly-newline': ['off'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': ['dev/**', 'tests/**', '*.config.ts'],
        'optionalDependencies': ['dev/**', 'src/**', 'tests/**'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
