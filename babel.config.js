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
      presets: [
        [
          '@quasar/babel-preset-app', {
          // for tree shacking
          modules: false,
          presetEnv: {
            modules: 'commonjs',
            targets: {
              node: true,
            },
          },
        }],
      ],
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              'src': './src',
              'test': './test',
              'build': './build',
              'layouts': './src/layouts',
              'pages': './src/pages',
              'assets': './src/assets',
              'boot': './src/boot',
              'components': './src/components',
            },
          },
        ],
        'istanbul',
      ],
    },
  },
}
