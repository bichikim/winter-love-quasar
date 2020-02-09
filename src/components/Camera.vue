import {CameraSource} from '@capacitor/core'
<template lang="pug">
  .camara
</template>

<style scoped lang="stylus">
</style>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class Camera extends Vue {

    image: null | string = null
    error: null | string = null

    async onTackPicture() {
      //
    }
  }
</script>
