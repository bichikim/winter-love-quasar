```
const insetLabel = 0.25
const depth = 0
const ripple = true
const items=[
{icon: 'ion-add', title: 'foo'},
{icon: 'ion-add', title: 'bar', items: [
{title: 'bar foo'},
{icon: 'ion-add', title: 'bar bar'}
]},
]
<SideNavigationList v-bind="{insetLabel, depth, ripple, items}" />
<q-input label="Inset Label" type="number" v-model="insetLabel" />
<q-input label="Depth" type="number" v-model="depth" />
<q-toggle label="Ripple" v-model="ripple" />
```
