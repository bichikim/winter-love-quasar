/**
 * Ts Node register setting for node.js
 */
/* tslint:disable:no-require-imports */
const tsNode = require('ts-node')
tsNode.register({
  project: 'tsconfig.node.json',
})
