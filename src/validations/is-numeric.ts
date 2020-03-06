/* eslint-disable camelcase */
import _isNumeric from 'validator/es/lib/isNumeric'

interface Options {
  /**
   * ignore - + .
   */
  noSymbols?: boolean
}

/**
 * whether value is number string
 * @param value
 * @param options
 */
const isNumeric = (value: string, options?: Options) => {
  return _isNumeric(value, {no_symbols: options?.noSymbols})
}

export default isNumeric
