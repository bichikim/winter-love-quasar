export function applyRecord(target: Record<string, any>, source: Record<string, any>) {
  Object.keys(target).forEach((key) => {
    const sourceValue = source[key]
    if(typeof sourceValue !== 'undefined') {
      target[key] = sourceValue
    }
  })
}

export default applyRecord
