const getModules = (ctx: any) => {
  const context = require.context('./modules', false, /\.ts$/)
  return context.keys().reduce((modules, path: string) => {
    let filename = path
    if(/index\.ts$/.test(filename)) {
      filename = filename.replace(/index\.ts$/, '')
    }
    filename = filename.replace()
    if(!filename) {
      return modules
    }
    filename = dropRight(filename.split('.'), 1).join('.')
    const _module = context(path)
    const myModule = _module.default || _module
    if(typeof myModule === 'function') {
      modules[filename] = myModule(ctx)
      return modules
    }
    modules[filename] = myModule
    return modules
  }, [])
}

export function moduleStructure(paths: string): string[] {
  return []
}
