import {getModules} from '@/store/index'
import {moduleStructure} from '@/store/utils'

describe('moduleStructure', function test() {
  it('should return depth', function test() {
    getModules({})
    expect(moduleStructure('/mo'))
  })
})
