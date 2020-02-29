import Vue from 'vue'

let _vue: Vue

export const setContext = (vue: Vue) => {
  if(_vue) {
    console.warn('context: Context is already registered.')
    return
  }
  _vue = vue
}


export default (): Vue => {
  if(_vue) {
    return _vue
  }
  throw new Error('context: context is not registered.')
}
