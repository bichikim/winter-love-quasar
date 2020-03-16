export function forceDefault(runner: Function, defaultValue: any) {
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
