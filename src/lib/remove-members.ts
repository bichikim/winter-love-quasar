import {toPath} from 'lodash'

export type PathAble = string | number | ((value: any, key: string | number) => boolean)

export function removeMembers(
  target: Record<string, any>,
  path: PathAble | PathAble[],
) {
  if(typeof path === 'number') {
    delete target[path]
    return target
  }

  if(Array.isArray(path)) {
    path.forEach((_path) => {
      removeMembers(target, _path)
    })
    return target
  }

  if(typeof path === 'function') {
    Object.keys(target).forEach((key) => {
      const value = target[key]
      if(path(value, key)) {
        delete target[key]
      }
    })
    return target
  }

  const paths = toPath(path)

  if(path.length < 1) {
    return target
  }

  if(path.length === 1) {
    delete target[paths[0]]
    return target
  }

  paths.forEach((_path) => {
    delete target[_path]
  })

  return target
}

export default removeMembers
