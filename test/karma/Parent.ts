import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Parent extends Vue {
  render(h) {
    return h('div')
  }
}
