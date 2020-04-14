interface Options {
  /**
   * @default false
   */
  avoidApplyUndefined?: boolean
}

export function applyRecord(
  target: Record<string, any>,
  source: Record<string, any>,
  options: Options = {},
  ) {
  const {avoidApplyUndefined = true} = options
  Object.keys(target).forEach((key) => {
    const sourceValue = source[key]
    if(avoidApplyUndefined && typeof sourceValue !== 'undefined') {
      target[key] = sourceValue
    }
  })
}

export default applyRecord
