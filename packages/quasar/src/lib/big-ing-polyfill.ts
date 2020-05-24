import bigInt from 'big-integer'
/* global BigInt */
if(typeof (BigInt) === 'undefined') {
  // @ts-ignore
  window.BigInt = bigInt
}
