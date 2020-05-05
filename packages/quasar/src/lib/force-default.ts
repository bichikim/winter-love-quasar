export function forceDefault<T = any>(runner: Function, defaultValue: T): T | any {
  try {
    const result = runner()
    if(result) {
      return result
    }
  } catch(e) {
    // skip
  }
  return defaultValue
}

export default forceDefault
