import {cloneDeep} from 'lodash'
import {filter} from 'src/lib/component-storage'

describe('component-storage', function test() {
  describe('filter', function test() {
    it('should filter with empty only', function test() {
      const data = {foo: 'foo', bar: 'bar'}
      const result = filter(cloneDeep(data), [], ['foo'])
      expect(result).to.deep.equal({bar: data.bar})
    })
    it('should filter with only', function test() {
      const data = {foo: 'foo', bar: 'bar'}
      const result = filter(cloneDeep(data), ['foo'])
      expect(result).to.deep.equal({foo: data.foo})
    })
    it('should filter with only and except', function test() {
      const data = {
        foo: {
          foo: 'foo',
          bar: 'bar',
        },
        bar: 'bar',
      }
      const result = filter(cloneDeep(data), ['foo'], ['foo.foo'])
      expect(result).to.deep.equal({foo: {bar: data.foo.bar}})
    })
  })
})
