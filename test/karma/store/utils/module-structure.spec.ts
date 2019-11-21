// import {getModules} from '@/store/index'
import {crateModuleStructure} from '@/store/utils'

describe('moduleStructure', function test() {
  it('should return depth', function test() {
    const context = require.context('@@/test/mock/store/modules', true, /\.ts$/)
    const list: any[] = []
    context.keys().forEach((path) => (list.push(path)))
    const paths = list.map((path) => (crateModuleStructure(path, {mo: 'mo'})))
    console.log(JSON.stringify(paths[0]))
    console.log(JSON.stringify(paths[1]))
    console.log(JSON.stringify(paths[2]))
    console.log(JSON.stringify(paths[3]))
    expect(paths).to.deep.equal([

    ])
  })
})
