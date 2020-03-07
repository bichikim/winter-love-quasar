<template lang="pug">
  .search-bar
    transition(
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    )
      q-input.text-primary.glass(v-model="myValue" dense standout v-show="value")
        template(#append)
          q-btn.btn(
            :icon="mode === 'barcode' ? 'las la-barcode' : 'las la-search'"
            dense flat
          )
</template>

<style lang="stylus" scoped>
  .btn
    margin-top -10px
    margin-right -12px
</style>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'

  @Component
  export default class WSearchBar extends Vue {
    @Prop({default: ''}) value: string

    myValue: string = ''

    get mode() {
      if(this.myValue && this.myValue.length > 0) {
        return 'search'
      }
      return 'barcode'
    }
  }
</script>
