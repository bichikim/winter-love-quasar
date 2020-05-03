<template lang="pug">
  q-dialog(
    :maximized="maximized"
    :value="value"
    @input="$emit('input', $event)"
  )
    q-card.column
      .video-message.fit.absolute-top-left.justify-center.flex.items-center.camera-back
        span.text-white(v-if="!videoAble") {{$t('cannot-use-camera')}}
        span.text-white(v-if="videoAble && !deviceId") {{$t('please-choose-your-camera')}}
        span.text-white(v-if="videoAble && deviceId") {{$t('loading')}}
      video.camera.absolute-top-left(ref="video" width="100%" height="100%")
      q-card-section
        q-btn.glass(icon="close" flat round dense v-close-popup)
      q-card-section.column.col-grow
        q-space
        q-select.glass(
          v-if="videoAble"
          standout
          :value="deviceLabel"
          :options="videoSelectOptions"
          @input="onSelectVideoDevice"
        )

</template>

<style lang="stylus" scoped>
  .q-card
    min-width 50%
    min-height 50%
    position relative

  .camera-back
    background-color black
</style>

<script lang="ts">
  import {Component, Prop, Vue, Watch, Ref} from 'vue-property-decorator'
  // only type casting
  import {BrowserMultiFormatReader, Result} from '@zxing/library'

  interface DeviceItem {
    label: string
    value: string
  }

  @Component
  export default class WBarCodeDialog extends Vue {
    @Prop({default: false}) value: boolean
    @Prop({default: false}) maximized: boolean
    @Prop({default: true}) scanAndClose: bigint
    @Prop({default: null}) preferCameraId: string | null
    @Ref() video: HTMLVideoElement

    __codeReader: BrowserMultiFormatReader | null = null
    videoInputDevices: MediaDeviceInfo[] | null = null
    deviceLabel: null | string = null
    deviceId: null | string = null
    result: Result | null = null

    get videoSelectOptions(): DeviceItem[] | undefined {
      const {videoInputDevices} = this
      return videoInputDevices?.map((device) => {
        return {
          label: device.label,
          value: device.deviceId,
        }
      })
    }

    get videoAble() {
      return this.videoSelectOptions && this.videoSelectOptions.length > 0
    }

    onSelectVideoDevice(value: DeviceItem) {
      this.deviceLabel = value.label
      this.deviceId = value.value
      this.onChangeVideoDevice()
    }

    onChangeVideoDevice() {
      const {__codeReader, deviceId} = this
      this.$emit('changed-camera', {
        label: this.deviceLabel,
        id: this.deviceId,
      })
      if(__codeReader && deviceId) {
        __codeReader.reset()
        __codeReader
          .decodeOnceFromVideoDevice(deviceId, this.video)
          .then((result) => {
            this.result = result
            this.$emit('scan', result)
            if(this.scanAndClose) {
              this.$emit('input', false)
            }
          })
      }
    }

    @Watch('value')
    async __value(value) {
      if(!value) {
        if(this.__codeReader) {
          this.__codeReader.stopAsyncDecode()
        }
        return
      }
      if(!this.videoInputDevices) {
        this.videoInputDevices =
          (await this.__codeReader?.listVideoInputDevices()) ?? null
      }
      const {preferCameraId} = this
      if(preferCameraId) {
        const preferDevice =
          this.videoInputDevices?.find((deviece) => {
            return deviece.deviceId === preferCameraId
          }) ?? null

        this.deviceId = preferDevice?.deviceId ?? null
        this.deviceLabel = preferDevice?.label ?? null
        this.$nextTick(() => {
          this.onChangeVideoDevice()
        })
      } else {
        this.deviceId = null
        this.deviceLabel = null
      }
    }

    beforeDestroy() {
      if(this.__codeReader) {
        this.__codeReader.stopAsyncDecode()
      }
    }

    async mounted() {
      const Zxing = await import('@zxing/library')
      this.__codeReader = new Zxing.BrowserMultiFormatReader()
    }
  }
</script>
