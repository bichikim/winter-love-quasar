```
const drawer = true
const items = [
{icon: 'ion-add', title: 'foo', replace: "replace-go"},
{icon: 'ion-add', title: 'bar',
    items: [
{title: 'bar foo'},
{icon: 'ion-add', title: 'bar bar', push: "push-go"}
]
},
]
const info = null

<q-layout container style="height: 250px">
<WSideNavigation v-model="drawer" :items="items" @click="info = $event"/>
</q-layout>
<q-toggle label="Drawer" v-model="drawer" />
<q-field label="Click" stack-label>
    <template #control>
        <div>{{info}}</div>
    </template>
</q-field>
```
