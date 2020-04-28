<template lang="pug">
  q-avatar.w-user-avatar(v-bind="{...$attrs}")
    img(:src="avatar" v-if="avatar")
    span(v-else) {{displayName | shortName}}
    slot
</template>

<style scoped lang="stylus">
  .w-user-avatar
    user-select none
</style>

<script lang="ts">
  import {
    Component, Prop, Vue,
  } from 'vue-property-decorator'
  import shortName from 'src/filters/shart-name'

  @Component({
    filters: {
      shortName,
    },
  })
  export default class WUserAvatar extends Vue {
    @Prop() avatar?: string
    @Prop({required: true}) displayName: string
  }
</script>
