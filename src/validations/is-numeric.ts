/* eslint-disable camelcase */
import _isNumeric from 'validator/es/lib/isNumeric'

const isNumeric = (value: string, options?: {noSymbols?: boolean}) => {
  return _isNumeric(value, {no_symbols: options?.noSymbols})
}

export default isNumeric
