/* tslint:disable:no-require-imports */
const tsNode = require('ts-node')
tsNode.register({
  project: 'tsconfig.json',
  transpileOnly: true,
  compilerOptions: {
    allowJs: false,
    module: 'commonjs',
    target: 'es2015',
  },
})
