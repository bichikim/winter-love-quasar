<template lang="pug">
  .main
    child(v-bind="{...$props, ...$attrs}" v-on="$listeners")
    button(@click="$emit('skip', $event)") skip
    p {{tom}}
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import Child from './Child.vue'

  @Component({
    components: {Child},
  })
  export default class DataDownSharing extends Vue {
    @Prop() john: string
    @Prop() tom: string
  }
</script>

<style lang="stylus" scoped>
  .main
    display flex
</style>
