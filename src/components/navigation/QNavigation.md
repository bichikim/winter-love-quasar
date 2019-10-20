Basic using

```vue
<template>
  <div class="p-pa-md screen">
      <q-layout view="lHh Lpr fff">
        <q-navigation
          v-model="open"
          :elevated="elevated"
          :bordered="bordered"
          :items="items"
          @to="to = $event"
        >
          <div>Navigatoin Header</div>
        </q-navigation>
        <q-page-container>
          <q-page>
            <q-checkbox class="text-capitalize" v-model="open" label="open"/>
            <q-checkbox class="text-capitalize" v-model="elevated" label="elevated"/>
            <q-checkbox class="text-capitalize" v-model="bordered" label="bordered"/>
            <div class="text-subtitle"><span class="text-capitalize">to</span> <span>: {{to}}</span></div>
          </q-page>
        </q-page-container>
      </q-layout>
  </div>
</template>
<style>
  .screen {
    position: relative;
    height: 200px;
  }
</style>
<script>
export default {
  data() {
    return {
      open: false,
      elevated: false,
      bordered: false,
      to: '',
      items: [
        {
          title: 'foo',
          icon: 'ion-snow',
          items: [
            {
              title: 'bar',
              icon: 'ion-snow',
            },
            {
              title: 'john',
              icon: 'ion-snow',
              to: {
                name: 'john',
              }
            }
          ],
        },
        {
          title: 'action',
          icon: 'ion-snow',
          items: [
            {
              title: 'foo',
              icon: 'ion-snow',
              to: {
                action: {
                  name: 'doSomething'
                }
              }
            }
          ]
        }
      ]
    }
  }
}
</script>
```
