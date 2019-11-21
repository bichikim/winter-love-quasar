// const getModules = (ctx: any) => {
//   const context = require.context('./modules', false, /\.ts$/)
//   return context.keys().reduce((modules, path: string) => {
//     let filename = path
//     if(/index\.ts$/.test(filename)) {
//       filename = filename.replace(/index\.ts$/, '')
//     }
//     // filename = filename.replace()
//     if(!filename) {
//       return modules
//     }
//     filename = dropRight(filename.split('.'), 1).join('.')
//     const _module = context(path)
//     const myModule = _module.default || _module
//     if(typeof myModule === 'function') {
//       modules[filename] = myModule(ctx)
//       return modules
//     }
//     modules[filename] = myModule
//     return modules
//   }, [])
// }

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
