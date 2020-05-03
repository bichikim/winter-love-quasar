export const getType = (
  value
):
  | 'undefined'
  | 'object'
  | 'boolean'
  | 'number'
  | 'string'
  | 'function'
  | 'symbol'
  | 'bigint'
  | 'array' => {
  if(Array.isArray(value)) {
    return 'array'
  }

  return typeof value
}

export default getType
