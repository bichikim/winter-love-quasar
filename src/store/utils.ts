import {defaultsDeep} from 'lodash'

type ObjectModule = {[key: string]: any}
type ComplexModule = ObjectModule | ((...args: any[]) => ObjectModule)

function _createModuleTree(paths: string[], module: ObjectModule) {
  const tree = {}
  let next = tree
  for(const path of paths) {
    if(!path) {
      return tree
    }
    if(path !== 'index') {
      next[path] = {}
      next = next[path]
    }
  }
  Object.assign(next, module)
  return tree
}

export function crateModuleStructure(path: string, module: ComplexModule, ...args: any[]): any {

  // remove ext
  let _path = path.replace(/\.(ts|js)$/, '')
  // remove . ./ /
  _path = _path.replace(/^\.?\//, '')
  const depth = _path.split('/')
  return _createModuleTree(depth, typeof module === 'function' ? module(...args) : module)
}

export function getModules(context: any) {
  const moduleFunction = require.context('./modules', true, /\.ts$/)
  const modules = {}
  moduleFunction.keys().forEach((path) => {
    const module = moduleFunction(path)
    defaultsDeep(modules, crateModuleStructure(path, module.default || module, context))
  })
  return modules
}
