module.exports = {
  presets: [
    ['@quasar/babel-preset-app', {
      // for tree shacking
      modules: false,
    }],
  ],
  env: {
    test: {
      plugins: ['istanbul'],
    },
  },
}
