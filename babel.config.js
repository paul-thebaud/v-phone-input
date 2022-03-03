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

module.exports = {
  presets,
  plugins: [
    ['babel-plugin-istanbul', {
      extension: ['.js', '.ts', '.vue'],
    }],
  ],
};
