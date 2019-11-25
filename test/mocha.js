process.env.TS_NODE_TRANSPILE_ONLY = 'true'
process.env.TS_NODE_PROJECT = 'tsconfig.node.json'
const tsNode = require('ts-node')
tsNode.register()
global.expect = require('chai').expect
