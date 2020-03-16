import {omit, pick} from 'lodash'

export function filterRecord(target, only: string[] = [], except: string[] = []) {
  let _target = target

  if(only.length > 0) {
    _target = pick(target, only)
  }

  return omit(_target, except)
}

export default filterRecord
