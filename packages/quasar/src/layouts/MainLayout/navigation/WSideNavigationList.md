```
const insetLabel = 0.25
const depth = 0
const ripple = true
const items=[
{icon: 'ion-add', title: 'foo', push: 'push-go'},
{icon: 'ion-add', title: 'bar', items: [
{title: 'bar foo'},
{icon: 'ion-add', title: 'bar bar'}
]},
]
const info = null

<WSideNavigationList v-bind="{insetLabel, depth, ripple, items}" @click="info = $event"/>

<q-separator spaced />
<q-input label="Inset Label" type="number" v-model="insetLabel" />
<q-input label="Depth" type="number" v-model="depth" />
<q-toggle label="Ripple" v-model="ripple" />
<q-field label="Click" stack-label>
    <template #control>
        <div>{{info}}</div>
    </template>
</q-field>
```
