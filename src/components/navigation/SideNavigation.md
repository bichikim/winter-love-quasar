```
const drawer = true
const items = [
{icon: 'ion-add', title: 'foo'},
{icon: 'ion-add', title: 'bar',
    items: [
{title: 'bar foo'},
{icon: 'ion-add', title: 'bar bar'}
]
},
]
<q-layout container style="height: 600px">
<SideNavigation v-model="drawer" :items="items" />
</q-layout>
<q-toggle label="Drawer" v-model="drawer" />
```
