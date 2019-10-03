<template lang="pug">
  .main
    button(@click="$emit('cancel', $event)") cancel
    button(@click="$emit('save', $event)") save
    p {{foo}}
    p {{bar}}
    p {{john}}
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator'

@Component
export default class Child extends Vue {
  @Prop() foo?: string
  @Prop() bar?: string
  @Prop() john?: string
}
</script>

<style scoped lang="stylus">
  .main
    display flex
    flex-direction column
</style>
