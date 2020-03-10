<template lang="pug">
  .search-bar
    transition(
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    )
      q-input.text-primary.glass.text-h6(v-model="myValue" dense standout v-show="show")
        template(#append)
          .btn-group
            q-btn(dense flat icon="las la-search" v-if="isSearchAble")
            q-btn(
              icon="las la-barcode"
              dense flat
            )
</template>

<style lang="stylus" scoped>
  .btn-group
    margin-right -12px
  .q-btn
    border-radius 0
  .q-btn:last-child
    border-radius 0 $button-border-radius $button-border-radius 0;
</style>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'

  @Component
  export default class WSearchBar extends Vue {
    @Prop({default: ''}) value: string
    @Prop({default: true}) show: boolean

    myValue: string = ''

    get isSearchAble() {
      return this.myValue && this.myValue.length > 0
    }
  }
</script>
