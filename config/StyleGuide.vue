<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'

  interface Action {
    type: 'boolean'
    prop: string
    state: string
  }

  @Component
  export default class ComponentTest extends Vue {
    @Prop() componentName: string
    @Prop() actions: Action[]

    get slotBind() {
      return {}
    }

    async render(h) {
      const component = await import(`./${this.componentName}.ex.vue`)
      console.log(component)
      return h('div', [this.componentName])
    }
  }
</script>
