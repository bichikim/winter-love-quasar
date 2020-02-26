```
const items = [
{title: 'foo', icon: 'ion-add', push:"push-go"},
{title: 'foo', icon: 'ion-add', replace:"replace-go"},
{title: 'foo', icon: 'ion-add', run:"{name: 'fuction-run', parmas: ['foo-run']}"}
]
const push = null
const replace = null
const run = null
const open = true
const landscapeView = false
const side = 'left'
const sideTitle = 'left'

<q-layout container style="height: 200px">
    <Navigation 
        v-model="open"
        :items="items"
        :side="side"
        :landscape-view="landscapeView"
        :side-title="sideTitle"
        @push="push = $event"
        @replace="replace = $event" 
        @run="run = $event" 
    >
        <q-toolbar-title>My Title</q-toolbar-title>
    </Navigation>
</q-layout>


<q-separator spaced />
<q-toggle label="Open" v-model="open" />
<q-toggle label="Landscape View" v-model="landscapeView" />
<q-toggle label="Side Title" v-model="sideTitle" false-value="left" true-value="right"/>
<q-toggle label="Side" v-model="side" false-value="left" true-value="right" />
<q-input label="Foo title" v-model="items[0].title" /> 
<q-field label="push" stack-label>
    <template #control>
        <div>{{push}}</div>
    </template>
</q-field>
<q-field label="replace" stack-label>
    <template #control>
        <div>{{replace}}</div>
    </template>
</q-field>
<q-field label="run" stack-label>
    <template #control>
        <div>{{run}}</div>
    </template>
</q-field>
```
