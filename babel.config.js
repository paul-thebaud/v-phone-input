let presets = ['@vue/babel-preset-app'];
if (process.env.NODE_ENV === 'production') {
  presets = [
    ['@babel/preset-env'],
    '@babel/preset-typescript',
  ];
  if (process.env.DEMO_ENV === 'production') {
    presets[0].push({ useBuiltIns: 'usage', corejs: 3 });
  }
}

const plugins = [];
if (process.env.E2E_COVERAGE === 'true') {
  plugins.push(['babel-plugin-istanbul', {
    extension: ['ts', 'js', 'vue'],
  }]);
}

module.exports = {
  presets,
  plugins,
};
