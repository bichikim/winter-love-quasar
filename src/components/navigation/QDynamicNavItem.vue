<template lang="pug">
  q-expansion-item.q-dynamic-nav-item(
    @click.native="handleClick"
    v-bind="{contentInsetLevel, expandSeparator, label: title, icon}"
    v-if="item.items"
  )
    q-list
      template(v-for="(nextItem, index) in item.items")
        q-dynamic-nav-item(
          :item="nextItem"
          :key="index"
          @to="handleTo"
          @click.native.stop
        )
  q-item.q-dynamic-nav-item(
    @click="handleClick"
    clickable
    v-else
    v-ripple
    :aria-label="item.title"
  )
    q-item-section(v-if="icon" avatar)
      q-icon(:name="icon")
    q-item-section.q-item__label {{title}}
</template>

<script lang="ts">
  import {Component, Mixins} from 'vue-property-decorator'
  import DynamicItemMixin from './DynamicItemMixin'

  /**
   * Render nested Nav Items
   */
  @Component
  export default class QDynamicNavItem extends Mixins(DynamicItemMixin) {
  }
</script>
