<template lang="pug">
  q-btn-dropdown(
    v-bind="{label: title,}"
    @click="handleClick"
    flat stretch
    v-if="item.items"
  )
    q-list
      template(v-for="(nextItem, index) in item.items")
        q-dynamic-nav-item(:item="nextItem" :key="index" @to="handleTo")
  q-btn(v-else flat v-bind="{icon, label: title}")
</template>

<script lang="ts">
  import {Component, Mixins} from 'vue-property-decorator'
  import DynamicItemMixin from './DynamicItemMixin'
  import QDynamicNavItem from './QDynamicNavItem.vue'

  @Component({
    components: {
      QDynamicNavItem,
    },
  })
  export default class QDynamicDropdown extends Mixins(DynamicItemMixin) {
  }
</script>
