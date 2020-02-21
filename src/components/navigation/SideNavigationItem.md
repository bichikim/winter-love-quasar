```
const title = 'foo'
const icon = 'ion-add'
const options = [
'ion-add', 'ion-albums'
]
const items = [
{icon: 'ion-add', title: 'foo'},
{icon: 'ion-add', title: 'bar'},
]
const showItems = false

<SideNavigationItem v-bind="{title, icon, items: showItems ? items : undefined}" />

<q-separator spaced />
<q-toggle label="Show Items" v-model="showItems" />
<q-input label="Title" v-model="title" />
<q-select label="Icon" v-model="icon" :options="options" />
<q-toggle :value="true"/>
```
