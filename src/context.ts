import Vue from 'vue'

let _vue: Vue

/**
 * App.vue will call this to save the root vue instant
 * @param vue
 */
export const setContext = (vue: Vue) => {
  if(_vue) {
    console.warn('context: Context is already registered.')
    return
  }
  _vue = vue
}

/**
 * To use the Vue root instant of $ axios $ firebase and eventbus
 *
 */
export default (): Vue => {
  if(_vue) {
    return _vue
  }
  throw new Error('context: context is not registered.')
}
