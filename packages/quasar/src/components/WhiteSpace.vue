<template lang="pug">
  .white-space(v-html="contentHtml")
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator'

  const replace = (text: string) => {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br />')
  }

  /**
   * Render white space
   * @slot default Use this instead of a content prop
   */
  @Component
  export default class WhiteSpace extends Vue {
    /**
     * Content to render string
     */
    @Prop() content: string

    get contentHtml() {
      if(this.content) {
        return replace(this.content)
      }

      let html = ''

      if(!this.$slots.default) {
        return html
      }

      this.$slots.default.forEach((value: any) => {
        let content
        if(typeof value === 'string') {
          content = value
        } else if(typeof value === 'object') {
          content = value.text
        } else {
          return
        }
        if(!content) {
          return
        }
        html += replace(content)
      })

      return html
    }
  }
</script>
<style lang="stylus" scoped>
  .white-space
    display block
</style>
