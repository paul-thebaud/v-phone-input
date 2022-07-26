module.exports = {
  root: true,
  env: {
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
    '@vue/typescript/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/order': ['off'], // See https://youtrack.jetbrains.com/issue/WEB-21182
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
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
