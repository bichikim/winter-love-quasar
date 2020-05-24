<template lang="pug">
  q-dialog(
    :maximized="maximized"
    :value="value"
    @input="$emit('input', $event)"
  )
    w-bar-code(:scan-and-close="scanAndClose" :prefer-camera-id="preferCameraId")

</template>

<style lang="stylus" scoped>

</style>

<script lang="ts">
  import 'src/lib/big-ing-polyfill'
  import {Component, Prop, Vue, Watch, Ref} from 'vue-property-decorator'

  import WBarCode from './WBarCode.vue'


  @Component({
    components: {
      WBarCode,
    },
  })
  export default class WBarCodeDialog extends Vue {
    @Prop({default: false}) value: boolean
    @Prop({default: false}) maximized: boolean
    @Prop({default: true}) scanAndClose: bigint
    @Prop({default: null}) preferCameraId: string | null
  }
</script>
