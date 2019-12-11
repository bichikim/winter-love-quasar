// import {getModules} from '@/store/index'
import {crateModuleStructure} from '@/store/utils'
import {defaultsDeep} from 'lodash'

describe('moduleStructure', function test() {
  it('should return depth', function test() {
    const list: any[] = ['./bar.ts', './foo.ts', './john/modules/bar.ts']
    const expecting = (module) => {
      return [
        {'bar': module},
        {'foo': module},
        {'john': {'modules': {'bar': module}}},
      ]
    }
    const objectExpecting = (module) => {
      return {
        'bar': module,
        'foo': module,
        'john': {
          'modules':
            {
              'bar': module,
            },
        },
      }
    }
    {
      const fakeModule = {mo: 'mo'}
      const paths = list.map((path) => (crateModuleStructure(path, fakeModule)))
      expect(paths).to.deep.equal(expecting(fakeModule))
      const marge = paths.reduce((result, value) => {
        return defaultsDeep(result, value)
      }, {})
      expect(marge).to.deep.equal(objectExpecting(fakeModule))
    }
    {
      const fakeModule = {foo: 'foo', bar: 'bar', john: 'john'}
      const paths = list.map((path) => (crateModuleStructure(
        path,
        (foo, bar, john) => ({foo, bar, john}),
        'foo', 'bar', 'john',
      )))
      expect(paths).to.deep.equal(expecting(fakeModule))
    }

  })
})
