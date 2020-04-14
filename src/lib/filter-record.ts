import {omit, pick} from 'lodash'

/**
 * pick and omit
 * @param target
 * @param only
 * @param except
 */
export function filterRecord<
  T extends object
  >(
  target: Record<any, any>,
  only: ReadonlyArray<string> = [],
  except: ReadonlyArray<string> = [],
  ): Record<any, any> {

  let _target: any = target

  if(only.length > 0) {
    _target = pick(target, only)
  }

  return omit(_target, except)
}

export default filterRecord
