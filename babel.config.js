module.exports = {
  presets: [
    [
      '@quasar/babel-preset-app', {
      // for tree shacking
      modules: false,
    }],
    [
      'typescript-vue',
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-optional-chaining',
  ],
  env: {
    test: {
      plugins: [
        'istanbul',
      ],
    },
  },
}
