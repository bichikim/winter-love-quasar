<template lang="pug">
  q-card.column
    .video-message.fit.absolute-top-left.justify-center.flex.items-center.camera-back
      span.text-white(v-if="!videoAble") {{$t('cannot-use-camera')}}
      span.text-white(v-if="videoAble && !deviceId") {{$t('please-choose-your-camera')}}
      span.text-white(v-if="videoAble && deviceId") {{$t('loading')}}
    video.camera.absolute-top-left(ref="video" width="100%" height="100%")
    q-card-section
      q-btn.glass(icon="close" flat round dense v-close-popup)
      div.text-white {{deviceId}}
      div.text-white {{deviceLabel}}
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

<style scoped lang="stylus">
  .q-card
    min-width 50%
    min-height 50%
    position relative

  .camera-back
    background-color black
</style>

<script lang="ts">
  import {
    BrowserBarcodeReader,
    Result,
  } from '@zxing/library'
  import {
    Component,
    Prop,
    Ref,
    Vue,
    Watch,
  } from 'vue-property-decorator'


  interface DeviceItem {
    label: string
    value: string
  }

  @Component
  export default class WBarCode extends Vue {
    @Prop({default: true}) scanAndClose: bigint
    @Prop({default: null}) preferCameraId: string | null
    @Ref() video: HTMLVideoElement
    __codeReader: BrowserBarcodeReader | null = null
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

    beforeDestroy() {
      if(this.__codeReader) {
        this.__codeReader.stopAsyncDecode()
      }
    }

    async mounted() {
      this.__codeReader = new BrowserBarcodeReader()
      this.videoInputDevices =
        (await this.__codeReader?.getVideoInputDevices()) ?? null
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
  }
</script>
