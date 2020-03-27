<template lang="pug">
  q-dialog(
    :maximized="maximized"
    :value="value"
    @input="$emit('input', $event)"
  )
    q-card
      q-card-section
        span {{videoInputDevices ? videoInputDevices.length : 'null'}}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section
        video#video( width="300" height="200")
</template>

<style scoped lang="stylus">
  .camera-size
    width 1024px
    height 1024px
</style>

<script lang="ts">
  import {
    Component, Prop, Vue, Watch,
  } from 'vue-property-decorator'
  // only type casting
  import {BrowserMultiFormatReader} from '@zxing/library'

  @Component
  export default class WBarCodeDialog extends Vue {
    @Prop({default: false}) value: boolean
    @Prop({default: false}) maximized: boolean

    __codeReader: BrowserMultiFormatReader | null = null
    videoInputDevices: any[] | null = null

    @Watch('value')
    async __value(value) {
      if(value && !this.videoInputDevices) {
        this.videoInputDevices = await this.__codeReader?.listVideoInputDevices() ?? null
        console.log('ok!', this.videoInputDevices)
      }
    }

    created() {
      //
    }

    async mounted() {
      const Zxing = (await import('@zxing/library'))
      this.__codeReader = new Zxing.BrowserMultiFormatReader()
    }
  }
</script>
