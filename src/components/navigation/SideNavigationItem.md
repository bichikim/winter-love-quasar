```
const title = 'foo'
const icon = 'ion-add'
const push = 'push-go'
const replace = 'replace-go'
const expansionClick = false
const options = [
'ion-add', 'ion-albums'
]
const items = [
{icon: 'ion-add', title: 'foo', replace: {path: 'replace-go'}},
{icon: 'ion-add', title: 'bar', run: {name: 'callFunctionName', params: ['foo']}},
]
const showItems = false
const info = null

<SideNavigationItem 
    v-bind="{title, icon, items: showItems ? items : undefined}"
    :push="push"
    :expansion-click="expansionClick"
    @click="info= $event"
 />

<q-separator spaced />
<q-toggle label="Show Items" v-model="showItems" />
<q-input label="Title" v-model="title" />
<q-select label="Icon" v-model="icon" :options="options" />
<q-toggle label="Expansion click" v-model="expansionClick"/>
<q-field label="Click" stack-label>
    <template #control>
        <div>{{info}}</div>
    </template>
</q-field>
```
