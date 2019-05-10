<template lang="pug">
  q-expansion-item(
    @click="handleClick"
    v-bind="{contentInsetLevel, expandSeparator, label: title, icon}"
    v-if="item.items"
  )
    q-list
      template(v-for="(nextItem, index) in item.items")
        q-dynamic-nav-item(:item="nextItem" :key="index" @to="handleTo")
  q-item(
    @click="handleClick"
    clickable
    v-else
    v-ripple
  )
    q-item-section(v-if="item.icon" avatar)
      q-icon(:name="item.icon")
    q-item-section {{item.title}}
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import NavDynamicMixin from './NavDynamic.mixin'

/**
 * Render nested Nav Items
 */
@Component
export default class QDynamicNavItem extends Mixins(NavDynamicMixin) {
}
</script>
