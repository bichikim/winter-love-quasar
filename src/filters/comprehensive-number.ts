import isNumeric from 'src/validations/is-numeric'

const comprehensiveNumber = (
  value: string | number | '' | boolean | any,
  defaultNumber: number = 3,
  noSymbols: boolean = true,
): number | undefined => {

  if(value === false || value === null) {
    return
  }

  if(value === '' || value === true) {
    return defaultNumber
  }

  if(typeof value === 'number' || isNumeric(value, {noSymbols})) {
    return Number(value)
  }

}

export default comprehensiveNumber
