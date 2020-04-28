export const comprehensiveBoolean = (
  value: any,
) => {
  if(value === '') {
    return true
  }
  return Boolean(value)
}

export default comprehensiveBoolean
