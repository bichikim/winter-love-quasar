import Vue from 'vue'
let $root: Vue

export function save(root: Vue) {
  $root = root
}

export default function root(): Vue {
  if($root) {
    return $root
  }
  throw new Error('[root] you should use root after save')
}
